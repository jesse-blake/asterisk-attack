"use strict";

var asteriskAttack = (function animations(aa) {

  var duration = 300;


  /*
   * Call once to animate in the game's main elements.
   */
  function animateLoadGame() {
    aa.updateScore();
    setClickHandlers();

    showFromLeft(aa.dom.menu);
    showFromRight(aa.dom.logo);
    showFromLeft(aa.dom.score);
    showFromRight(aa.dom.playBtn);
  };


  /*
   * Call whenever play is clicked to animate the start of a game.
   */
  function animateStartGame() {
    resetScore();
    updatePlayBtn();

    animateDefender(true);
    hideToRight(aa.dom.menu);
    hideToRight(aa.dom.playBtn);

    showFromLeft(aa.dom.howToQuitMsg);
  };


  /*
   * Call at game-over time to animate the game-over sequence.
   */
  function animateEndGame() {
    updatePlayBtn();

    animateDefender(false);
    showFromLeft(aa.dom.gameOverMsg);
    hideToRight(aa.dom.howToQuitMsg);

    setTimeout(function() {
      hideToRight(aa.dom.gameOverMsg);

      showFromLeft(aa.dom.menu);
      showFromLeft(aa.dom.playBtn);
    }, 1500);
  };


  /*
   * Animate the top scores 'page' into view.
   */
  function showTopScores() {
    aa.updateTopScores();

    hideToRight(aa.dom.menu);
    hideToRight(aa.dom.score);
    hideToRight(aa.dom.playBtn);
    hideToRight(aa.dom.background);

    showFromLeft(aa.dom.topScoresHeader);
    showFromLeft(aa.dom.topScores);
    showFromLeft(aa.dom.topScoresDone);
  }


  /*
   * Animate the top scores 'page' out of view.
   */
  function hideTopScores() {
    hideToRight(aa.dom.topScoresHeader);
    hideToRight(aa.dom.topScores);
    hideToRight(aa.dom.topScoresDone);

    showFromLeft(aa.dom.menu);
    showFromLeft(aa.dom.score);
    showFromLeft(aa.dom.playBtn);
    showFromLeft(aa.dom.background);
  }


  /*
   * Animate the how-to-play 'page' into view.
   */
  function showHowToPlay() {
    hideToRight(aa.dom.menu);
    hideToRight(aa.dom.score);
    hideToRight(aa.dom.playBtn);
    hideToRight(aa.dom.background);

    showFromLeft(aa.dom.howToPlayDone);
    showFromLeft(aa.dom.howToPlayHeader);
    showFromLeft(aa.dom.howToPlay);
  }


  /*
   * Animate the how-to-play 'page' out of view.
   */
  function hideHowToPlay() {
    hideToRight(aa.dom.howToPlayDone);
    hideToRight(aa.dom.howToPlayHeader);
    hideToRight(aa.dom.howToPlay);

    showFromLeft(aa.dom.menu);
    showFromLeft(aa.dom.score);
    showFromLeft(aa.dom.playBtn);
    showFromLeft(aa.dom.background);
  }


  /*
   * Animate an element into view from the left.
   * @param {object} element A jquery-wrapped dom element.
   */
  function showFromLeft(element) {
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
  function showFromRight(element) {
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
  function hideToLeft(element) {
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
  function hideToRight(element) {
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
  function setClickHandlers() {
    aa.dom.playBtnLink.click(function() {
      aa.start();
    });

    aa.dom.topScoresLink.click(function() {
      showTopScores(); 
    });

    aa.dom.topScoresDoneBtn.click(function() {
      hideTopScores();
    });

    aa.dom.howToPlayLink.click(function() {
      showHowToPlay(); 
    });

    aa.dom.howToPlayDoneBtn.click(function() {
      hideHowToPlay();
    });
  }


  /*
   * Reset the score to zero, and animate the score shaking to indicate it's being reset.
   */
  function resetScore() {
    if (aa.game.prevScore > 0) {
      aa.dom.score.effect('shake', duration, function() {
        aa.updateScore();
      });
    }
  }


  /*
   * Change the play button to read 'play again' after the game's been played once.
   */
  function updatePlayBtn() {
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
  function animateDefender(show) {
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


  aa.animateLoadGame = animateLoadGame;
  aa.animateStartGame = animateStartGame;
  aa.animateEndGame = animateEndGame;
  return aa;

})(asteriskAttack);

