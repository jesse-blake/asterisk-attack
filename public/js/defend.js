"use strict";

var asteriskAttack = (function _defendJs(app) {


  /*
   * Fire a heatray from (approximately) the defender's eyes.
   */
  app.shootHeatray = function shootHeatray() {
    var heatray = app.dom.heatraysIdle.shift()
      , pos = app.dom.defender.offset();

    // Add the heatray to the list of heatrays in motion.
    app.dom.heatraysDefending.push(heatray);

    heatray
      // Line up heatray with the eyes of the defender.
      .css({ 'top': (pos.top - 45), 'left': (pos.left + (app.dom.defender.width() / 2)) })
      .show()
      .animate({ top: '-150px' }, 500, 'linear', function shootHeatrayComplete() {
        // When the heatray's animation is complete, re-queue it for re-use.
        app.dom.heatraysIdle.push(app.dom.heatraysDefending.shift());
      });
  }


  return app;

})(asteriskAttack);

