var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var pos = aa.dom.defender.offset();

    var heatbeam = $('<div id="heatbeam' + (++aa.game.heatbeamCount) + '" '
      + 'style="color:deeppink; position:absolute; '
      + 'top:' + (pos.top - 110) + 'px; '
      // Line up heatbeam with the eyes of the defender.
      + 'left:' + (pos.left + (aa.dom.defender.width() / 2)) + 'px;'
      + '">|<br>|<br>|<br></div>');

    aa.dom.zones.prepend(heatbeam);
    aa.game.heatbeams[aa.game.heatbeamCount] = heatbeam;

    heatbeam.animate({ top: '-50px' }, 500, 'linear', function() {
      delete aa.game.heatbeams[heatbeam.attr('id').split('').pop()];
      heatbeam.remove();
    });
  }

  return aa;

})(asteriskAttack);

