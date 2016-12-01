"use strict";

var asteriskAttack = (function _defendJs(aa) {


  /*
   * Fire a heatray from (approximately) the defender's eyes.
   */
  aa.shootHeatray = function() {
    var heatray = aa.dom.heatraysIdle.shift()
      , pos = aa.dom.defender.offset();

    // Add the heatray to the list of heatrays in motion.
    aa.dom.heatraysDefending.push(heatray);

    heatray
      // Line up heatray with the eyes of the defender.
      .css({ 'top': (pos.top - 45), 'left': (pos.left + (aa.dom.defender.width() / 2)) })
      .show()
      .animate({ top: '-150px' }, 500, 'linear', function() {
        // When the heatray's animation is complete, re-queue it for re-use.
        aa.dom.heatraysIdle.push(aa.dom.heatraysDefending.shift());
      });
  }


  return aa;

})(asteriskAttack);

