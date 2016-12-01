"use strict";

var asteriskAttack = (function load(aa) {


  /*
   * Randomly generate a starry night sky (lots of bullet characters).
   */
  (function loadStars() {
    var i
      , width = aa.dom.stars.width()
      , height = aa.dom.stars.height()
      , sizes = [0.2, 0.3, 0.4, 0.5]
      , colors = ['#777','#888','#999','#aaa']
      , stars = ''
      , numStars = 1500;

    /*
     * Returns a number according to a linear distribution which favors numbers closer to min,
     * and halves the distributions max about half the time.
     * @param {number} min The distribution's min value.
     * @param {number} max The distribution's max value.
     * @return {number}
     */ 
    function biasedTowardMin(min, max) {
      // Cut the distribution's max in half, half the time.
      max = (Math.random() > 0.5) ? max : max * 0.5;
      return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
    }

    for (i = 0; i < numStars; i++) {
      stars += '<span '
        + 'class="star" '
        + 'style="position:absolute; '
        + 'top:' + biasedTowardMin(0, height) + 'px; '
        + 'left:' + aa.randomInRange(0, width) + 'px; '
        + 'font-size:' + sizes[aa.randomInRange(0, sizes.length - 1)] + 'em; '
        + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
        + '">'
        + '•'
        + '</span>';
    }

    aa.dom.stars.html(stars);
  })();


  /*
   * Hide stars, which are situated behind cityscape buildings, behind opaque divs.
   */
  (function loadStarlessAreas() {
    var i
      , numAreas = 7
      , areas = '';

    for (i = 0; i < numAreas; i++) {
      areas += '<div id="starless' + (i+1) + '" class="starless"></div>';
    }

    aa.dom.starlessAreas.html(areas);
  })();


  /*
   * Load the logo ascii art into its div, and color it.
   */
  (function loadLogo() {
    var i
      , colors = ['yellow', 'yellow', 'gold','orange','orangered','red']
      , logo = [

        '                      __                *       __             __   __               __         ',
        '______   _____ _____ / /_  _____ ____ __ _____ / /_     _____ / /_ / /_  _____ ____ / /_     ___',
        '_____   ___  // ___// __/ / _  // __// // ___//   /    ___  // __// __/ ___  // __//   /    ____',
        '____   / _  //___ // /__ / ___// /  / //___ //   \\_   / _  // /__/ /__ / _  // /__/   \\_   _____',
        '___   /____//____//____//____//_/  /_//____//_/\\__/  /____//_________//____//______/\\__/  ______',
        '________________________________________________________________________________________________'
      ];

    for (i = 0; i < logo.length; i++) {
      logo[i] = logo[i].replace(/ /g, '&nbsp;');
      logo[i] = '<span style="color:'
        + colors[i] + '">'
        + logo[i]
        + '</span><br>';
    }

    aa.dom.logo.html(logo)
  })();


  /*
   * Load the top scores ascii art header into its div, and color it.
   */
  (function loadTopScoresHeader() {
    var header = [
      ' __ __ __    __   __ __ __ __ __ __',
      ' / / //_/  // /  /_ /  / //_//_ /_ ',
      '/ /_//    //_/  __//_ /_// \\/_ __/ '
    ];

    aa.dom.topScoresHeader.html(''
      + '<span style="color:deeppink;">' + header[0].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:hotpink;">' + header[1].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:fuchsia;">' + header[2].replace(/ /g, '&nbsp;') + '</span><br>'
    );
  })();


  /*
   * Load the how-to-play ascii art header into its div, and color it.
   */
  (function loadHowToPlayHeader() {
    var header = [
      '     __       __ __   __    __   ',
      ' /_// // / /  / / /  /_//  /_//_/',
      '/ //_//_/_/  / /_/  /  /_ / / _/ '
    ];

    aa.dom.howToPlayHeader.html(''
      + '<span style="color:deeppink;">' + header[0].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:hotpink;">' + header[1].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:fuchsia;">' + header[2].replace(/ /g, '&nbsp;') + '</span><br>'
    );
  })();


  /*
   * Load the flashing antena lights (text bullets) into their div, and set the interval for each.
   */
  (function loadAntenas() {
    var i 
      , count = 0
      , antenas = [
        '                                                                                                 •                                                    ',
        '                                                    •                                                                                                 ',
        '                                                                                                                                                      ',
        '                                                                                                                                                      ',
        '                                                                                                                                                      ',
        '                                      •                                                                                                               ',
        '                                                                                                                      •                               ',
        '                                                                                                                                                      ',
        '                                                                                                                                                      ',
        '                •                                                                                                                                     ',
        '                                                                                                                                                      ',
        '                                                                                                                                      •               '
      ];

    /*
     * Set the antena flash intervals.
     */
    function flashAntenas() {
      var i
        , flashIntervals = [1234,2300,1818,2000,1143,1777]
        , flashDurations = [250,250,500,750,143,200];

      for (i = 0; i < flashIntervals.length; i++) {
        (function(j) {
          aa.intervals.antenas[j] = setInterval(function() {
            if (!document.hidden) { // No need to make a noise if nobody's in the woods to hear it.
              $('#antena' + (j+1)).css({ 'color': 'white' })
                .animate({ 'color': '#101010' }, flashDurations[j]);
            }
          }, flashIntervals[j]);
        })(i);
      }
    }

    // Wrap antena flashers in span tags so they can be targeted.
    for (i = 0; i < antenas.length; i++) {
      antenas[i] = antenas[i].replace(/ /g, '&nbsp;')
      if (/•/.test(antenas[i])) {
        antenas[i] = antenas[i].replace(/•/, '<span id="antena' + (++count) + '" style="font-size:0.9em;">•</span>');
      }
    }

    aa.dom.antenas.html(antenas.join('<br>'));
    flashAntenas();
  })();


  /*
   * Load the cityscape ascii art into its div, and set a timeout for random window lighting (color) changes.
   */
  (function loadCityscape() {
    var lightsOnColors = ['#777', '#888', '#999']
      , lightsOffColor = '#333'
      , silhouetteColor = '#777' // The building outlines.
      , cityscape = [
        '                                                                                                                                                      ',
        '                                                                                                 |                                                    ',
        '                                                    |                                      ______|______                                              ',
        '                                                 ___|_|_____                               |           |                                              ',
        '                                                 |         |                               | • • • • • |                                              ',
        '                                                 | • • • • |                               |           |____                                          ',
        '                                      |          |         |                               | • • • • •     |                                          ',
        '                                      |          | • • • • |                        _____________        • |          |                               ',
        '                                 _____|_______   |         |______                  |           |  • •     |         ||                               ',
        '                                 |           |   | • • •         |                  | • • • • • |        • |  _______||____                           ',
        '                |                | • • • • • |   |         • • • |                  |           |  • •     |  |           |                           ',
        '             ___|_______                     |   | • • •     _____________          | • • • • • |        • |  | • • • • • |                           ',
        '             |         |   ___________ • • • |   |         • |           |          |           |  • •     |  |           |           |               ',
        '             | • • • • |   |         |       |   | • • •     | • • • • • |          | • • • • • |             | • • • • • |    _______|__|____        ',
        '     ________|         |   | • • • • |   • • |   |         • |           |   _________          |  •  ___________         |    |             |        ',
        '     |           • • • |   |         |       |   | • •         • • • • • |   |       |  • • • • |     |         |   • • • |    | • • • • • • |        ',
        '     | • • • •         |   | • • • • |   • •     | _____________         |   | • • • |          |  •  | • • • • |         |    |                      ',
        '___________        • • |   |         |           | |           |   • • • |   |       |  • • •         |         |     • • |    | • •   _______________',
        '|         |  •         |       • • • |   •         | • • • • • |         |   | • • • |                | • • • •                |       |             |',
        '  • • • • |          •               |                         |     • •     |       |  • •           |                 •        •     | • • • • • •  ',
        '                                   • |                 • • • • |                     |                | • •                            |              ',
        '                                                               |                                      |                                               '
      ];

    /*
     * Changes the color of a randomly selected window on a particular level of the cityscape.
     * @param {number} level An array index representing the level of the cityscape.
     * @param {string} color A CSS color, with a hash sign, 3 digits only.
     */
    function changeWindow(level, color) {
      var i
        , count // The level's number of windows.
        , selected // A randomly selected window in the level.
        , pos;

      count = cityscape[level].split('•').length - 1;

      if (count > 0) {
        selected = aa.randomInRange(1, count);
        pos = cityscape[level].indexOf('•');

        while (--selected) {
          pos = cityscape[level].indexOf('•', pos+1);
        }

        // Set the span tag style attr's css color, beginning 6 characters behind the bullet.
        // e.g. <span style="color:#777">•
        cityscape[level] = cityscape[level].substr(0, pos-6)
          + color
          + '">•'
          + cityscape[level].substr(pos+1, cityscape[level].length);
      }
    }

    /*
     * Loads the cityscape ascii art into its div, coloring one random window with a lights-on color on each level of the cityscape.
     */
    function setCityscape() {
      var i
        , color; // The window color.

      for (i = 0; i < cityscape.length; i++) {
        cityscape[i] = cityscape[i].replace(/ /g, '&nbsp')
        cityscape[i] = cityscape[i].replace(/\•/g, '<span style="color:' + lightsOffColor + '">•</span>');
        cityscape[i] = '<span style="color:' + silhouetteColor + '">' + cityscape[i] + '</span><br>';

        color = lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];
        changeWindow(i, color);
      }

      aa.dom.cityscape.html(cityscape.join(''));
    }

    /*
     * A function to be given to setTimeout to re-color windows randomly.
     */
    function animateCityscapeWindows() {
      var i
        , level // A randomly chosen level of the cityscape.
        , color; // A randomly chosen window color.

      if (!document.hidden) { // No need to make a noise if nobody's in the woods to hear it.
        level = aa.randomInRange(0, cityscape.length - 1);

        color = (Math.random() > 0.5) // 50 percent chance of lights-on or off.
          ? lightsOffColor
          : lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];

        changeWindow(level, color);

        aa.dom.cityscape.html(cityscape.join(''));
      }

      setTimeout(animateCityscapeWindows, aa.randomInRange(100, 500));
    }

    setCityscape();
    setTimeout(animateCityscapeWindows, aa.randomInRange(200, 500));
  })();


  /*
   * Preload the asterisks to avoid unnecessary dom manipulations.
   */
  (function loadAsterisks() {
    var i
      , asterisk
      , quantity = 100
      , colors = ['yellow','gold','orange','orangered','red','deeppink','hotpink','fuchsia','lightskyblue','dodgerblue','blue', 'yellowgreen','lime'];

    for (i = 0; i < quantity; i++) {
      asterisk = $('<div '
        + 'class="asterisk" '
        + 'style="'
        + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
        + 'font-size:' + aa.randomInRange(12, 42) + 'px; '
        + 'left:' + aa.randomInRange(0, aa.dom.attackZone.width() - 20) + 'px; '
        + '">*</div>'); 

      aa.dom.asterisksIdle.push(asterisk);
      aa.dom.attackZone.prepend(asterisk);
    }
  })();


  /*
   * Preload the heatrays to avoid unnecessary dom manipulations.
   */
  (function loadHeatrays() {
    var i 
      , heatray
      , quantity = 10;

      for (i = 0; i < quantity; i++) {
        heatray = $('<div '
          + 'class="heatray" '
          + 'style="top:-150px; left:0;" '
          + '>|<br>|<br>|<br></div>');

        aa.dom.heatraysIdle.push(heatray);
        aa.dom.zones.prepend(heatray);
      }
  })();


  /*
   * Load the defender ascii art.
   */
  (function loadDefender() {
    aa.dom.defender.html('<span style="color:red">&nbsp;,</span><span style="color:tan">o</span><span style="color:blue">/</span><br>'
      + '<span style="color:red">/</span><span style="color:blue">/(&nbsp;</span><br>'
      + '<span style="color:red">)</span><span style="color:blue">/&nbsp;&gt;</span><br>'
    );
  })();


  /*
   * Load button/link text.
   */
  (function loadGameText() {
    aa.dom.playBtn.html('<a href="#">P L A Y</a>');
    aa.dom.playBtnLink = $('#play-btn > a');

    aa.dom.gameOverMsg.html('G A M E &nbsp; O V E R');

    aa.dom.menu.html('<a id="how-to-play-link" href="#">HOW TO PLAY</a>'
      + '&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;'
      + '<a id="top-scores-link" href="#">YOUR TOP SCORES</a>'
    );
    aa.dom.howToPlayLink = $('#how-to-play-link');
    aa.dom.topScoresLink = $('#top-scores-link');

    aa.dom.howToPlay.html('BLOCK THE ASTERISKS'
      + '&nbsp;&nbsp;<span style="color:#555">*</span>&nbsp;&nbsp;'
      + 'PRESS <span style="color:white">SPACEBR</span> FOR HEAT VISION'
      + '&nbsp;&nbsp;<span style="color:#555">*</span>&nbsp;&nbsp;'
      + 'PRESS <span style="color:white">ESC</span> TO QUIT'
    );

    aa.dom.howToQuitMsg.html('PRESS ESC TO QUIT');

    aa.dom.topScoresDone.html('<a href="#">BACK TO GAME</a>');
    aa.dom.topScoresDoneBtn = $('#top-scores-done > a');

    aa.dom.howToPlayDone.html('<a href="#">BACK TO GAME</a>');
    aa.dom.howToPlayDoneBtn = $('#how-to-play-done > a');
  })();


  return aa;

})(asteriskAttack);

