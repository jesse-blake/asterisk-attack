"use strict";

var asteriskAttack = (function _attackJs(app) {


  /*
   * Send the next attacking asterisk on its animation from top to bottom.
   */
  app.attack = function _attack() {
    var asterisk = app.dom.asterisksIdle.shift()
      , slowestAttack = 3000
      , fastestAttack = 8000
      , speed = app.randomInRange(slowestAttack, fastestAttack)
      , rotationClasses = ['rf1','rf2','rf3','rb1','rb2','rb3'];

    // Add the asterisk to the list of attacking asterisks.
    app.dom.asterisksAttacking[++app.dom.attackerCount] = asterisk;

    asterisk
      .addClass(rotationClasses[app.randomInRange(0, rotationClasses.length-1)])
      .animate({ top: '585px' }, speed, 'linear');
  }


  /*
   * Sundry tasks and updates to be performed on completion of an asterisk's attack.
   */
  app.completeAttack = function _completeAttack(asteriskIdx, attackThwarted) {
    var a = app.dom.asterisksAttacking[asteriskIdx]
      , topPos = a.css('width');

    if (attackThwarted) { // The defender defeated the asterisk.
      app.game.score++;
      app.updateScore();
    }

    if (attackThwarted && app.game.score % 5 === 0) {
      _increaseAttackSpeed();
    }
    else if (!attackThwarted) { // The game's over.
      app.dom.shockwaveFlash
        .css({ 'background-image': 'radial-gradient(circle at ' + a.offset().left + 'px 500px, white 0%, #101010 90%)' })
        .show()
        .fadeOut(100);
      app.dom.background
        .effect("bounce", {}, 750);
    }

    // Stop the asterisk, re-queue it for re-use, and remove it from the list of attackers.
    a.stop()
      .removeClass('rf1 rf2 rf3 rb1 rb2 rb3')
      .css({ 'top': '-' + topPos });
    app.dom.asterisksIdle.push(a);
    delete app.dom.asterisksAttacking[asteriskIdx];
  }


  /*
   * Reset/renew/rerandomize the asterisk data structures.
   */
  app.resetAsterisks = function _resetAsterisks() {
    var aId
      , a;

    for (aId in app.dom.asterisksAttacking) {
      app.dom.asterisksAttacking[aId].remove();
      delete app.dom.asterisksAttacking[aId];
    }
    app.dom.attackerCount = 0;

    // Reloading asterisks is done in animateEndGame() in animations.js to hide the processing it requires.
  }


  /*
   * Increase the number of asterisks attacking per time interval.
   */
  function _increaseAttackSpeed() {
    app.game.asteriskGenerationSpeed -= 50;
    window.clearInterval(app.intervals.attack);
    app.intervals.attack = setInterval(app.attack, app.game.asteriskGenerationSpeed);
  }


  return app;

})(asteriskAttack);

