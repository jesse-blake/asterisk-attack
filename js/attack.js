var asteriskAttack = (function(aa) {

  function increaseAttackSpeed() {
    aa.game.generationSpeed -= 50;
    window.clearInterval(aa.game.attackLoop);
    aa.game.attackLoop = setInterval(attack, aa.game.generationSpeed);
  }

  function buildAttacker() {
    var smallSize = 12
      , largeSize = 42;

    return '<div '
      + 'id="' + (++aa.game.attackerCount) + '" ' 
      + 'class="asterisk" '
      + 'style="'
      + 'color:' + aa.game.colors[aa.randomInRange(0, aa.game.colors.length - 1)] + '; '
      + 'font-size:' + aa.randomInRange(smallSize, largeSize) + 'px; '
      // 3 and 4 below moves attackers in from edges of game area evenly.
      + 'left:' + aa.randomInRange(aa.game.padding * 3, $("#asterisk-attack").width() - (aa.game.padding * 4)) + 'px;'
      + '">*</div>'
  }

  function attack() {
    var attacker = $(buildAttacker())
      , speed    = aa.randomInRange(aa.game.attackerSpeed, aa.game.attackerSpeed + 5000);

    aa.game.attackers[aa.game.attackerCount] = attacker;
    $("#asterisk-attack").prepend(attacker);

    $(attacker).animate({ top: "500px" }, speed, "linear");
  }

  function completeAttack(attackerId, thwarted) {
    var a     = aa.game.attackers[attackerId]
      , pos
      , clone;

    if (thwarted) {
      aa.game.score++;

      clone = a.clone();
      clone.insertAfter(a).animate({ 
        'opacity': '0', 'top': (a.position().top - 50)
      }, 150, function() {
        clone.remove(); 
      })
    }

    a.remove();
    delete aa.game.attackers[attackerId];
    
    if (thwarted && aa.game.score % 5 === 0) {
      increaseAttackSpeed();
    }
    // else if (!thwarted) {
    //   $("#asterisk-attack").stop(true).effect("bounce", {}, 500);
    // }

    aa.updateScore();
  }

  aa.attack = attack;
  aa.completeAttack = completeAttack;
  aa.increaseAttackSpeed = increaseAttackSpeed;

  return aa;

})(asteriskAttack);

