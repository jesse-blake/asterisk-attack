var game = (function asteriskAttack() {

  var game = {
    windowWidth: $(window).width(),
    area: $('#asterisk-attack'),
    defender: $("#defender"),
    padding: 15, // Padding used on elements in div#asterisk-attack
    score: null,
    colors: ['yellow', 'gold', 'orange', 'orangered', 'red', 'deeppink', 'hotpink', 'fuchsia', 'lightskyblue', 'dodgerblue', 'blue'],
    slugs: {}, // Key: id, value: dom object.
    slugCount: null,
    attackers: {}, // Key: id, value: dom object.
    attackerCount: null,
    attackerSpeed: null,
    generationSpeed: null,
    attackLoop: null,
    collisionLoop: null,
    civilianLoop: null,
    animations: null,
  };

  // Normalize defender's position to keep it within the game area boundaries.
  function normalizeDefenderPosition(mousePosX) {
    var min = game.padding
      , max = game.area.width() - game.defender.width() - game.padding
      , pos = mousePosX / game.windowWidth; // Normalize to [0, 1]

    pos = (pos * (max - min)) + min; // Scale to [min, max]
    return pos;
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Range [min, max]
  }

  function updateScore() {
    $('#score').html(buildScore(game.score));
  }

  function loadLogo() {
    var i
      , colors = ['yellow', 'yellow', 'gold','orange','orangered','red'];
    var logo = [
      '                      __                *       __             __   __               __         ',
      '______   _____ _____ / /_  _____ ____ __ _____ / /_     _____ / /_ / /_  _____ ____ / /_     ___',
      '_____   ___  // ___// __/ / __ // __// // ___//   /    ___  // __// __/ ___  // __//   /    ____',
      '____   / _  //___ // /__ / ___// /  / //___ //   \\_   / _  // /__/ /__ / _  // /__/   \\_   _____',
      '___   /____//____//____//____//_/  /_//____//_/\\__/  /____//_________//____//______/\\__/  ______',
      '________________________________________________________________________________________________'
    ];

    for (i = 0; i < logo.length; i++) {
      logo[i] = logo[i].replace(/ /g, '&nbsp;');
      logo[i] = '<span style="color:' + colors[i] + '">' + logo[i] + '</span><br>';
    }

    $('#logo').html(logo)
      .css({ "top": 43, "left": -(800 + 500) })
      .animate({ "opacity": 1, "left": "" }, { duration: 300, queue: false });
  }

  function loadCivilians() {
    var i, colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue'];
    var civilians = [
      '                                                                                                ',
      '    o             o                            o              o O                o              ',
      '   /|\\           /)\\                          /|\\             |\\/\\              /|\\             ',
      '____)\\___________/ )__________________________( \\____________( \\((_______________)\\_____________'
    ];

    for (i = 0; i < civilians.length; i++) {
      civilians[i] = civilians[i].replace(/ /g, '&nbsp;');
      civilians[i] = '<span style="color:' + colors[i] + '">' + civilians[i] + '</span><br>';
    }

    $('#civilians').html(civilians);
  }

  function animateCivilians() {
    var i
      , j
      , current
      , next
      , colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue'];

    if (game.animations) {
      current = parseInt(($('#civilians > span').attr('class')).split('').pop());
      next    = current % game.animations.length === 0 ? 1 : current + 1;

      $('#civilians').html(game.animations[next-1].join(''));
    }
    else { // Build animation frames once.
      game.animations = [ // Lots of ugly backspace escapes.
        [
          '                                                                                                ',
          '    o/           \\o/                           o               oO                o              ',
          '   /|             )                           v|v             /><\\              /(\\             ',
          '____)\\___________/ )___________________________)\\_____________))((______________( )_____________'
        ],[
          '                                                                                \\o/             ',
          '    o                 \\o/                     \\o/             \\oO/               |              ',
          '   /|V                 )                       |              /  \\              / \\             ',
          '____)\\________________/ )______________________)\\_____________))((______________________________'
        ],[
          '                                                                                                ',
          '    o/                \\o/                      o              \\oO/               o              ',
          '   /|                  (                      v|v             /  \\              /(\\             ',
          '____)\\________________( \\_____________________/(______________))((______________( )_____________'
        ],[
          '                                                                                                ',
          '    o            \\o/                          \\o/              oO                o              ',
          '   /|V            (                            |              /><\\              /(\\             ',
          '____)\\___________( \\__________________________/(______________))((______________( )_____________'
        ]
      ];

      for (i = 0; i < game.animations.length; i++) {
        for (j = 0; j < game.animations[i].length; j++) {
          game.animations[i][j] = game.animations[i][j]
            .replace(/ /g, '&nbsp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          game.animations[i][j] = '<span class="civilians'
            + (i+1) 
            + '" style="color:' + colors[j] + '">' 
            + game.animations[i][j] 
            + '</span><br>';
        }
      }

      $('#civilians').html(game.animations[0].join(''));
    }
  }

  function loadBackground() {
    var i
      , j
      , numWindows // The number of windows in the string.
      , chosenWindow; // The window to light up!
    var background = [ 
      '                                                                  ___________                   ',
      '                      ___________                                 |         |                   ',
      '                      |         |                                 | O O O O |                   ',
      '                      | O O O O |                                 |         |                   ',
      '                      |         |______                           | O O O O |                   ',
      '                      | O O O         |                 __________|         |                   ',
      '      _____________   |         O O O |                 |           O O O O |                   ',
      '      |           |   | O O O         |                 | O O O O           |      _____________',
      '      | O O O O O |   |         O O O |                 |           O O O O |      |           |',
      '                  |   | O O           |________         | O O O O           |      | O O O O O |',
      '___________ O O O |   |         O O O         |         |           O O O O        |           |',
      '|         |       |   | O O             O O O |         | O O O O                  | O O O O O |',
      '| O O O O |   O O |   |           O O         |         |           O O O  ___________         |',
      '|         |       |   | O               O O O |         | O O O            |         | O O O O |',
      '| O O O O |   O O |   | _____________         |         |             O O  | O O O O |         |',
      '|         |           | |           |       O |         | O O              |         | O O O   |',
      '        O |   O         | O O O O O |         |         |               O        O O |          ',
      '          |                         |                   | O                          | O        ',
      '          |                 O O O O |                   |                            |          ',
    ];

    for (i = 0; i < background.length; i++) {
      background[i] = background[i].replace(/ /g, '&nbsp') 
      //background[i] = background[i].replace(/O/, '<span style="color:#444">O</span>');
      background[i] = '<span style="color:#333">' + background[i] + '</span><br>';

      if (Math.random() > 0.5) { // 50-50 chance of lighting a window in the string.
        numWindows = background[i].split('O').length - 1; // Number of windows in the string.

        if (numWindows > 3) { // Avoid corner-case problems.
          chosenWindow = randomInRange(1, numWindows); // Chosen window to light up.

          for (j = 0; j < background[i].length; j++) {
            if (background[i][j] === 'O' && !--chosenWindow) {
              background[i] = background[i].substr(0, j)
                + '<span style="color:#555">*</span>'
                + background[i].substr(j+1, background[i].length);
            }
          }
        }
      }
    }

    $('#background').html(background);
  }

  // Convert game score digits to three-line ascii art representations.
  function buildScore(n) {
    var i
      , result
      , started = false
      , digits = []
      , number = ['', '', ''];

    var parts = [
      ['__ ','/ /','/_/'], // 0 (top, mid, bot)
      [' ','/','/'],          // 1
      ['__ ','__/','/__'], // ...
      ['__ ','__/','__/'],
      ['   ','/_/','  /'],
      ['__ ','/_ ','__/'],
      ['__ ','/_ ','/_/'],
      ['__ ','  /','  /'],
      ['__ ','/_/','/_/'],
      ['__ ','/_/','__/'], // 9
    ];

    if (!n) { // Build and return number zero.
      number[0] = parts[0][0];
      number[1] = parts[0][1];
      number[2] = parts[0][2];
    }
    else { // Build and return integers > 0;
      while(n > 0) {
        number[0] = number[0] ? parts[n % 10][0] + ' ' + number[0] : parts[n % 10][0];
        number[1] = number[1] ? parts[n % 10][1] + ' ' + number[1] : parts[n % 10][1];
        number[2] = number[2] ? parts[n % 10][2] + ' ' + number[2] : parts[n % 10][2];
        n = parseInt(n / 10);
        started = true;
      }
    }

    // Add 'SCORE'.
    number[0] = '  __ __ __ __ __   ' + number[0];
    number[1] = '  /_ /  / //_//_   ' + number[1];
    number[2] = '  __//_ /_// \\/__  ' + number[2]; // Backslash is backslash escaped.

    // Line up the lines correctly.
    number[0] = '  ' + number[0] + '';
    number[1] = ' ' + number[1] + ' ';
    number[2] = '' + number[2] + '  ';

    // Convert spaces to non-breaking space html entities.
    for (i = 0; i < 3; i++) {
      number[i] = number[i].replace(/ /g, '&nbsp;');
    }

    // Wrap with html.
    result = '<span style="color:deeppink;">' + number[0] + '</span><br>'
           + '<span style="color:hotpink;">' + number[1] + '</span><br>'
           + '<span style="color:fuchsia;">' + number[2] + '</span><br>';

    return result;
  }

  function buildAttacker() {
    var smallSize = 12
      , largeSize = 42;

    return '<div '
      + 'id="' + (++game.attackerCount) + '" ' 
      + 'class="asterisk" '
      + 'style="'
      + 'color:' + game.colors[randomInRange(0, game.colors.length - 1)] + '; '
      + 'font-size:' + randomInRange(smallSize, largeSize) + 'px; '
      // 3 and 4 below moves attackers in from edges of game area evenly.
      + 'left:' + randomInRange(game.padding * 3, $("#asterisk-attack").width() - (game.padding * 4)) + 'px;'
      + '">*</div>'
  }

  function attack() {
    var attacker = $(buildAttacker())
      , speed    = randomInRange(game.attackerSpeed, game.attackerSpeed + 5000);

    game.attackers[game.attackerCount] = attacker;
    $("#asterisk-attack").prepend(attacker);

    $(attacker).animate({ top: "500px" }, speed, "linear");
  }

  function completeAttack(attackerId, thwarted) {
    var a     = game.attackers[attackerId]
      , pos
      , clone;

    if (thwarted) {
      game.score++;

      clone = a.clone();
      clone.insertAfter(a).animate({ 
        'opacity': '0', 'top': (a.position().top - 50)
      }, 150, function() {
        clone.remove(); 
      })
    }

    a.remove();
    delete game.attackers[attackerId];
    
    if (thwarted && game.score % 5 === 0) {
      increaseAttackSpeed();
    }
    // else if (!thwarted) {
    //   $("#asterisk-attack").stop(true).effect("bounce", {}, 500);
    // }

    updateScore();
  }

  function increaseAttackSpeed() {
    game.generationSpeed -= 50;
    window.clearInterval(game.attackLoop);
    game.attackLoop = setInterval(attack, game.generationSpeed);
  }

  function detectCollisions() {
    var a // attacker
      , s // slug
      , d // defender
      , c
      , collision
      , defender   = $('#defender')
      , civilians  = $('#civilians')

    function getPosition(element) {
      var pos    = $(element).position()
        , width  = $(element).width()
        , height = $(element).height();

      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    function positionsCollide(p1, p2) {
      var x = p1[0] < p2[0] ? p1 : p2
        , y = p1[0] < p2[0] ? p2 : p1;
      
      return x[1] > y[0] || x[0] === y[0];
    }

    c = getPosition(civilians);

    // Check for attacker collisions.
    for (aId in game.attackers) {
      a = getPosition(game.attackers[aId]);
      collision = false;

      // See if the attacker was hit by a slug.
      for (sId in game.slugs) {
        s = getPosition(game.slugs[sId]);

        if (positionsCollide(a[0], s[0]) && positionsCollide(a[1], s[1])) {
          completeAttack(aId, true);
          collision = true;
          break;
        }
      }

      if (collision) continue;

      // See if the attacker hit the defender.
      d = getPosition(defender);
      if (positionsCollide(a[0], d[0]) && positionsCollide(a[1], d[1])) {
        completeAttack(aId, true);
        continue;
      }

      // See if the attacker hit the civilians.
      if (positionsCollide(a[0], c[0]) && positionsCollide(a[1], c[1])) {
        completeAttack(aId, false);
        quit();
        break;
      }
    }
  }

  function pewPewPew() {
    var defender      = $('#defender')
      , defenderWidth = defender.width()
      , laserPos      = defender.position();

    var slug = $('<div id="slug' + (++game.slugCount) + '" '
      + 'style="color:deeppink; position:absolute; '
      + 'top:' + (laserPos.top - 40) + 'px; '
      + 'left:' + ((laserPos.left * 2 + defenderWidth) / 2 + 3) + 'px;'
      + '">|<br>|<br>|<br></div>');

    $('#asterisk-attack').prepend(slug);
    game.slugs[game.slugCount] = slug;

    slug.animate({ top: '-50px' }, 500, 'linear', function() {
      delete game.slugs[slug.attr('id').split('').pop()];
      slug.remove();
    });
  }

  function reset() {
    game.score = 0;
    game.slugCount = 0;
    game.attackerCount = 0;
    game.attackerSpeed = 3000;
    game.generationSpeed = 1000;
    updateScore();
    loadBackground();
  }

  function animateStartBtn(show) {
    var startBtn = $('#start-btn');

    if (show) { // Animate start button into view.
      startBtn.css({ 'right': -(800 + 500) })
        .animate({ 'right': '' }, 300, function() {
          $('#start-btn a').hover(
            function() {
              var newBtn = startBtn.clone();

              newBtn.attr('id', 'temp-start-btn')
                .insertAfter('#start-btn')
                .animate({ 'opacity': '0', 'font-size': '35px' }, 300, function() {
                  newBtn.remove();
                });
            },
            function() {} // So the hover-in function isn't called on hover-out.
          );
        })
    }
    else { // Animate start button out of view.
      startBtn.animate({'right': -(800 + 500) }, 500)
        .unbind('mouseenter mouseleave');
    }
  }

  function animateQuitInstruction(show) {
    var quitInst = $('#quit-instruction');

    if (show) {
      quitInst.css({ 'left': -(800 + 500) })
        .animate({'left': '' }, 300);
    }
    else {
      quitInst.animate({ 'left': -(800 + 500) }, 500);
    }
  }

  function animateDefender(show) {
    if (show) {
      game.defender.css({ 'left': (game.area.width() / 2) - 20, 'top': -500 })
        .animate({ 'top': 350 }, 300);
    }
    else {
      game.defender.animate({ 'top': -500 }, 300);
    }
  }

  function start() {
    reset();

    // 1
    game.civilianLoop = setInterval(animateCivilians, 300);
    game.attackLoop  = setInterval(attack, game.generationSpeed);
    setTimeout(game.collisionLoop = setInterval(detectCollisions, 5), game.generationSpeed);

    // 2
    animateStartBtn(false);
    animateQuitInstruction(true);
    animateDefender(true);

    // 3
    $('html').css('cursor', 'none');

    // 4
    $(document).mousemove(function(event) {
      game.defender.css({ left: normalizeDefenderPosition(event.pageX) });
    });

    // 5
    $(document).keyup(function bindGameKeys(e) {
      if (e.key === ' ') {
        pewPewPew();
      } else if (e.key === 'q') {
        quit();
      }
    });
  }

  function quit() {
    // 1
    window.clearInterval(game.civilianLoop);
    window.clearInterval(game.attackLoop);
    window.clearInterval(game.collisionLoop);

    // 2
    animateStartBtn(true);
    animateQuitInstruction(false);
    animateDefender(false);

    // 3
    $('html').css('cursor', 'auto');

    // 4
    $(document).unbind('mousemove');

    // 5
    $(document).unbind('keyup');

    for (id in game.slugs)     { game.slugs[id].remove();     }
    for (id in game.attackers) { game.attackers[id].remove(); }
    game.slugs     = {};
    game.attackers = {};
  }

  (function load() {
    var buffer      = 500
      , duration    = 300;

    updateScore();
    loadBackground();
    loadLogo();
    loadCivilians();

    $('#score').animate({ 'right': '' }, { duration: duration, queue: false });
    animateStartBtn(true);
  })();

  return {
    start: start,
    quit: quit
  }

})();

$('document').ready(function() {

  $("#start-btn a").click(function() { game.start() });
  $("#quit-btn  a").click(function() { game.quit()  });

});

