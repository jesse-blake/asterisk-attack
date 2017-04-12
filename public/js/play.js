"use strict";

var asteriskAttack = (function _playJs(app) {


  /*
   * Normalize the defender's position according to the x-axis position of the mouse.
   * @return {number} The normalized x position.
   */
  function _normalizeDefenderPosition(mousePosX) {
    var min = 15 // A little padding from the screen edge looks better.
      , max = app.dom.win.width() - app.dom.defender.width() - min
      , pos = mousePosX / app.dom.win.width(); // Normalize to [0, 1]

    pos = (pos * (max - min)) + min; // Scale to [min, max]
    return pos;
  }


  /*
   * Start the game.
   */
  app.start = function start() {
    app.reset();

    // The following numbered tasks correspond symmetrically to those in the quit function.

    // 1. Set game intervals.
    app.intervals.attack = setInterval(app.attack, app.game.asteriskGenerationSpeed);
    setTimeout(app.intervals.collision = setInterval(app.detectCollisions, 5), app.game.asteriskGenerationSpeed);

    // 2. Hide the cursor.
    // $('html').css('cursor', 'none');

    // 3. Position the defender according to the cursor position.
    app.dom.doc.mousemove(function _mousemoveDefender(event) {
      app.dom.defender.css({ left: _normalizeDefenderPosition(event.pageX) });
    });

    // 4. Watch for game-relevant key-presses.
    app.dom.doc.keyup(function (e) {
      if (e.keyCode === 32) { // key: space
        app.shootHeatray();
      } else if (e.keyCode === 27) { // key: esc
        app.quit();
      }
    });
    app.dom.doc.keydown(function (e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        return false;
      }
    });

    // 5.
    app.animateStartGame();
  }


  /*
   * End the game.
   */
  app.quit = function quit() {
    app.updateTopScoresData();
    app.resetAsterisks();

    // The following numbered tasks correspond symmetrically to those in the start function.

    // 1. Clear game intervals.
    window.clearInterval(app.intervals.attack);
    window.clearInterval(app.intervals.collision);

    // 2. Unhide the cursor.
    // $('html').css('cursor', 'auto');

    // 3. Stop positioning the defender.
    app.dom.doc.unbind('mousemove');

    // 4. Stop watching key-presses.
    app.dom.doc.unbind('keyup');
    app.dom.doc.unbind('keydown');

    // 5.
    app.animateEndGame();
  }


  return app;

})(asteriskAttack); 


$(document).ready(function() {

  /*
   * Hide game componenets, and show an error msg and reload link instead.
   */
  function _showScreenSizeError() {
    // TODO Abort game load instead of hiding game components if screen size error.
    asteriskAttack.dom.game.css({ 'display':'none' });

    asteriskAttack.dom.screenSizeError
      .html('<div id="error-msg">YOU NEED A BIGGER SCREEN!</div>')
      .css({ 'display':'inherit' });

    asteriskAttack.intervals.screenSizeError = setInterval(function() {
      $('#error-msg').effect('shake', {}, 200);
    }, 2000);
  }

  (function validateScreenSize() {
    if (asteriskAttack.dom.win.width() < 1000) {
      _showScreenSizeError();
    }
    else {
      asteriskAttack.animateLoadGame();
    }
  })();

  $(window).resize(function() {
    location.reload(); 
  });
});
