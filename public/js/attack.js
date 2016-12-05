"use strict";

var asteriskAttack = (function _attackJs(aa) {


  /*
   * Send the next attacking asterisk's on its animation from top to bottom.
   */
  aa.attack = function _attack() {
    var asterisk = aa.dom.asterisksIdle.shift()
      , slowestAttack = 3000
      , fastestAttack = 8000
      , speed = aa.randomInRange(slowestAttack, fastestAttack)
      , rotationClasses = ['rf1','rf2','rf3','rb1','rb2','rb3'];

    // Add the asterisk to the list of attacking asterisks.
    aa.dom.asterisksAttacking[++aa.dom.attackerCount] = asterisk;

    asterisk
      .addClass(rotationClasses[aa.randomInRange(0, rotationClasses.length-1)])
      .animate({ top: '585px' }, speed, 'linear');
  }


  /*
   * Sundry tasks and updates to be performed on completion of an asterisk's attack.
   */
  aa.completeAttack = function _completeAttack(asteriskIdx, attackThwarted) {
    var a = aa.dom.asterisksAttacking[asteriskIdx]
      , topPos = a.css('width');

    if (attackThwarted) { // The defender defeated the asterisk.
      aa.game.score++;
      aa.updateScore();
    }

    if (attackThwarted && aa.game.score % 5 === 0) {
      _increaseAttackSpeed();
    }
    else if (!attackThwarted) { // The game's over.
      aa.dom.shockwaveFlash
        .css({ 'background-image': 'radial-gradient(circle at ' + a.offset().left + 'px 500px, white 0%, #101010 90%)' })
        .show()
        .fadeOut(100);
      aa.dom.background
        .effect("bounce", {}, 750);
    }

    // Stop the asterisk, re-queue it for re-use, and remove it from the list of attackers.
    a.stop()
      .removeClass('rf1 rf2 rf3 rb1 rb2 rb3')
      .css({ 'top': '-' + topPos });
    aa.dom.asterisksIdle.push(a);
    delete aa.dom.asterisksAttacking[asteriskIdx];
  }


  /*
   * Reset/renew/rerandomize the asterisk datastructures.
   */
  aa.resetAsterisks = function _resetAsterisks() {
    var aId
      , a;

    for (aId in aa.dom.asterisksAttacking) {
      aa.dom.asterisksAttacking[aId].remove();
      delete aa.dom.asterisksAttacking[aId];
    }
    aa.dom.attackerCount = 0;

    // Reloading asterisks is done in animateEndGame() in animations.js to hide the processing it requires.
  }


  /*
   * Increase the number of asterisks attacking per time interval.
   */
  function _increaseAttackSpeed() {
    aa.game.asteriskGenerationSpeed -= 50;
    window.clearInterval(aa.intervals.attack);
    aa.intervals.attack = setInterval(aa.attack, aa.game.asteriskGenerationSpeed);
  }


  return aa;

})(asteriskAttack);

