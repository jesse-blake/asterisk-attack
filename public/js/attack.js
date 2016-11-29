var asteriskAttack = (function attack(aa) {


  /*
   * Increase the number of asterisks attacking per time interval.
   */
  function increaseAttackSpeed() {
    aa.game.asteriskGenerationSpeed -= 50;
    window.clearInterval(aa.intervals.attack);
    aa.intervals.attack = setInterval(attack, aa.game.asteriskGenerationSpeed);
  }


  /*
   * Send the next attacking asterisk's on its animation from top to bottom.
   */
  function attack() {
    var asterisk = aa.dom.asterisksIdle.shift()
      , slowestAttack = 3000
      , fastestAttack = 8000
      , speed = aa.randomInRange(slowestAttack, fastestAttack);

    // Add the asterisk to the list of attacking asterisks.
    aa.dom.asterisksAttacking[++aa.dom.attackerKeyCount] = asterisk;

    asterisk
      .fadeIn({ queue: false, duration: 'slow' })
      .animate({ top: '585px' }, speed, 'linear');
  }


  /*
   * Sundry tasks and updates to be performed on completion of an asterisk's attack.
   */
  function completeAttack(asteriskIdx, attackThwarted) {
    var a = aa.dom.asterisksAttacking[asteriskIdx];

    if (attackThwarted) { // The defender defeated the asterisk.
      aa.game.score++;
      aa.updateScore();
    }

    if (attackThwarted && aa.game.score % 5 === 0) {
      increaseAttackSpeed();
    }
    else if (!attackThwarted) { // The game's over.
      aa.dom.background.effect("bounce", {}, 750);
    }

    // Stop the asterisk, re-queue it for re-use, and remove it from the list of attackers.
    a.stop()
      .css({ 'top':'50px', 'display':'none' });
    aa.dom.asterisksIdle.push(a);
    delete aa.dom.asterisksAttacking[asteriskIdx];
  }


  /*
   * Reset the asterisks after game-over, stopping those still in-motion.
   */
  function resetAsterisks() {
    for (aId in aa.dom.asterisksAttacking) {
      aa.dom.asterisksAttacking[aId]
        .stop()
        .css({ 'top':'-50px', 'display':'none' });

      aa.dom.asterisksIdle.push(aa.dom.asterisksAttacking[aId]);
      delete aa.dom.asterisksAttacking[aId];
    }
    aa.dom.attackerKeyCount = 0;
  }


  aa.increaseAttackSpeed = increaseAttackSpeed;
  aa.attack = attack;
  aa.completeAttack = completeAttack;
  aa.resetAsterisks = resetAsterisks;
  return aa;

})(asteriskAttack);

