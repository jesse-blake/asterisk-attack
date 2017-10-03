'use strict';

/*global $*/

var asteriskAttack = (function _stateJs(app) {

    /*
     * Make ready to play the game anew.
     */
    app.reset = function reset() {
        app.game.prevScore = app.game.score;
        app.game.score = 0;
        app.game.plays++;

        app.game.asteriskGenerationSpeed = 1000;
        app.updateScore();
    };

    // Pre-referenced dom elements for performance.
    app.dom = {
        win:                                            $(window),
        doc:                                            $(document),

        screenSizeError:                    $('#screen-size-error'),

        stars:                                        $('#stars'),
        shootingStar:                         null, // Set in load.js.

        game:                                         $('#game'),

        logo:                                         $('#logo'),

        starlessAreas:                        $('#starless-areas'),
        background:                             $('#background'),
        antenas:                                    $('#antenas'),
        cityscape:                                $('#cityscape'),

        playBtn:                                    $('#play-btn'),
        playBtnLink:                            null, // Set in load.js.

        gameOverMsg:                            $('#game-over-msg'),

        menubar:                                    $('#menubar'),
        menu:                                         $('#menu'),

        howToPlayLink:                        null, // Set in load.js.
        howToPlayBackLinkWrapper: $('#how-to-play-back-link-wrapper'),
        howToPlayBackLink:                null, // Set in load.js.

        topScoresLink:                        null, // Set in load.js.
        topScoresBackLinkWrapper: $('#top-scores-back-link-wrapper'),
        topScoresBackLink:                null, // Set in load.js.

        howToQuitMsg:                         $('#how-to-quit-msg'),

        digitalScore:                         $('#digital-score'),
        digitalTopScoresHeadline: $('#digital-top-scores-headline'),
        digitalHowToPlayHeadline: $('#digital-how-to-play-headline'),

        topScores:                                $('#top-scores'),
        howToPlay:                                $('#how-to-play'),

        zones:                                        $('#zones'),
        attackZone:                             $('#attack-zone'),
        gameOverZone:                         $('#game-over-zone'),

        defender:                                 $('#defender'),

        gameOverFlashboom:                $('#game-over-flashboom'),

        asterisksIdle:                        [],
        asterisksAttacking:             {},
        attackerCount:                        0,    // Not a dom element; oh, well.
        heatraysIdle:                         [],
        heatraysDefending:                []
    };

    app.intervals = {
        screenSizeError:                    null,
        attack:                                     null,
        collision:                                null,
        background:                             null,
        antenas:                                    []
    };

    app.game = {
        score:                                     null,
        prevScore:                             null,
        plays:                                     0,
        asteriskGenerationSpeed: null
    };

    return app;

})(asteriskAttack);
