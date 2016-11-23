var asteriskAttack = (function (aa) {

  aa.start = function() {
    function normalizeDefenderPosition(mousePosX) {
      var min = aa.sizes.padding
        , max = aa.dom.window.width() - aa.dom.defender.width() - aa.sizes.padding
        , pos = mousePosX / aa.dom.window.width(); // Normalize to [0, 1]

      pos = (pos * (max - min)) + min; // Scale to [min, max]
      return pos;
    }

    aa.reset();
    ++aa.stats.plays;

    // 1
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
    aa.dom.doc.keyup(function (e) {
      console.log(e);
      if (e.keyCode === 32) { // key: space
        aa.pewPewHeatVision();
      } else if (e.keyCode === 27) { // key: esc
        aa.quit();
      }
    });
  }

  aa.quit = function() {
    // 1
    window.clearInterval(aa.loops.attack);
    window.clearInterval(aa.loops.collision);

    aa.updateScores();

    // 2
    aa.animateEndGame();

    // 3
    $('html').css('cursor', 'auto');

    // 4
    aa.dom.doc.unbind('mousemove');

    // 5
    aa.dom.doc.unbind('keyup');

    for (id in aa.game.heatbeams)     { aa.game.heatbeams[id].remove();     }
    for (id in aa.game.asterisks) { aa.game.asterisks[id].remove(); }
    aa.game.heatbeams = {};
    aa.game.asterisks = {};
  }

  return aa;

})(asteriskAttack); 


$(document).ready(function() {

  (function validateScreenSize() {
    if (asteriskAttack.dom.window.width() < 1000) {
      asteriskAttack.dom.game.css({ 'display':'none' });
      asteriskAttack.dom.screenSizeError.css({ 'display':'inherit' });

      asteriskAttack.loops.screenSizeError = setInterval(function() {
        asteriskAttack.dom.errorMsg.effect('shake', {}, 200);
      }, 2000);

      asteriskAttack.dom.reload.click(function() {
        location.reload();
      });
    }
    else {
      asteriskAttack.animateLoadGame();
    }
  })();

});
