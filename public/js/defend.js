var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var pos = aa.dom.defender.position();

    var slug = $('<div id="slug' + (++aa.game.slugCount) + '" '
      + 'style="color:deeppink; position:absolute; '
      + 'top:' + (pos.top - 40) + 'px; '
      + 'left:' + ((pos.left * 2 + aa.dom.defender.width()) / 2) + 'px;'
      + '">|<br>|<br>|<br></div>');

    $('#asterisk-attack').prepend(slug);
    aa.game.slugs[aa.game.slugCount] = slug;

    slug.animate({ top: '-50px' }, 500, 'linear', function() {
      delete aa.game.slugs[slug.attr('id').split('').pop()];
      slug.remove();
    });
  }

  return aa;

})(asteriskAttack);
