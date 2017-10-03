'use strict';

/*global $*/

var asteriskAttack = (function _animationsJs(app) {

    var duration = 300;

    /*
     * Call once to animate the game's main elements into view.
     */
    app.animateLoadGame = function animateLoadGame() {
        app.updateScore();
        _setClickHandlers();

        _showFromLeft(app.dom.menu);
        _showFromRight(app.dom.logo);
        _showFromLeft(app.dom.digitalScore);
        _showFromRight(app.dom.playBtn);
    };

    /*
     * Call whenever play is clicked to animate the start of a game.
     */
    app.animateStartGame = function animateStartGame() {
        _resetScore();
        _updatePlayBtn();

        _animateDefender(true);
        _hideToRight(app.dom.menu);
        _hideToRight(app.dom.playBtn);

        _showFromLeft(app.dom.howToQuitMsg);
    };

    /*
     * Call at game-over time to animate the game-over sequence.
     */
    app.animateEndGame = function animateEndGame() {
        _updatePlayBtn();

        _animateDefender(false);
        _showFromLeft(app.dom.gameOverMsg);
        _hideToRight(app.dom.howToQuitMsg);

        // Hide reloading the asterisks computation in the time taken to display the game-over message.
        setTimeout(function _loadAsterisksTimer() {
            app.loadAsterisks();
        }, 500);

        setTimeout(function endGameOverMsgTimer() {
            _hideToRight(app.dom.gameOverMsg);

            _showFromLeft(app.dom.menu);
            _showFromLeft(app.dom.playBtn);
        }, 1500);
    };

    /*
     * Animate the top scores 'page' into view.
     */
    function _showTopScores() {
        app.updateTopScores();

        _hideToRight(app.dom.menu);
        _hideToRight(app.dom.digitalScore);
        _hideToRight(app.dom.playBtn);
        _hideToRight(app.dom.background);

        _showFromLeft(app.dom.digitalTopScoresHeadline);
        _showFromLeft(app.dom.topScores);
        _showFromLeft(app.dom.topScoresBackLinkWrapper);
    }

    /*
     * Animate the top scores 'page' out of view.
     */
    function _hideTopScores() {
        _hideToRight(app.dom.digitalTopScoresHeadline);
        _hideToRight(app.dom.topScores);
        _hideToRight(app.dom.topScoresBackLinkWrapper);

        _showFromLeft(app.dom.menu);
        _showFromLeft(app.dom.digitalScore);
        _showFromLeft(app.dom.playBtn);
        _showFromLeft(app.dom.background);
    }

    /*
     * Animate the how-to-play 'page' into view.
     */
    function _showHowToPlay() {
        _hideToRight(app.dom.menu);
        _hideToRight(app.dom.digitalScore);
        _hideToRight(app.dom.playBtn);
        _hideToRight(app.dom.background);

        _showFromLeft(app.dom.howToPlayBackLinkWrapper);
        _showFromLeft(app.dom.digitalHowToPlayHeadline);
        _showFromLeft(app.dom.howToPlay);
    }

    /*
     * Animate the how-to-play 'page' out of view.
     */
    function _hideHowToPlay() {
        _hideToRight(app.dom.howToPlayBackLinkWrapper);
        _hideToRight(app.dom.digitalHowToPlayHeadline);
        _hideToRight(app.dom.howToPlay);

        _showFromLeft(app.dom.menu);
        _showFromLeft(app.dom.digitalScore);
        _showFromLeft(app.dom.playBtn);
        _showFromLeft(app.dom.background);
    }

    /*
     * Animate an element into view from the left.
     * @param {object} element A jquery-wrapped dom element.
     */
    function _showFromLeft(element) {
        var startPos = -(element.width() * 2);

        element.stop()
            // The margin applied here centers the element on the centering-div according to its left positioning.
            .css({ 'left': startPos, 'right': 'auto', 'margin': '0 0 0 ' + (-(element.width()/2)) + 'px' })
            .show()
            .animate({ 'left': '' }, { duration: duration, queue: false });
    }

    /*
     * Animate an element into view from the right.
     * @param {object} element A jquery-wrapped dom element.
     */
    function _showFromRight(element) {
        var startPos = -(element.width() * 2);

        element.stop()
            // The margin applied here centers the element on the centering-div according to its right positioning.
            .css({'right': startPos, 'left': 'auto', 'margin': '0 ' + (-(element.width()/2)) + 'px 0 0' })
            .show()
            .animate({ 'right': '' }, { duration: duration, queue: false });
    }

    // /*
    //  * Animate an element to the left out of view.
    //  * @param {object} element A jquery-wrapped dom element.
    //  */
    // function _hideToLeft(element) {
    //     var endPos = -(element.width() * 2);

    //     element
    //         .css({ 'right': 'auto' })
    //         .animate({
    //             'left': endPos,
    //             // A margin fix accounting for when the element was previously positioned from the right.
    //             'margin': '0 0 0 ' + (-(element.width()/2)) + 'px'
    //         },{
    //             duration: duration,
    //             queue: false,
    //             complete: function _onHideToLeftComplete() {
    //                 element.hide();
    //             }
    //         });
    // }

    /*
     * Animate an element to the right out of view.
     * @param {object} element A jquery-wrapped dom element.
     */
    function _hideToRight(element) {
        var endPos = -(element.width() * 2);

        element
            .css({ 'left': 'auto' })
            .animate({
                'right': endPos,
                // A margin fix accounting for when the element was previously positioned from the left.
                'margin': '0 ' + (-(element.width()/2)) + 'px 0 0'
            },{
                duration: duration,
                queue: false,
                complete: function _onHideToRightCompletion() {
                    element.hide();
                }
            });
    }

    /*
     * Register click handlers which trigger animations that introduce application states.
     */
    function _setClickHandlers() {
        app.dom.playBtnLink.click(function _playBtnClick() {
            app.start();
        });

        app.dom.topScoresLink.click(function _topScoresClick() {
            _showTopScores();
        });

        app.dom.topScoresBackLink.click(function _topScoresBackClick() {
            _hideTopScores();
        });

        app.dom.howToPlayLink.click(function _howToPlayClick() {
            _showHowToPlay();
        });

        app.dom.howToPlayBackLink.click(function _howToPlayBackClick() {
            _hideHowToPlay();
        });
    }

    /*
     * Reset the score to zero, and animate the score shaking to indicate it's being reset.
     */
    function _resetScore() {
        if (app.game.prevScore > 0) {
            app.dom.digitalScore.effect('shake', duration, function _resetScoreShakeComplete() {
                app.updateScore();
            });
        }
    }

    /*
     * Change the play button to read 'play again' after the game's been played once.
     */
    function _updatePlayBtn() {
        if (app.game.plays === 1) {
            app.dom.playBtn.html('<a href="#">P L A Y&nbsp;&nbsp;&nbsp;A G A I N</a>');
            app.dom.playBtnLink = $('#play-btn > a');

            app.dom.playBtnLink.click(function _updatePlayBtnClick() {
                app.start();
            });
        }
    }

    /*
     * Animate the defender in/out from above the screen.
     * @param {bool} show Animate defender in if true; animate defender out if false.
     */
    function _animateDefender(show) {
        if (show) {
            app.dom.defender
                .css({ 'left': (app.dom.win.width() / 2) - 20, 'top': -50 })
                .animate({ 'top': 475 }, { duration: 400, queue: false });
        }
        else {
            app.dom.defender
                .animate({ 'top': -50 }, { duration: 400, queue: false });
        }
    }

    return app;

})(asteriskAttack);
