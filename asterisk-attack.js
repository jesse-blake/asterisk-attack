var game = (function asteriskAttack() {

  var game = {
    score: null,
    misses: null,
    width: $("#asterisk-attack").width(),
    colors: ['red', 'orangered', 'orange', 'gold', 'yellow'],
    attackLoop: null,
    collisionLoop: null,
    attackers: {}, // key: id, value: dom object
    attackerCount: null,
    attackerSpeed: null,
    generationSpeed: null,
    defenderWidth: $("#defender").width()
  };

  // Normalize defender's position to keep it within the game area boundaries.
  function normalizeDefenderPosition(mousePosX) {
    var pos = mousePosX - $("#asterisk-attack").offset().left; // Relative mouse position x.
    var min = 0;
    var max = game.width - game.defenderWidth;

    pos = (pos - min)/(max - min);
    if (pos > 1) pos = 1;
    return (pos * (max - min)) + min; // Scaled to [min,max]
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Range [min, max]
  }

  function buildAttacker() {
    return '<div '
      + 'id="' + (++game.attackerCount) + '" ' 
      + 'class="asterisk" '
      + 'style="'
      + 'color:' + game.colors[randomInRange(0, game.colors.length - 1)] + '; '
      + 'position:absolute; '
      + 'top:-10px; '
      + 'left:' + randomInRange(10, game.width - 10) + 'px;'
      + '">*</div>';
  }

  function attack() {
    var attacker = $(buildAttacker());
    var speed = randomInRange(game.attackerSpeed, game.attackerSpeed + 5000);

    game.attackers[game.attackerCount] = attacker;
    $("#asterisk-attack").prepend(attacker);
    $(attacker).animate({top:200}, speed, "linear");
  }

  function completeAttack(attackerId, thwarted) {
    game.attackers[id].remove();
    delete game.attackers[id];
    
    thwarted ? game.score++ : game.misses++;

    if (thwarted && game.score % 5 === 0) {
      increaseAttackSpeed();
    }

    updateHud();
  }

  function updateHud() {
    $("#score").text("SCORE " + game.score);
    $("#miss-countdown").text((3 - game.misses) + " MISSES LEFT")
  }

  function increaseAttackSpeed() {
    game.generationSpeed -= 50;
    window.clearInterval(game.attackLoop);
    game.attackLoop = setInterval(attack, game.generationSpeed);
  }

  function detectAttackOutcomes() {

    var getPosition = function(element) {
      var pos    = $(element).position();
      var width  = $(element).width();
      var height = $(element).height();

      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    var positionsCollide = function(p1, p2) {
      var x = p1[0] < p2[0] ? p1 : p2;
      var y = p1[0] < p2[0] ? p2 : p1;
      return x[1] > y[0] || x[0] === y[0];
    }

    for (id in game.attackers) {
      var d, a, c; // defender, attacker, civilians

      a = getPosition(game.attackers[id]);
      d = getPosition($("#defender"));
      c = getPosition($("#civilians")); 

      if (positionsCollide(a[0], d[0]) && positionsCollide(a[1], d[1])) {
        completeAttack(id, true); // Attack thrwarted.
      }
      else if (positionsCollide(a[0], c[0]) && positionsCollide(a[1], c[1])) {
        completeAttack(id, false); // Attack succeeded.
      }

      if (game.misses === 3) { quit(); break; }
    }
  }

  function reset() {
    game.score = 0;
    game.misses = 0;
    game.attackerCount = 0;
    game.attackerSpeed = 3000;
    game.generationSpeed = 1000;
    updateHud();
  }

  function start() {
    reset();

    $("#defender").show();

    $("#start").hide();
    $("#quit").show();

    game.attackLoop = setInterval(attack, game.generationSpeed);
    setTimeout(game.collisionLoop = setInterval(detectAttackOutcomes, 50), game.generationSpeed);

    $("#asterisk-attack").mousemove(function(event) {
      $("#defender").css({ left: normalizeDefenderPosition(event.pageX) });
    });
  }

  function quit() {
    window.clearInterval(game.attackLoop);
    window.clearInterval(game.collisionLoop);

    $("#asterisk-attack").unbind("mousemove");

    for (id in game.attackers) {
      game.attackers[id].remove(); 
    }
    game.attackers = {};

    $("#defender").hide();
    $("#start").show();
    $("#quit").hide();
  }

  return {
    start: start,
    quit: quit
  }

})();

$('document').ready(function() {

  // Animate main logo.
  $("#ls").animate({top:50}, 'medium');

  $("#start a").click(function() { game.start() });
  $("#quit  a").click(function() { game.quit()  });

});

