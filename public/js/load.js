var asteriskAttack = (function(aa) {

  (function loadLogo() {
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
      logo[i] = '<span style="color:'
        + colors[i] + '">'
        + logo[i]
        + '</span><br>';
    }

    aa.dom.logo.html(logo)
  })();


  (function loadCityscape() {
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
    function setCityscape() {
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
    function animateCityscapeWindows() {
      var i
        , level  // Random level of the background.
        , color; // The window color.

      level = aa.randomInRange(0, background.length - 1);

      color = (Math.random() > 0.5) // 50% change of using an on color or the off color.
        ? lightsOffColor
        : lightsOnColors[aa.randomInRange(0, lightsOnColors.length - 1)];

      changeWindow(level, color);

      aa.dom.background.html(background);

      setTimeout(animateCityscapeWindows, aa.randomInRange(100, 500));
    }

    function loadAntenas() {
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

    setCityscape();
    loadAntenas();
    setTimeout(animateCityscapeWindows, aa.randomInRange(200, 500));
  })();

  return aa;

})(asteriskAttack);

