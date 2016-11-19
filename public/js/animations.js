var asteriskAttack = (function(aa) {

  var offscreenLR = -1500
    , offscreenTB = -50
    , duration = 300;

  aa.animateLoadGame = function() {
    if (!validScreenSize()) return;
    animateLogo();
    animateScore();
    animateBackground();
    animateStartBtn(true);
    animateScoreboardLink(true);
    animateInstructions(true);
    animateBlinkingAntenas();
  };

  aa.animateStartGame = function() {
    animateStartBtn(false);
    animateScore();
    animateDefender(true);
    animateGameOver(false);
    animateScoreboardLink(false);
    animateInstructions(false);
    animateQuitInstructions(true);
  };

  aa.animateEndGame = function() {
    animateStartBtn(true);
    animateDefender(false);
    animateGameOver(true);
    animateScoreboardLink(true);
    animateInstructions(true);
    animateQuitInstructions(false);
  };

  function validScreenSize() {
    if (aa.dom.window.width() < 1000) {
      aa.dom.game.css({ 'display':'none' });
      aa.dom.screenSizeError.css({ 'display':'inherit' });

      aa.loops.screenSizeError = setInterval(function() {
        aa.dom.errorMsg.effect('shake', {}, 200);
      }, 2000);

      aa.dom.reload.click(function() {
        location.reload();
      });

      return false;
    }
    return true;
  }

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
      .animate({ 'left': '' }, { duration: duration, queue: false });
  }

  function animateScore() {
    if (aa.stats.plays > 0) {
      if (aa.stats.prevScore > 0) {
        aa.dom.score.effect('shake', duration, function() {
          aa.updateScore();
        });
      }
    }
    else {
      aa.updateScore();
      aa.dom.score
        .css({ 'right': offscreenLR })
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
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
        '                                      |          |         |                                 | * * * * |   |                                          ',
        '                                      |          | * * * * |                        _________|         | * |          |                               ',
        '                                 _____|_______   |       _________                  |          * * * * |   |         ||                               ',
        '                                 |           |   | * * * |       |                  | * * * *          | * |  _______||____                           ',
        '                |                | * * * * * |   |       | * * * |                  |          * * * *     |  |           |                           ',
        '             ___|_______                     |   | * * *         |________          | * * * *            * |  | * * * * * |                           ',
        '             |         |   ___________ * * * |   |         * *           |          |          * * * *     |  |           |           |               ',
        '             | * * * * |   |         |       |   | * *           * * * * |            * * * *                 | * * * * * |    _______|__|____        ',
        '     ________|         |   | * * * * |   * * |   |         * *           |   _________           * *  ___________         |    |             |        ',
        '     |           * * * |   |         |       |   | *  |          * * * * |   |       |  * * *         |         |   * * * |    | * * * * * * |        ',
        '     | * * * *         |   | * * * * |   * * |   | ___|_________         |   | * * * |             *  | * * * * |         |    |                      ',
        '___________        * * |   |         |           | |           |   * * * |   |       |  * *           |         |     * * |    | * *   _______________',
        '|         |  *         |       * * * |   *         | * * * * * |         |   | * * * |                | * * * *                |       |             |',
        '  * * * * |          *               |                         |     * *     |       |  *             |                 *        *     | * * * * * *  ',
        '                                   * |                 * * * * |                     |                | * *                            |              ',
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
    function antena1() {
      aa.dom.antena1.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 250);
    }
    function antena2() {
      aa.dom.antena2.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 250);
    }
    function antena3() {
      aa.dom.antena3.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 500);
    }
    function antena4() {
      aa.dom.antena4.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 750);
    }
    function antena5() {
      aa.dom.antena5.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 143);
    }
    function antena6() {
      aa.dom.antena6.css({ 'color': 'white' })
        .animate({ 'color': '#111' }, 200);
    }

    aa.loops.antena1 = setInterval(antena1, 1234);
    aa.loops.antena2 = setInterval(antena2, 2300);
    aa.loops.antena3 = setInterval(antena3, 1818);
    aa.loops.antena4 = setInterval(antena4, 2000);
    aa.loops.antena5 = setInterval(antena5, 1143);
    aa.loops.antena6 = setInterval(antena6, 1777);
  }

  function animateStartBtn(show) {
    if (show) { // Animate start button into view.
      if (aa.stats.plays === 1) {
        aa.dom.startBtn.html('<a href="#" style="color:white">P L A Y&nbsp;&nbsp;&nbsp;A G A I N</a><br>');

        $('#start-btn a').click(function() {
          asteriskAttack.start();
        });
      }

      aa.dom.startBtn
        .css({ 'right': offscreenLR })
        .show()
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
    else { // Animate start button out of view.
      aa.dom.startBtn
        .animate({'right': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.startBtn.hide();
        });
    }
  }

  function animateScoreboardLink(show) {
    if (aa.retrieveScores()) {
      if (show) {
        aa.dom.scoreboardLinkWrapper
          .css({ 'left': offscreenLR })
          .show()
          .animate({ 'left': '' }, { duration: duration, queue: false });
      }
      else {
        aa.dom.scoreboardLinkWrapper
          .animate({ 'left': offscreenLR }, { duration: duration, queue: false }, function() {
            aa.dom.scoreboardLinkWrapper.hide();
          });
      }
    }
  }

  function animateGameOver(show) {
    var i
      , colors = ['#444', '#888', '#ccc'] // Gray tones.
      //, colors = ['#ffff00','#ffd700','#ffa500','#ff4500','#ff0000'] // Red to yellow.
      , loops = ['gg','ga','gm','ge','oo','ov','oe','or'];

    if (show) {
      aa.dom.gameOver
        .show(function() {
          for (i = 0; i < loops.length; i++) {
            (function() {
              var j = i
                , dur = aa.randomInRange(700, 1000);

              aa.loops[loops[j]] = setInterval(function() {
                var color = colors[aa.randomInRange(0, colors.length-1)];
                aa.dom[loops[j]]
                  .animate({ 'color':color }, dur) 
                  .animate({ 'color':'#111' }, dur);
              }, dur*2);
            })();
          }
        });
    }
    else if (aa.stats.plays > 1) { // Game over isn't shown until a game has been played.
      aa.dom.gameOver
        .fadeOut(200, function() {
          for (i = 0; i < loops.length; i++) {
            window.clearInterval(aa.loops[loops[i]])
          }
        });
    }
  }

  function animateInstructions(show) {
    if (show) {
      aa.dom.instructions
        .css({ 'left': offscreenLR })
        .show()
        .animate({ 'left': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.instructions
        .animate({ 'left': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.instructions.hide();
        });
    }
  }

  function animateQuitInstructions(show) {
    if (show) {
      aa.dom.quitInstructions
        .css({ 'right': offscreenLR })
        .show()
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.quitInstructions
        .animate({ 'right': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.quitInstructions.hide();
        });
    }
  }

  function animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.window.width() / 2) - 20, 'top': offscreenTB })
        .animate({ 'top': 450 }, { duration: duration, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': offscreenTB }, { duration: duration, queue: false });
    }
  }

  return aa;

})(asteriskAttack);

