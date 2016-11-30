var asteriskAttack = (function play(aa) {


  /*
   * Normalize the defender's position according to the x-axis position of the mouse.
   * @return {number} The normalized x position.
   */
  function normalizeDefenderPosition(mousePosX) {
    var min = 15 // A little padding from the screen edge looks better.
      , max = aa.dom.win.width() - aa.dom.defender.width() - min
      , pos = mousePosX / aa.dom.win.width(); // Normalize to [0, 1]

    pos = (pos * (max - min)) + min; // Scale to [min, max]
    return pos;
  }


  /*
   * Start the game.
   */
  function start() {
    aa.reset();

    // The following numbered tasks correspond symmetrically to those in the quit function.

    // 1. Set game intervals.
    aa.intervals.attack = setInterval(aa.attack, aa.game.asteriskGenerationSpeed);
    setTimeout(aa.intervals.collision = setInterval(aa.detectCollisions, 5), aa.game.asteriskGenerationSpeed);

    // 2.
    aa.animateStartGame();

    // 3. Hide the cursor.
    // $('html').css('cursor', 'none');

    // 4. Position the defender according to the cursor position.
    aa.dom.doc.mousemove(function(event) {
      aa.dom.defender.css({ left: normalizeDefenderPosition(event.pageX) });
    });

    // 5. Watch for game-relevant key-presses.
    aa.dom.doc.keyup(function (e) {
      if (e.keyCode === 32) { // key: space
        aa.shootHeatray();
      } else if (e.keyCode === 27) { // key: esc
        aa.quit();
      }
    });
    aa.dom.doc.keydown(function (e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        return false;
      }
    });
  }


  /*
   * End the game.
   */
  function quit() {
    aa.updateTopScoresData();
    aa.resetAsterisks();

    // The following numbered tasks correspond symmetrically to those in the start function.

    // 1. Clear game intervals.
    window.clearInterval(aa.intervals.attack);
    window.clearInterval(aa.intervals.collision);

    // 2.
    aa.animateEndGame();

    // 3. Unhide the cursor.
    // $('html').css('cursor', 'auto');

    // 4. Stop positioning the defender.
    aa.dom.doc.unbind('mousemove');

    // 5. Stop watching key-presses.
    aa.dom.doc.unbind('keyup');
    aa.dom.doc.unbind('keydown');
  }


  aa.start = start;
  aa.quit = quit;
  return aa;

})(asteriskAttack); 


$(document).ready(function() {

  (function validateScreenSize() {
    if (asteriskAttack.dom.win.width() < 1000) {
      asteriskAttack.dom.game.css({ 'display':'none' });
      asteriskAttack.dom.screenSizeError.css({ 'display':'inherit' });

      asteriskAttack.loops.screenSizeError = setInterval(function() {
        asteriskAttack.dom.errorMsg.effect('shake', {}, 200);
      }, 2000);

      asteriskAttack.dom.reload.click(function() {
        location.reload();
      });
    }
    else {
      asteriskAttack.animateLoadGame();
    }
  })();

});
