var asteriskAttack = (function(aa) {
  
  aa.game = {
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
  };

  aa.load = function() {
    aa.updateScore();
    loadLogo();
    loadScore();
    loadStartBtn();
    loadBackground();
    loadCivilians();

    $('#start-btn a').click(function() {
      asteriskAttack.start();
    });
  };

  function loadLogo() {
    var i
      , colors = ['yellow', 'yellow', 'gold','orange','orangered','red']
      , buffer = 500
      , duration = 300
      , logo = [

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

    aa.updateScore;

    $('#logo').html(logo)
      .css({ "top": 43, "left": -(800 + 500) })
      .animate({ "opacity": 1, "left": "" }, { duration: 300, queue: false });
  }

  function loadScore() {
    aa.updateScore();
    $('#score').animate({ 'right': '' }, { duration: 300, queue: false });
  }

  function loadStartBtn() {
    aa.animateStartBtn(true);
  }

  function loadBackground() {
    var i
      , j
      , numWindows // The number of windows in the string.
      , chosenWindow // The window to light up!
      , background = [ 
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
        '          |                 O O O O |                   |                            |          '
      ];

    for (i = 0; i < background.length; i++) {
      background[i] = background[i].replace(/ /g, '&nbsp') 
      background[i] = '<span style="color:#333">' + background[i] + '</span><br>';

      if (Math.random() > 0.5) { // 50-50 chance of lighting a window in the string.
        numWindows = background[i].split('O').length - 1; // Number of windows in the string.

        if (numWindows > 3) { // Avoid corner-case problems.
          chosenWindow = aa.randomInRange(1, numWindows); // Chosen window to light up.

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

  function loadCivilians() {
    var i
      , colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue']
      , civilians = [
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

  return aa;

})(asteriskAttack); 

