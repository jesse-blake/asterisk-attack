var asteriskAttack = (function(aa) {

  var civilianAnimations = null
    , offscreenLR = -1500
    , offscreenTB = -500
    , duration = 300;

  aa.animateLoadGame = function() {
    animateLogo();
    animateScore();
    animateBackground();
    animateStartBtn(true); 
    animateInstructions(true);
    animateBlinkingAntenas();
  };

  aa.animateStartGame = function() {
    animateStartBtn(false); 
    animateDefender(true);
    animateInstructions(false);
    animateQuitInstructions(true);
  };

  aa.animateEndGame = function() {
    animateStartBtn(true); 
    animateDefender(false);
    animateInstructions(true);
    animateQuitInstructions(false);
  };

  function animateLogo() {
    var i
      , colors = ['yellow', 'yellow', 'gold','orange','orangered','red']
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

    aa.dom.logo
      .html(logo)
      .css({ 'left': offscreenLR })
      .animate({ 'opacity': 1, 'left': '' }, { duration: duration, queue: false });
  }

  function animateScore() {
    aa.updateScore();

    aa.dom.score
      .css({ 'right': offscreenLR })
      .animate({ 'opacity': 1, 'right': '' }, { duration: duration, queue: false });
  }

  function animateBackground() {
    var lightsOnColors = ['#444', '#555']
      , lightsOffColor = '#222'
      , background = [ 
        '                                                                                                 |                                                    ',
        '                                                    |                                        ____|______                                              ',
        '                                                 ___|_|_____                                 |         |                                              ',
        '                                                 |         |                                 | * * * * |                                              ',
        '                                                 | * * * * |                                 |         |____                                          ',
        '                                      |          |         |______                           | * * * *     |                                          ',
        '                                      |          | * * *         |                 __________|           * |          |                               ',
        '                                 _____|_______   |         * * * |                 |             * * *     |         ||                               ',
        '                                 |           |   | * * *         |                 | * * * * *           * |  _______||____                           ',
        '                |                | * * * * * |   |         * * * |                 |             * * *     |  |           |                           ',
        '             ___|_______                     |   | * *           |________         | * * * * *           * |  | * * * * * |                           ',
        '             |         |   ___________ * * * |   |         * * *         |         |             * * *     |  |           |           |               ',
        '             | * * * * |   |         |       |   | *               * * * |         | * * * *                  | * * * * * |    _______|__|____        ',
        '     ________|         |   | * * * * |   * * |   |           * *         |   _________           * *  ___________         |    |             |        ',
        '     |           * * * |   |         |       |   |    |            * * * |   |       | * *            |         |   * * * |    | * * * * * * |        ',
        '     | * * * *         |   | * * * * |   * * |   | ___|_________         |   | * * * |             *  | * * * * |         |    |                      ',
        '___________        * * |   |         |           | |           |       * |   |       | *              |         |     * * |    | * *   _______________',
        '|         |  *         |           * |   *         | * * * * * |         |   | * * * |             *  | * * *                  |       |             |',
        '  * * * * |          *               |                         |             |       |                |                 *        *     | * * * * * *  ',
        '                                     |                 * * * * |                     |                | *                              |              ',
        '                                                               |                                      |                                               '
      ];

    /*
     * Changes a random window in a particular level of the background.
     * @level {Number} An array index representing the level of the background.
     * @color {String} A CSS color, with a hash sign, 3 digits only.
     */
    function changeWindow(level, color) {
      var i
        , count
        , selected;

      count = background[level].split('*').length - 1;

      if (count > 0) {
        selected = aa.randomInRange(1, count);

        for (i = 0; i < background[level].length; i++) {
          if (background[level][i] === '*' && !--selected) {
            background[level] = background[level].substr(0, i-6)
              + color
              + '">*'
              + background[level].substr(i+1, background[level].length);
          }
        }
      }
    }

    /*
     * Colors one window with a lights-on color in each level of the background.
     */
    function loadBackground() {
      var i
        , color; // The window color.

      for (i = 0; i < background.length; i++) {
        background[i] = background[i].replace(/ /g, '&nbsp') 
        background[i] = background[i].replace(/\*/g, '<span style="color:' + lightsOffColor + '">*</span>');
        background[i] = '<span style="color:' + lightsOffColor + '">' + background[i] + '</span><br>';

        color = lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];
        changeWindow(i, color);
      }

      aa.dom.background.html(background);
    }

    /*
     * Randomly chooses a level, and a window in the level, to recolor.
     */
    function animateWindows() {
      var i 
        , level  // Random level of the background.
        , color; // The window color.

      level = aa.randomInRange(0, background.length - 1);

      color = (Math.random() > 0.5) // 50% change of using an on color or the off color.
        ? lightsOffColor
        : lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];

      changeWindow(level, color);

      aa.dom.background.html(background);

      setTimeout(animateWindows, aa.randomInRange(100, 500));
    }

    loadBackground();
    setTimeout(animateWindows, aa.randomInRange(200, 500));
  }

  function animateBlinkingAntenas() {
    function blinker1() {
      aa.dom.blinker1.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 250);
    }
    function blinker2() {
      aa.dom.blinker2.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 250);
    }
    function blinker3() {
      aa.dom.blinker3.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 500);
    }
    function blinker4() {
      aa.dom.blinker4.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 750);
    }
    function blinker5() {
      aa.dom.blinker5.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 143);
    }
    function blinker6() {
      aa.dom.blinker6.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 200);
    }

    aa.loops.blinker1 = setInterval(blinker1, 1234);
    aa.loops.blinker2 = setInterval(blinker2, 2300);
    aa.loops.blinker3 = setInterval(blinker3, 1818);
    aa.loops.blinker4 = setInterval(blinker4, 2000);
    aa.loops.blinker5 = setInterval(blinker5, 1143);
    aa.loops.blinker6 = setInterval(blinker6, 1777);
  }

  function animateStartBtn(show) {
    if (show) { // Animate start button into view.
      aa.dom.startBtn
        .css({ 'right': offscreenLR })
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
    else { // Animate start button out of view.
      aa.dom.startBtn
        .animate({'right': offscreenLR }, { duration: duration, queue: false });
    }
  };

  function animateInstructions(show) {
    if (show) {
      aa.dom.instructions
        .css({ 'left': offscreenLR })
        .animate({'left': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.instructions.animate({ 'left': offscreenLR }, { duration: duration, queue: false });
    }
  };

  function animateQuitInstructions(show) {
    if (show) {
      aa.dom.quitInstructions
        .css({ 'right': offscreenLR })
        .animate({'right': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.quitInstructions
        .animate({ 'right': offscreenLR }, { duration: duration, queue: false });
    }
  };

  function animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.window.width() / 2) - 20, 'top': -500 })
        .animate({ 'top': 450 }, { duration: duration, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': offscreenTB }, { duration: duration, queue: false });
    }
  };

  // function loadCivilians() {
  //   var i
  //     , colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue']
  //     , civs = [
  //       '                                                                                                ',
  //       '    o             o                            o              o O                o              ',
  //       '   /|\\           /)\\                          /|\\             |\\/\\              /|\\             ',
  //       '____)\\___________/ )__________________________( \\____________( \\((_______________)\\_____________'
  //     ];

  //   for (i = 0; i < civs.length; i++) {
  //     civs[i] = civs[i].replace(/ /g, '&nbsp;');
  //     civs[i] = '<span style="color:' + colors[i] + '">' + civs[i] + '</span><br>';
  //   }

  //   aa.dom.civilians.html(civs);
  // }

  // function buildCivilianAnimations() {
  //   var colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue']
  //     , i
  //     , j;

  //   animations = {
  //     current: 0,
  //     frames: [
  //       [
  //         '                                                                                                ',
  //         '    o/           \\o/                           o               oO                o              ',
  //         '   /|             )                           v|v             /><\\              /(\\             ',
  //         '____)\\___________/ )___________________________)\\_____________))((______________( )_____________'
  //       ],[
  //         '                                                                                \\o/             ',
  //         '    o                 \\o/                     \\o/             \\oO/               |              ',
  //         '   /|V                 )                       |              /  \\              / \\             ',
  //         '____)\\________________/ )______________________)\\_____________))((______________________________'
  //       ],[
  //         '                                                                                                ',
  //         '    o/                \\o/                      o              \\oO/               o              ',
  //         '   /|                  (                      v|v             /  \\              /(\\             ',
  //         '____)\\________________( \\_____________________/(______________))((______________( )_____________'
  //       ],[
  //         '                                                                                                ',
  //         '    o            \\o/                          \\o/              oO                o              ',
  //         '   /|V            (                            |              /><\\              /(\\             ',
  //         '____)\\___________( \\__________________________/(______________))((______________( )_____________'
  //       ]
  //     ]
  //   };

  //   for (i = 0; i < animations.frames.length; i++) {
  //     for (j = 0; j < animations.frames[i].length; j++) {
  //       animations.frames[i][j] = animations.frames[i][j]
  //         .replace(/ /g, '&nbsp;')
  //         .replace(/</g, '&lt;')
  //         .replace(/>/g, '&gt;');
  //       animations.frames[i][j] = '<span class="civilians'
  //         + (i+1) 
  //         + '" style="color:' + colors[j] + '">' 
  //         + animations.frames[i][j] 
  //         + '</span><br>';
  //     }
  //   }
    
  //   return animations;
  // }

  // function animateCivilians() {
  //   if (!animations) { 
  //     buildCivilianAnimations();
  //   }
      
  //   if (++animations.current % animations.frames.length === 0) {
  //     animations.current = 0;
  //   }

  //   aa.dom.civilians.html(animations.frames[animations.current].join(''));
  // };


  return aa;

})(asteriskAttack);

