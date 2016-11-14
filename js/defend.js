var asteriskAttack = (function(aa) {

  aa.pewPewHeatVision = function() {
    var defender      = $('#defender')
      , defenderWidth = defender.width()
      , laserPos      = defender.position();

    var slug = $('<div id="slug' + (++aa.game.slugCount) + '" '
      + 'style="color:deeppink; position:absolute; '
      + 'top:' + (laserPos.top - 40) + 'px; '
      + 'left:' + ((laserPos.left * 2 + defenderWidth) / 2) + 'px;'
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
