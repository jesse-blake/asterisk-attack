var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var pos = aa.dom.defender.offset();

    var slug = $('<div id="slug' + (++aa.game.slugCount) + '" '
      + 'style="color:deeppink; position:absolute; '
      + 'top:' + (pos.top - 55) + 'px; '
      // Line up slug with the eyes of the defender.
      + 'left:' + (pos.left + (aa.dom.defender.width() / 2 - 7)) + 'px;'
      + '">|<br>|<br>|<br></div>');

    aa.dom.zones.prepend(slug);
    aa.game.slugs[aa.game.slugCount] = slug;

    slug.animate({ top: '-50px' }, 500, 'linear', function() {
      delete aa.game.slugs[slug.attr('id').split('').pop()];
      slug.remove();
    });
  }

  return aa;

})(asteriskAttack);

