$('document').ready(function() {

  var game = {
    speed: 1000,
    colors: ['yellow', 'gold', 'orange', 'orangered', 'red'],
    width: $("#asterisk-attack").width(),
    offset: $("#asterisk-attack").offset().left,
    loops: [],
    attackers: {},
    attackerCount: 0
  };

  var defender = {
    width: $("#defender").width()
  };

  function normalizePosition(mouseX) {
    var min = 0
      , max = game.width - defender.width
      , relativeMouseX = mouseX - game.offset;
    var normalized = (relativeMouseX - min)/(max - min); // Normalized to [0,1]
    if (normalized > 1) { normalized = 1 }
    return (normalized * (max - min)) + min; // Scaled to [min,max]
  }

  function randomInRange(min, max) {
    // Returns a number in [min, max]
    return Math.floor(Math.random() *(max - min + 1)) + min;
  }

  function getAttacker() {
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
    var a = $(getAttacker());
    game.attackers[game.attackerCount] = a;
    $("#asterisk-attack").prepend(a);
    $(a).animate({top:200}, 3000, "linear");
  }

  function detectCollisions() {
    function getCoordinates(element) {
      var pos = $(element).position();
      var width = $(element).width();
      var height = $(element).height();
      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    function coordinatesCollide(coords1, coords2) {
      var x = coords1[0] < coords2[0] ? coords1 : coords2;
      var y = coords1[0] < coords2[0] ? coords2 : coords1;
      return x[1] > y[0] || x[0] === y[0];
    }

    for (a in game.attackers) {
      var id, civiliansPos;
      var defenderPos = getCoordinates($("#defender"));
      var attackerPos = getCoordinates($("#" + $(game.attackers[a]).attr("id")));
      var widthCollision = coordinatesCollide(defenderPos[0], attackerPos[0]);
      var heightCollision = coordinatesCollide(defenderPos[1], attackerPos[1]);
      if (widthCollision && heightCollision) {
        $("#" + a).remove();
        delete game.attackers[a];
      } else {
        civiliansPos = getCoordinates($("#civilians")); 
        widthCollision = coordinatesCollide(civiliansPos[0], attackerPos[0]);
        heightCollision = coordinatesCollide(civiliansPos[1], attackerPos[1]);
        if (widthCollision && heightCollision) {
          $("#" + a).remove(); 
          delete game.attackers[a];
        }
      }
    }
  }

  function start() {
    $("#asterisk-attack").mousemove(function(event) {
      $("#defender").css({ left: normalizePosition(event.pageX) });
    });

    game.loops[0] = setInterval(attack, game.speed);
    setTimeout(
      game.loops[1] = setInterval(detectCollisions, 50), game.speed
    );

    $("#start").hide();
    $("#quit").show();
  }

  function quit() {
    window.clearInterval(game.loops[0]);
    window.clearInterval(game.loops[1]);
    $("#asterisk-attack").unbind("mousemove");

    $("#start").show();
    $("#quit").hide();
  }

  $("#ls").animate({top:50}, 'medium');

  $("#start a").click(function() {
    start();
  });

  $("#quit a").click(function() {
    quit();
  });
  
});

