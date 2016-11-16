var asteriskAttack = (function (aa) {

  function reset() {
    aa.stats.score = 0;
    aa.game.slugCount = 0;
    aa.game.asteriskCount = 0;
    aa.game.asteriskSpeed = 3000;
    aa.game.generationSpeed = 1000;
    aa.updateScore();
  }

  aa.start = function() {
    function normalizeDefenderPosition(mousePosX) {
      var min = aa.sizes.padding
        , max = aa.dom.game.width() - aa.dom.defender.width() - aa.sizes.padding
        , pos = mousePosX / aa.dom.window.width(); // Normalize to [0, 1]

      pos = (pos * (max - min)) + min; // Scale to [min, max]
      return pos;
    }

    reset();

    // 1
    // aa.loops.civilian = setInterval(aa.animateCivilians, 300);
    aa.loops.attack = setInterval(aa.attack, aa.game.generationSpeed);
    setTimeout(aa.loops.collision = setInterval(aa.detectCollisions, 5), aa.game.generationSpeed);

    // 2
    aa.animateStartGame();

    // 3
    $('html').css('cursor', 'none');

    // 4
    aa.dom.doc.mousemove(function(event) {
      aa.dom.defender.css({ left: normalizeDefenderPosition(event.pageX) });
    });

    // 5
    aa.dom.doc.keydown(function (e) {
      if (e.keyCode === 32) { // key: space
        aa.pewPewHeatVision();
      } else if (e.keyCode === 81) { // key: q
        aa.quit();
      }
    });
  }

  aa.quit = function() {
    // 1
    // window.clearInterval(aa.loops.civilian);
    window.clearInterval(aa.loops.attack);
    window.clearInterval(aa.loops.collision);

    // 2
    aa.animateEndGame();

    // 3
    $('html').css('cursor', 'auto');

    // 4
    aa.dom.doc.unbind('mousemove');

    // 5
    aa.dom.doc.unbind('keydown');

    for (id in aa.game.slugs)     { aa.game.slugs[id].remove();     }
    for (id in aa.game.asterisks) { aa.game.asterisks[id].remove(); }
    aa.game.slugs     = {};
    aa.game.asterisks = {};
  }

  return aa;

})(asteriskAttack); 


$(document).ready(function() {
  asteriskAttack.load();

  $('#start a').click(function() {
    asteriskAttack.start();
  });
});
