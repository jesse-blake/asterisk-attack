"use strict";

var asteriskAttack = (function _attackJs(aa) {


  /*
   * Send the next attacking asterisk's on its animation from top to bottom.
   */
  aa.attack = function() {
    var asterisk = aa.dom.asterisksIdle.shift()
      , slowestAttack = 3000
      , fastestAttack = 8000
      , speed = aa.randomInRange(slowestAttack, fastestAttack)
      , rotationClasses = ['rf1','rf2','rf3','rb1','rb2','rb3'];

    // Add the asterisk to the list of attacking asterisks.
    aa.dom.asterisksAttacking[++aa.dom.attackerKeyCount] = asterisk;

    asterisk
      .addClass(rotationClasses[aa.randomInRange(0, rotationClasses.length-1)])
      .animate({ top: '585px' }, speed, 'linear');
  }


  /*
   * Sundry tasks and updates to be performed on completion of an asterisk's attack.
   */
  aa.completeAttack = function(asteriskIdx, attackThwarted) {
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
        .fadeOut(500);
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
   * Reset the asterisks after game-over, stopping those still in-motion.
   */
  aa.resetAsterisks = function() {
    var aId
      , a
      , topPos;

    for (aId in aa.dom.asterisksAttacking) {
      a = aa.dom.asterisksAttacking[aId];

      topPos = a.css('width');

      a.removeClass('rf1 rf2 rf3 rb1 rb2 rb3')
        .stop()
        .css({ 'top': '-' + topPos });

      aa.dom.asterisksIdle.push(aa.dom.asterisksAttacking[aId]);
      delete aa.dom.asterisksAttacking[aId];
    }
    aa.dom.attackerKeyCount = 0;
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

