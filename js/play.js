var asteriskAttack = (function (aa) {

  function reset() {
    aa.game.score = 0;
    aa.game.slugCount = 0;
    aa.game.attackerCount = 0;
    aa.game.attackerSpeed = 3000;
    aa.game.generationSpeed = 1000;
    aa.updateScore();
  }

  aa.start = function() {
    function normalizeDefenderPosition(mousePosX) {
      var min = aa.game.padding
        , max = aa.game.area.width() - aa.game.defender.width() - aa.game.padding
        , pos = mousePosX / aa.game.windowWidth; // Normalize to [0, 1]

      pos = (pos * (max - min)) + min; // Scale to [min, max]
      return pos;
    }

    reset();

    // 1
    aa.game.civilianLoop = setInterval(aa.animateCivilians, 300);
    aa.game.attackLoop  = setInterval(aa.attack, aa.game.generationSpeed);
    setTimeout(aa.game.collisionLoop = setInterval(aa.detectCollisions, 5), aa.game.generationSpeed);

    // 2
    aa.animateStartBtn(false);
    aa.animateQuitInstruction(true);
    aa.animateDefender(true);

    // 3
    $('html').css('cursor', 'none');

    // 4
    $(document).mousemove(function(event) {
      aa.game.defender.css({ left: normalizeDefenderPosition(event.pageX) });
    });

    // 5
    $(document).keyup(function bindGameKeys(e) {
      if (e.key === ' ') {
        aa.pewPewHeatVision();
      } else if (e.key === 'q') {
        aa.quit();
      }
    });
  }

  aa.quit = function() {
    // 1
    window.clearInterval(aa.game.civilianLoop);
    window.clearInterval(aa.game.attackLoop);
    window.clearInterval(aa.game.collisionLoop);

    // 2
    aa.animateStartBtn(true);
    aa.animateQuitInstruction(false);
    aa.animateDefender(false);

    // 3
    $('html').css('cursor', 'auto');

    // 4
    $(document).unbind('mousemove');

    // 5
    $(document).unbind('keyup');

    for (id in aa.game.slugs)     { aa.game.slugs[id].remove();     }
    for (id in aa.game.attackers) { aa.game.attackers[id].remove(); }
    aa.game.slugs     = {};
    aa.game.attackers = {};
  }

  return aa;

})(asteriskAttack); 


$(document).ready(function() {
  asteriskAttack.load();

  $('#start a').click(function() {
    asteriskAttack.start();
  });
});
