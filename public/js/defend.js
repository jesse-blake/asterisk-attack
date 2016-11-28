var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var pos = aa.dom.defender.offset();

    var heatray = $('<div id="heatray' + (++aa.game.heatrayCount) + '" '
      + 'style="color:deeppink; position:absolute; z-index: 1; '
      + 'top:' + (pos.top - 45) + 'px; '
      // Line up heatray with the eyes of the defender.
      + 'left:' + (pos.left + (aa.dom.defender.width() / 2)) + 'px;'
      + '">|<br>|<br>|<br></div>');

    aa.dom.zones.prepend(heatray);
    aa.game.heatrays[aa.game.heatrayCount] = heatray;

    heatray.animate({ top: '-150px' }, 500, 'linear', function() {
      delete aa.game.heatrays[heatray.attr('id').split('').pop()];
      heatray.remove();
    });
  }

  return aa;

})(asteriskAttack);

