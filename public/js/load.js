"use strict";

var asteriskAttack = (function _loadJs(aa) {


  /*
   * Preload the asterisk SVGs to avoid unnecessary dom manipulations.
   */
  aa.loadAsterisks = function() {
    var i
      , randIdx
      , asterisk
      , quantity = 100
      , colors = ['yellow','gold','orange','orangered','red','deeppink','hotpink','fuchsia','lightskyblue','dodgerblue','blue', 'yellowgreen','lime']
      // SVGs are the outlined asterisk character from font Incolsolata, exported by Illustrator.
      , svgs = [
        [10, '<svg class="asterisk" version="1.1" x="0px" y="0px" width="10px" height="10px"><path d="M4.123,0.05h1.945C6.054,0.145,5.565,4.294,5.565,4.294l3.811-1.729L10,4.03L5.897,5.277l3.025,3.621L7.601,9.928 l-2.59-3.979L2.326,9.95L1.031,8.898l3.12-3.601L0,4.03l0.624-1.56l3.886,1.824L4.123,0.05z"/></svg>'],
        [20, '<svg class="asterisk" version="1.1" x="0px" y="0px" width="20px" height="20px"><path d="M8.245,0.1h3.89c-0.027,0.19-1.004,8.489-1.004,8.489l7.621-3.458L20,8.061l-8.205,2.494l6.051,7.242l-2.645,2.059 l-5.18-7.957L4.652,19.9l-2.591-2.104l6.239-7.201L0,8.061l1.247-3.12l7.771,3.648L8.245,0.1z"/></svg>'],
        [30, '<svg class="asterisk" version="1.1" x="0px" y="0px" width="30px" height="30px"><path d="M12.368,0.15h5.834c-0.041,0.286-1.506,12.733-1.506,12.733l11.431-5.187l1.872,4.394l-12.307,3.741l9.076,10.863 l-3.967,3.087l-7.77-11.935L6.979,29.85l-3.886-3.154l9.358-10.802L0,12.091l1.871-4.68l11.657,5.472L12.368,0.15z"/></svg>'],
        [40, '<svg class="asterisk" version="1.1" x="0px" y="0px" width="40px" height="40px"><path d="M16.49,0.2h7.779c-0.055,0.381-2.008,16.978-2.008,16.978l15.241-6.915l2.496,5.858L23.59,21.109l12.102,14.484 l-5.288,4.116l-10.36-15.913L9.305,39.8l-5.182-4.206l12.478-14.402L0,16.121l2.494-6.24l15.542,7.296L16.49,0.2z"/></svg>'],
        [50, '<svg class="asterisk" version="1.1" x="0px" y="0px" width="50px" height="50px"><path d="M20.613,0.25h9.724c-0.068,0.478-2.511,21.225-2.511,21.225l19.054-8.646L50,20.153l-20.512,6.235l15.126,18.104 l-6.611,5.146L25.054,29.746L11.631,49.75l-6.477-5.258L20.752,26.49L0,20.153l3.118-7.8l19.429,9.121L20.613,0.25z"/></svg>']
      ];

    // Garbage collect the old asterisks.
    aa.dom.asterisksIdle.length = 0;

    for (i = 0; i < quantity; i++) {
      randIdx = aa.randomInRange(0, svgs.length-1);

      asterisk = svgs[randIdx][1];
      asterisk = asterisk.replace('svg', 'svg style="'
        + 'top:-' + svgs[randIdx][0] + 'px; '
        + 'left:' + aa.randomInRange(0, aa.dom.attackZone.width() - 20) + 'px;"'
      );
      asterisk = asterisk.replace('path', 'path fill="' + colors[aa.randomInRange(0, colors.length-1)] + '"');
      asterisk = $(asterisk);

      aa.dom.asterisksIdle.push(asterisk);
      aa.dom.attackZone.prepend(asterisk);
    }
  };


  /*
   * Load the asterisks for the first time right away.
   */
  (function _preloadAsterisks() {
    aa.loadAsterisks();
  })();


  /*
   * Preload the heatrays to avoid unnecessary dom manipulations.
   */
  (function _loadHeatrays() {
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
  (function _loadDefender() {
    aa.dom.defender.html('<span style="color:red">&nbsp;,</span><span style="color:tan">o</span><span style="color:blue">/</span><br>'
      + '<span style="color:red">/</span><span style="color:blue">/(&nbsp;</span><br>'
      + '<span style="color:red">)</span><span style="color:blue">/&nbsp;&gt;</span><br>'
    );
  })();


  /*
   * Load button/link text.
   */
  (function _loadGameText() {
    aa.dom.playBtn.html('<a href="#">P L A Y</a>');
    aa.dom.playBtnLink = $('#play-btn > a');

    aa.dom.gameOverMsg.html('G A M E &nbsp; O V E R');

    aa.storageAvailable()
      ? aa.dom.menu.html('<a id="how-to-play-link" href="#">HOW TO PLAY</a>'
          + '&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;'
          + '<a id="top-scores-link" href="#">YOUR TOP SCORES</a>')
      : aa.dom.menu.html('<a id="how-to-play-link" href="#">HOW TO PLAY</a>');

    aa.dom.howToPlayLink = $('#how-to-play-link');
    aa.dom.howToPlayBackLinkWrapper.html('<a href="#">BACK TO GAME</a>');
    aa.dom.howToPlayBackLink = $('#how-to-play-back-link-wrapper > a');

    aa.dom.topScoresLink = $('#top-scores-link');
    aa.dom.topScoresBackLinkWrapper.html('<a href="#">BACK TO GAME</a>');
    aa.dom.topScoresBackLink = $('#top-scores-back-link-wrapper > a');

    aa.dom.howToQuitMsg.html('PRESS ESC TO QUIT');

    aa.dom.howToPlay.html('BLOCK THE ASTERISKS'
      + '&nbsp;&nbsp;<span style="color:#555">*</span>&nbsp;&nbsp;'
      + 'PRESS <span style="color:white">SPACEBAR</span> FOR HEAT VISION'
      + '&nbsp;&nbsp;<span style="color:#555">*</span>&nbsp;&nbsp;'
      + 'PRESS <span style="color:white">ESC</span> TO QUIT'
    );
  })();


  /*
   * Randomly generate a starry night sky (lots of bullet characters).
   */
  (function _loadStars() {
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
    function _biasedTowardMin(min, max) {
      // Cut the distribution's max in half, half the time.
      max = (Math.random() > 0.5) ? max : max * 0.5;
      return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
    }

    for (i = 0; i < numStars; i++) {
      stars += '<span '
        + 'class="star" '
        + 'style="position:absolute; '
        + 'top:' + _biasedTowardMin(0, height) + 'px; '
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
   * Shoot the shooting star across the sky to and from random locations, at random intervals.
   */
  (function _loadShootingStar() {
    aa.dom.stars.prepend('<div id="shooting-star" style="position:absolute;">•</div>');
    aa.dom.shootingStar = $('#shooting-star');

    function _shootTheShootingStar() {
      if (!document.hidden) {
        var startPosTop  = 0
          , startPosLeft = aa.randomInRange(-300, aa.dom.stars.width() + 300)
          , endPosTop    = aa.randomInRange(aa.dom.stars.height() - 100, aa.dom.stars.height())
          , endPosLeft   = aa.randomInRange(143, aa.dom.stars.width() - 143)
          , duration;

        // Lets not shoot the star straight down, ok?
        if (endPosLeft < startPosLeft && endPosLeft > startPosLeft - 300) {
          endPosLeft -= 300;
        }
        else if (endPosLeft > startPosLeft && endPosLeft < startPosLeft + 300) {
          endPosLeft += 300;
        }

        // Increase duration for longer distances, so star speeds are somewhat uniform.
        duration = 700 + (Math.abs(startPosLeft - endPosLeft));

        aa.dom.shootingStar
          .stop()
          .css({ 'top': startPosTop, 'left': startPosLeft, 'color': 'white' })
          .animate({ 'top': endPosTop, 'left': endPosLeft, 'color': '#101010' }, { duration: duration, easing: 'linear' });
      }

      setTimeout(_shootTheShootingStar, aa.randomInRange(3000, 7000));
    }

    setTimeout(_shootTheShootingStar, 1000);
  })();


  /*
   * Hide stars, which are situated behind cityscape buildings, behind opaque divs.
   */
  (function _loadStarlessAreas() {
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
  (function _loadLogo() {
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
   * Load the top scores ascii art headline into its div, and color it.
   */
  (function _loadDigitalTopScoresHeadline() {
    var headline = [
      ' __ __ __    __   __ __ __ __ __ __',
      ' / / //_/  // /  /_ /  / //_//_ /_ ',
      '/ /_//    //_/  __//_ /_// \\/_ __/ '
    ];

    aa.dom.digitalTopScoresHeadline.html(''
      + '<span style="color:deeppink;">' + headline[0].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:hotpink;">' + headline[1].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:fuchsia;">' + headline[2].replace(/ /g, '&nbsp;') + '</span><br>'
    );
  })();


  /*
   * Load the how-to-play ascii art headline into its div, and color it.
   */
  (function _loadDigitalHowToPlayHeadline() {
    var headline = [
      '     __       __ __   __    __   ',
      ' /_// // / /  / / /  /_//  /_//_/',
      '/ //_//_/_/  / /_/  /  /_ / / _/ '
    ];

    aa.dom.digitalHowToPlayHeadline.html(''
      + '<span style="color:deeppink;">' + headline[0].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:hotpink;">' + headline[1].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:fuchsia;">' + headline[2].replace(/ /g, '&nbsp;') + '</span><br>'
    );
  })();


  /*
   * Load the flashing antena lights (text bullets) into their div, and set the interval for each.
   */
  (function _loadAntenas() {
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
    function _flashAntenas() {
      var i
        , flashIntervals = [1234,2300,1818,2000,1143,1777]
        , flashDurations = [250,250,500,750,143,200];

      for (i = 0; i < flashIntervals.length; i++) {
        (function _captureIValueForInterval(j) {
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
    _flashAntenas();
  })();


  /*
   * Load the cityscape ascii art into its div, and set a timeout for random window lighting (color) changes.
   */
  (function _loadCityscape() {
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
    function _changeWindow(level, color) {
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
    function _setCityscape() {
      var i
        , color; // The window color.

      for (i = 0; i < cityscape.length; i++) {
        cityscape[i] = cityscape[i].replace(/ /g, '&nbsp')
        cityscape[i] = cityscape[i].replace(/\•/g, '<span style="color:' + lightsOffColor + '">•</span>');
        cityscape[i] = '<span style="color:' + silhouetteColor + '">' + cityscape[i] + '</span><br>';

        color = lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];
        _changeWindow(i, color);
      }

      aa.dom.cityscape.html(cityscape.join(''));
    }

    /*
     * A function to be given to setTimeout to re-color windows randomly.
     */
    function _animateCityscapeWindows() {
      var i
        , level // A randomly chosen level of the cityscape.
        , color; // A randomly chosen window color.

      if (!document.hidden) {
        level = aa.randomInRange(0, cityscape.length - 1);

        color = (Math.random() > 0.5) // 50 percent chance of lights-on or off.
          ? lightsOffColor
          : lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];

        _changeWindow(level, color);

        aa.dom.cityscape.html(cityscape.join(''));
      }

      setTimeout(_animateCityscapeWindows, aa.randomInRange(100, 500));
    }

    _setCityscape();
    setTimeout(_animateCityscapeWindows, aa.randomInRange(200, 500));
  })();


  return aa;

})(asteriskAttack);

