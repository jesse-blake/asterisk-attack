var game = (function asteriskAttack() {

  var game = {
    score: null,
    misses: null,
    colors: ['red', 'orangered', 'orange', 'gold', 'yellow'],
    attackers: {}, // key: id, value: dom object
    attackerCount: null,
    attackerSpeed: null,
    generationSpeed: null,
    attackLoop: null,
    collisionLoop: null
  };

  // Normalize defender's position to keep it within the game area boundaries.
  function normalizeDefenderPosition(mousePosX) {
    var padding = min = 15; // Padding used on elements in div#asterisk-attack
    var max = $("#asterisk-attack").width() - $("#defender").width() - padding;
    var pos = mousePosX - $("#asterisk-attack").offset().left + padding; // Relative mouse x.

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
      + 'font-size:' + randomInRange(12, 36) + 'px; '
      + 'left:' + randomInRange(10, $("#asterisk-attack").width() - 10) + 'px;'
      + '">*</div>';
  }

  function attack() {
    var attacker = $(buildAttacker());
    var speed = randomInRange(game.attackerSpeed, game.attackerSpeed + 5000);

    game.attackers[game.attackerCount] = attacker;
    $("#asterisk-attack").prepend(attacker);

    $(attacker).animate({ top: "500px" }, speed, "linear");
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
    var hudColors = ['maroon', 'red', 'orange', 'yellow'];

    $("#score").text(game.score);
    $("#countdown").text(3 - game.misses); // Magic number.
    $("#countdown").css("color", hudColors[3 - game.misses]);
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

      if (game.misses === 3) { quit(); break; } // Magic number.
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
    setTimeout(game.collisionLoop = setInterval(detectAttackOutcomes, 5), game.generationSpeed);

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
  $("#logo").animate({top:43}, 'medium');

  $("#start a").click(function() { game.start() });
  $("#quit  a").click(function() { game.quit()  });

});

