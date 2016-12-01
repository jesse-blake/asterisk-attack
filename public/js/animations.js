"use strict";

var asteriskAttack = (function _animationsJs(aa) {

  var duration = 300;


  /*
   * Call once to animate in the game's main elements.
   */
  aa.animateLoadGame = function() {
    aa.updateScore();
    _setClickHandlers();

    _showFromLeft(aa.dom.menu);
    _showFromRight(aa.dom.logo);
    _showFromLeft(aa.dom.score);
    _showFromRight(aa.dom.playBtn);
  };


  /*
   * Call whenever play is clicked to animate the start of a game.
   */
  aa.animateStartGame = function() {
    _resetScore();
    _updatePlayBtn();

    _animateDefender(true);
    _hideToRight(aa.dom.menu);
    _hideToRight(aa.dom.playBtn);

    _showFromLeft(aa.dom.howToQuitMsg);
  };


  /*
   * Call at game-over time to animate the game-over sequence.
   */
  aa.animateEndGame = function() {
    _updatePlayBtn();

    _animateDefender(false);
    _showFromLeft(aa.dom.gameOverMsg);
    _hideToRight(aa.dom.howToQuitMsg);

    setTimeout(function() {
      _hideToRight(aa.dom.gameOverMsg);

      _showFromLeft(aa.dom.menu);
      _showFromLeft(aa.dom.playBtn);
    }, 1500);
  };


  /*
   * Animate the top scores 'page' into view.
   */
  function _showTopScores() {
    aa.updateTopScores();

    _hideToRight(aa.dom.menu);
    _hideToRight(aa.dom.score);
    _hideToRight(aa.dom.playBtn);
    _hideToRight(aa.dom.background);

    _showFromLeft(aa.dom.topScoresHeader);
    _showFromLeft(aa.dom.topScores);
    _showFromLeft(aa.dom.topScoresDone);
  }


  /*
   * Animate the top scores 'page' out of view.
   */
  function _hideTopScores() {
    _hideToRight(aa.dom.topScoresHeader);
    _hideToRight(aa.dom.topScores);
    _hideToRight(aa.dom.topScoresDone);

    _showFromLeft(aa.dom.menu);
    _showFromLeft(aa.dom.score);
    _showFromLeft(aa.dom.playBtn);
    _showFromLeft(aa.dom.background);
  }


  /*
   * Animate the how-to-play 'page' into view.
   */
  function _showHowToPlay() {
    _hideToRight(aa.dom.menu);
    _hideToRight(aa.dom.score);
    _hideToRight(aa.dom.playBtn);
    _hideToRight(aa.dom.background);

    _showFromLeft(aa.dom.howToPlayDone);
    _showFromLeft(aa.dom.howToPlayHeader);
    _showFromLeft(aa.dom.howToPlay);
  }


  /*
   * Animate the how-to-play 'page' out of view.
   */
  function _hideHowToPlay() {
    _hideToRight(aa.dom.howToPlayDone);
    _hideToRight(aa.dom.howToPlayHeader);
    _hideToRight(aa.dom.howToPlay);

    _showFromLeft(aa.dom.menu);
    _showFromLeft(aa.dom.score);
    _showFromLeft(aa.dom.playBtn);
    _showFromLeft(aa.dom.background);
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

  /*
   * Animate an element to the left out of view.
   * @param {object} element A jquery-wrapped dom element.
   */
  function _hideToLeft(element) {
    var endPos = -(element.width() * 2);

    element
      .css({ 'right': 'auto' })
      .animate({
        'left': endPos,
        // A margin fix accounting for when the element was previously positioned from the right.
        'margin': '0 0 0 ' + (-(element.width()/2)) + 'px'
      },{
        duration: duration,
        queue: false,
        complete: function() {
          element.hide();
        }
      });
  }

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
        complete: function() {
          element.hide();
        }
      });
  }


  /*
   * Register click handlers which trigger animations that introduce application states.
   */
  function _setClickHandlers() {
    aa.dom.playBtnLink.click(function() {
      aa.start();
    });

    aa.dom.topScoresLink.click(function() {
      _showTopScores(); 
    });

    aa.dom.topScoresDoneBtn.click(function() {
      _hideTopScores();
    });

    aa.dom.howToPlayLink.click(function() {
      _showHowToPlay(); 
    });

    aa.dom.howToPlayDoneBtn.click(function() {
      _hideHowToPlay();
    });
  }


  /*
   * Reset the score to zero, and animate the score shaking to indicate it's being reset.
   */
  function _resetScore() {
    if (aa.game.prevScore > 0) {
      aa.dom.score.effect('shake', duration, function() {
        aa.updateScore();
      });
    }
  }


  /*
   * Change the play button to read 'play again' after the game's been played once.
   */
  function _updatePlayBtn() {
    if (aa.game.plays === 1) {
      aa.dom.playBtn.html('<a href="#">P L A Y&nbsp;&nbsp;&nbsp;A G A I N</a>');
      aa.dom.playBtnLink = $('#play-btn > a');

      aa.dom.playBtnLink.click(function() {
        aa.start();
      });
    }
  }


  /*
   * Animate the defender in/out from above the screen.
   * @param {bool} show Animate defender in if true; animate defender out if false.
   */
  function _animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.win.width() / 2) - 20, 'top': -50 })
        .animate({ 'top': 475 }, { duration: 400, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': -50 }, { duration: 400, queue: false });
    }
  }


  return aa;

})(asteriskAttack);

