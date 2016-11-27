var asteriskAttack = (function(aa) {

  function increaseAttackSpeed() {
    aa.game.generationSpeed -= 50;
    window.clearInterval(aa.loops.attack);
    aa.loops.attack = setInterval(attack, aa.game.generationSpeed);
  }

  function attack() {
    var asterisk = aa.dom.asterisks.shift()
      , speed    = aa.randomInRange(aa.game.asteriskSpeed, aa.game.asteriskSpeed + 5000);

    aa.dom.attacking[++aa.game.asteriskCount] = asterisk;

    asterisk
      .fadeIn({ queue: false, duration: 'slow' })
      .animate({ top: '585px' }, speed, 'linear');
  }

  function completeAttack(asteriskIdx, attackThwarted) {
    var a = aa.dom.attacking[asteriskIdx];

    if (attackThwarted) {
      aa.stats.score++;
    }

    if (attackThwarted && aa.stats.score % 5 === 0) {
      increaseAttackSpeed();
    }
    else if (!attackThwarted) {
      // Game over.
      aa.dom.background.effect("bounce", {}, 750);
    }

    a.stop()
      .css({ 'top':'50px', 'display':'none' });

    aa.dom.asterisks.push(a);
    delete aa.dom.attacking[asteriskIdx];

    aa.updateScore();
  }

  aa.attack = attack;
  aa.completeAttack = completeAttack;
  aa.increaseAttackSpeed = increaseAttackSpeed;

  return aa;

})(asteriskAttack);

