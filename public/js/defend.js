var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var pos = aa.dom.defender.offset();

    var heatbeam = $('<div id="heatbeam' + (++aa.game.heatbeamCount) + '" '
      + 'style="color:deeppink; position:absolute; z-index: 1; '
      + 'top:' + (pos.top - 45) + 'px; '
      // Line up heatbeam with the eyes of the defender.
      + 'left:' + (pos.left + (aa.dom.defender.width() / 2)) + 'px;'
      + '">|<br>|<br>|<br></div>');

    aa.dom.zones.prepend(heatbeam);
    aa.game.heatbeams[aa.game.heatbeamCount] = heatbeam;

    heatbeam.animate({ top: '-150px' }, 500, 'linear', function() {
      delete aa.game.heatbeams[heatbeam.attr('id').split('').pop()];
      heatbeam.remove();
    });
  }

  return aa;

})(asteriskAttack);

