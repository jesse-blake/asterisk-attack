'use strict';

var asteriskAttack = (function _scoreJs(app) {

    /*
     * Public facing score updater.
     */
    app.updateScore = function updateScore() {
        app.dom.digitalScore.html(_buildScore(app.game.score));
    };

    /*
     * Convert game score to colored three-line ascii art digits.
     * @param {number} n The non-negative score to build in ascii art.
     * @return {string} The score: a string of html to be injected into the page by jquery.
     */
    function _buildScore(n) {
        var i
            , result
            , number = ['', '', ''];

        // The 3 parts to each digit: [top, mid, bot].
        var parts = [
            ['__ ','/ /','/_/'], // 0
            [' ','/','/'],       // 1
            ['__ ','__/','/__'], // 2
            ['__ ','__/','__/'], // ...
            ['   ','/_/','  /'],
            ['__ ','/_ ','__/'],
            ['__ ','/_ ','/_/'],
            ['__ ','  /','  /'],
            ['__ ','/_/','/_/'],
            ['__ ','/_/','__/'],
        ];

        if (n) { // Build numbers > 0.
            while(n > 0) {
                number[0] = number[0] ? parts[n % 10][0] + ' ' + number[0] : parts[n % 10][0];
                number[1] = number[1] ? parts[n % 10][1] + ' ' + number[1] : parts[n % 10][1];
                number[2] = number[2] ? parts[n % 10][2] + ' ' + number[2] : parts[n % 10][2];
                n = parseInt(n / 10);
            }
        }
        else { // Build number 0.
            number[0] = parts[0][0];
            number[1] = parts[0][1];
            number[2] = parts[0][2];
        }

        // Add 'SCORE'.
        number[0] = '  __ __ __ __ __   ' + number[0];
        number[1] = '  /_ /  / //_//_   ' + number[1];
        number[2] = '  __//_ /_// \\/__  ' + number[2]; // Backslash is backslash escaped.

        // Pad line ends to line things up.
        number[0] = '  ' + number[0] + '';
        number[1] = ' ' + number[1] + ' ';
        number[2] = '' + number[2] + '  ';

        // Convert spaces to non-breaking spaces.
        for (i = 0; i < 3; i++) {
            number[i] = number[i].replace(/ /g, '&nbsp;');
        }

        // Add some color.
        result = '<span style="color:deeppink;">' + number[0] + '</span><br>'
               + '<span style="color:hotpink;">' + number[1] + '</span><br>'
               + '<span style="color:fuchsia;">' + number[2] + '</span><br>';

        return result;
    }

    return app;

})(asteriskAttack);
