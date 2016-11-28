var asteriskAttack = (function(aa) {

  aa.shootHeatray = function() {
    var heatray = aa.dom.heatrays.shift()
      , pos = aa.dom.defender.offset();

    aa.dom.defending.push(heatray);

    heatray
      // Line up heatray with the eyes of the defender.
      .css({ 'top': (pos.top - 45), 'left': (pos.left + (aa.dom.defender.width() / 2)) })
      .show()
      .animate({ top: '-150px' }, 500, 'linear', function() {
        aa.dom.heatrays.push(aa.dom.defending.shift());
      });
  }

  return aa;

})(asteriskAttack);

