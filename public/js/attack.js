var asteriskAttack = (function(aa) {

  function increaseAttackSpeed() {
    aa.game.generationSpeed -= 50;
    window.clearInterval(aa.loops.attack);
    aa.loops.attack = setInterval(attack, aa.game.generationSpeed);
  }

  function buildAsterisk() {
    var colors = ['yellow', 'gold', 'orange', 'orangered', 'red', 'deeppink', 'hotpink', 'fuchsia', 'lightskyblue', 'dodgerblue', 'blue']
      , smallSize = 12
      , largeSize = 42;

    return '<div '
      + 'id="' + (++aa.game.asteriskCount) + '" ' 
      + 'class="asterisk" '
      + 'style="'
      + 'color:' + colors[aa.randomInRange(0, colors.length - 1)] + '; '
      + 'font-size:' + aa.randomInRange(smallSize, largeSize) + 'px; '
      // 3 and 4 below moves asterisks in from edges of game area evenly.
      + 'left:' + aa.randomInRange(aa.sizes.padding * 3, aa.dom.game.width() - (aa.sizes.padding * 4)) + 'px;'
      + '">*</div>'
  }

  function attack() {
    var asterisk = $(buildAsterisk())
      , speed    = aa.randomInRange(aa.game.asteriskSpeed, aa.game.asteriskSpeed + 5000);

    aa.game.asterisks[aa.game.asteriskCount] = asterisk;
    $("#asterisk-attack").prepend(asterisk);

    $(asterisk).animate({ top: "500px" }, speed, "linear");
  }

  function completeAttack(asteriskId, thwarted) {
    var a     = aa.game.asterisks[asteriskId]
      , pos
      , clone;

    if (thwarted) {
      aa.stats.score++;

      clone = a.clone();
      clone.insertAfter(a).animate({ 
        'opacity': '0', 'top': (a.position().top - 50)
      }, 150, function() {
        clone.remove(); 
      })
    }

    a.remove();
    delete aa.game.asterisks[asteriskId];
    
    if (thwarted && aa.stats.score % 5 === 0) {
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

