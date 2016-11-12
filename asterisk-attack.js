var game = (function asteriskAttack() {

  var game = {
    score: null,
    missed: null,
    xyzzy: 10,
    padding: 15, // Padding used on elements in div#asterisk-attack
    colors: ['yellow', 'gold', 'orange', 'orangered', 'red', 'deeppink', 'hotpink', 'fuchsia'],
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
      , max = $("#asterisk-attack").width() - $("#defender").width() - game.padding
      , pos = mousePosX - $("#asterisk-attack").offset().left + game.padding; // Relative mouse x.

    pos = (pos - min)/(max - min);
    if (pos > 1) pos = 1;
    return (pos * (max - min)) + min; // Scaled to [min,max]
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Range [min, max]
  }

  function updateHud() {
    $("#score").html(buildHudNumber(game.score, 'score'));
    $("#countdown").html(buildHudNumber(game.xyzzy - game.missed, 'missed'));
  }

  function animateEnthusiasm() {
    var i, j, current, next;

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
            + '">' 
            + game.animations[i][j] 
            + '</span><br>';
        }
      }

      $('#civilians').html(game.animations[0].join(''));
    }
  }

  // Convert integer numbers > 0 to three-line ascii art representations.
  // @type string Either 'score' or 'missed' which will be added to the result.
  function buildHudNumber(n, type) {
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

    if (type === 'score') {
      number[0] = '  __ __ __ __ __   ' + number[0];
      number[1] = '  /_ /  / //_//_   ' + number[1];
      number[2] = '  __//_ /_// \\/__  ' + number[2]; // Backslash is backslash escaped.
    }
    else if (type === 'missed') {
      number[0] += '  ____  __ __ __ _   ';
      number[1] += '  / / ///_ /_ /_ / \\ '; // Backslash is backslash escaped.
      number[2] += '  / / //__/__//_ /__/';
    }

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
    return '<div '
      + 'id="' + (++game.attackerCount) + '" ' 
      + 'class="asterisk" '
      + 'style="'
      + 'color:' + game.colors[randomInRange(0, game.colors.length - 1)] + '; '
      + 'font-size:' + randomInRange(12, 36) + 'px; '
      + 'left:' + randomInRange(game.padding, $("#asterisk-attack").width() - (game.padding * 2)) + 'px;'
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
      clone = a.clone();
      clone.insertAfter(a).animate({ 
        'opacity': '0', 'top': (a.position().top - 50)
      }, 150, function() {
        clone.remove(); 
      })
    }

    a.remove();
    delete game.attackers[attackerId];
    
    thwarted ? game.score++ : game.missed++;

    if (thwarted && game.score % 5 === 0) {
      increaseAttackSpeed();
    }
    // else if (!thwarted) {
    //   $("#asterisk-attack").stop(true).effect("bounce", {}, 500);
    // }

    updateHud();
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
        if (game.missed === game.xyzzy) {
          quit();
          break;
        }
        continue;
      }

      // See if the attacker hit the civilians.
      if (positionsCollide(a[0], c[0]) && positionsCollide(a[1], c[1])) {
        completeAttack(aId, false);
        if (game.missed === game.xyzzy) {
          quit();
          break;
        }
        continue;
      }
    }
  }

  function pewPewPew() {
    var defender      = $('#defender')
      , defenderWidth = defender.width()
      , laserPos      = defender.position();

    var slug = $('<div id="slug' + (++game.slugCount) + '" '
      + 'style="color:deepskyblue; position:absolute; '
      + 'top:' + (laserPos.top - 40) + 'px; '
      + 'left:' + ((laserPos.left * 2 + defenderWidth) / 2 - 3) + 'px;'
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
    game.missed = 0;
    game.slugCount = 0;
    game.attackerCount = 0;
    game.attackerSpeed = 3000;
    game.generationSpeed = 1000;
    updateHud();
  }

  function start() {
    reset();

    $("#start-button").hide();
    $("#quit").show();

    game.civilianLoop = setInterval(animateEnthusiasm, 300);
    game.attackLoop  = setInterval(attack, game.generationSpeed);
    setTimeout(game.collisionLoop = setInterval(detectCollisions, 5), game.generationSpeed);

    $("#asterisk-attack").mousemove(function(event) {
      $("#defender").css({ left: normalizeDefenderPosition(event.pageX) });
    });

    $("body").keyup(function(e) {
      if (e.key === 'f') {
        pewPewPew();
      }
    });
  }

  function quit() {
    window.clearInterval(game.civilianLoop);
    window.clearInterval(game.attackLoop);
    window.clearInterval(game.collisionLoop);

    $("#asterisk-attack").unbind("mousemove");

    for (id in game.slugs)     { game.slugs[id].remove();     }
    for (id in game.attackers) { game.attackers[id].remove(); }
    game.slugs     = {};
    game.attackers = {};

    $("#start-button").show();
    $("#quit").hide();
  }

  (function load() {
    var buffer      = 500
      , duration    = 300
      , windowWidth = $(window).width()
      , logoWidth   = $("#logo").width();

    // Animate in the logo.
    $("#logo").css({ "top": 43, "left": -(logoWidth + buffer) })
      .animate({ "opacity": 1, "left": "" }, duration);

    // Animate in the start button...
    // ...then clone it and zoom/fade it out, after removing the previous clone.
    $("#start-button").css({ "right": -(logoWidth + buffer) })
      .animate({ "opacity": 1, "right": "" }, duration, function() {
        $("#start-button a").hover(
          function() {
            var old = $("#another-start-button")
              , another = $("#start-button").clone();

            if (old) { old.remove(); }

            another.attr("id", "another-start-button")
              .insertAfter("#start-button")
              .animate({ "opacity": "0", "font-size":"35px" }, buffer);
          },
          function() {} // So the hover-in function isn't called on hover-out.
        );
      });
  })();

  return {
    start: start,
    quit: quit
  }

})();

$('document').ready(function() {

  $("#start-button a").click(function() { game.start() });
  $("#quit  a").click(function() { game.quit()  });

});

