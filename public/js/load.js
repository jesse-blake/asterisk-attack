var asteriskAttack = (function(aa) {

  (function loadStars() {
    var i
      , width = aa.dom.stars.width()
      , height = aa.dom.stars.height()
      , h
      , sizes = [.2, .3, .4, .5, .6, .7]
      , colors = ['#222', '#333', '#444', '#555']
      , stars = '';

    function biasedTowardZero(min, max) {
      return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
    }

    for (i = 0; i < 2000; i++) {
      h = (Math.random() > 0.5) ? height : height * 0.5;
      stars += '<span '
        + 'class="star" '
        + 'style="position:absolute; '
        + 'top:' + biasedTowardZero(0, h) + 'px; '
        + 'left:' + aa.randomInRange(0, width) + 'px; '
        + 'font-size:' + sizes[aa.randomInRange(0, sizes.length - 1)] + 'em; '
        + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
        + '">'
        + '•'
        + '</span>';
    }

    aa.dom.stars.html(stars);
  })();

  (function loadStarlessAreas() {
    var i
      , numAreas = 7
      , areas = '';

    for (i = 0; i < numAreas; i++) {
      areas += '<div id="starless' + (i+1) + '" class="starless"></div>';
    }

    aa.dom.starlessAreas.html(areas);
  })();

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

  (function loadScoreboardHeader() {
    var header = [
      ' __ __ __    __   __ __ __ __ __ __',
      ' / / //_/  // /  /_ /  / //_//_ /_ ',
      '/ /_//    //_/  __//_ /_// \\/_ __/ '
    ];

    aa.dom.scoreboardHeader.html(''
      + '<span style="color:deeppink;">' + header[0].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:hotpink;">' + header[1].replace(/ /g, '&nbsp;') + '</span><br>'
      + '<span style="color:fuchsia;">' + header[2].replace(/ /g, '&nbsp;') + '</span><br>'
    );
  })();

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

    function flashAntenas() {
      var i
        , flashIntervals = [1234,2300,1818,2000,1143,1777]
        , flashDurations = [250,250,500,750,143,200];

      for (i = 0; i < flashIntervals.length; i++) {
        (function(j) {
          aa.loops.antenas[j] = setInterval(function() {
            $('#antena' + (j+1)).css({ 'color': 'white' })
              .animate({ 'color': '#101010' }, flashDurations[j]);
          }, flashIntervals[j]);
        })(i);
      }
    }

    for (i = 0; i < antenas.length; i++) {
      antenas[i] = antenas[i].replace(/ /g, '&nbsp;')
      if (/•/.test(antenas[i])) {
        antenas[i] = antenas[i].replace(/•/, '<span id="antena' + (++count) + '" style="font-size:0.7em;">•</span>');
      }
    }

    aa.dom.antenas.html(antenas.join('<br>'));
    flashAntenas();
  })();

  (function loadCityscape() {
    var lightsOnColors = ['#444', '#555']
      , lightsOffColor = '#222'
      , silhouetteColor = '#333'
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
     * Changes a random window in a particular level of the cityscape.
     * @level {Number} An array index representing the level of the cityscape.
     * @color {String} A CSS color, with a hash sign, 3 digits only.
     */
    function changeWindow(level, color) {
      var i
        , count
        , selected;

      count = cityscape[level].split('•').length - 1;

      if (count > 0) {
        selected = aa.randomInRange(1, count);

        for (i = 0; i < cityscape[level].length; i++) {
          if (cityscape[level][i] === '•' && !--selected) {
            cityscape[level] = cityscape[level].substr(0, i-6)
              + color
              + '">•'
              + cityscape[level].substr(i+1, cityscape[level].length);
          }
        }
      }
    }

    /*
     * Colors one window with a lights-on color in each level of the cityscape.
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
     * Randomly chooses a level, and a window in the level, to recolor.
     */
    function animateCityscapeWindows() {
      var i
        , level  // Random level of the cityscape.
        , color; // The window color.

      level = aa.randomInRange(0, cityscape.length - 1);

      color = (Math.random() > 0.5) // 50% change of using an on color or the off color.
        ? lightsOffColor
        : lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];

      changeWindow(level, color);

      aa.dom.cityscape.html(cityscape.join(''));

      setTimeout(animateCityscapeWindows, aa.randomInRange(100, 500));
    }

    setCityscape();
    setTimeout(animateCityscapeWindows, aa.randomInRange(200, 500));
  })();

  (function loadAsterisks() {
    var i
      , asterisk
      , quantity = 100
      , colors = ['yellow', 'gold', 'orange', 'orangered', 'red', 'deeppink', 'hotpink', 'fuchsia', 'lightskyblue', 'dodgerblue', 'blue'];

    for (i = 0; i < quantity; i++) {
      asterisk = '<div '
        + 'class="asterisk" '
        + 'style="'
        + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
        + 'font-size:' + aa.randomInRange(12, 42) + 'px; '
        + 'left:' + aa.randomInRange(0, aa.dom.attackZone.width() - 20) + 'px; '
        + '">*</div>'; 

      asterisk = $(asterisk);
      aa.dom.asterisks.push(asterisk);
      aa.dom.attackZone.prepend(asterisk);
    }
  })();

  return aa;

})(asteriskAttack);

