var asteriskAttack = (function(aa) {

  function increaseAttackSpeed() {
    aa.game.generationSpeed -= 50;
    window.clearInterval(aa.loops.attack);
    aa.loops.attack = setInterval(attack, aa.game.generationSpeed);
  }

  function buildAsterisk() {
    var colors = ['yellow', 'gold', 'orange', 'orangered', 'red', 'deeppink', 'hotpink', 'fuchsia', 'lightskyblue', 'dodgerblue', 'blue']
      , smallestSize = 12
      , largestSize = 42;

    return '<div '
      + 'id="' + (++aa.game.asteriskCount) + '" ' 
      + 'style="position:absolute; top:-10px; '
      + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
      + 'font-size:' + aa.randomInRange(smallestSize, largestSize) + 'px; '
      // 20 pulls asterisks in from overhanging right of div:
      + 'left:' + aa.randomInRange(0, aa.dom.attackZone.width() - 20) + 'px;'
      + '">*</div>'
  }

  function attack() {
    var asterisk = $(buildAsterisk())
      , speed    = aa.randomInRange(aa.game.asteriskSpeed, aa.game.asteriskSpeed + 5000);

    aa.game.asterisks[aa.game.asteriskCount] = asterisk;
    aa.dom.attackZone.prepend(asterisk);

    asterisk.animate({ top: "700px" }, speed, "linear");
  }

  function completeAttack(asteriskId, thwarted) {
    var a
      , pos
      , clone;

    a = aa.game.asterisks[asteriskId];

    if (thwarted) {
      aa.stats.score++;

      clone = a.clone();
      clone.insertAfter(a).animate({ 
        'opacity': '0', 'top': (a.position().top - 50)
      }, 150, function() {
        clone.remove(); 
      })
    }

    if (thwarted && aa.stats.score % 5 === 0) {
      increaseAttackSpeed();
    }
    else if (!thwarted) {
      aa.dom.background.effect("bounce", {}, 750);
    }

    a.remove();
    delete aa.game.asterisks[asteriskId];

    aa.updateScore();
  }

  aa.attack = attack;
  aa.completeAttack = completeAttack;
  aa.increaseAttackSpeed = increaseAttackSpeed;

  return aa;

})(asteriskAttack);

