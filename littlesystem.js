$('document').ready(function() {
  var game = {
    speed: 1000,
    width: $("#asterisk-attack").width(),
    offset: $("#asterisk-attack").offset().left,
    asteriskCount: 0
  };

  var defender = {
    width: $("#defender").width()
  };

  var colors = ['yellow', 'gold', 'orange', 'orangered', 'red'];

  var asterisk;

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

  function getAsterisk() {
    return '<div '
      + 'id="' + (++game.asteriskCount) + '" ' 
      + 'style="'
      + 'color:' + colors[randomInRange(0, colors.length - 1)] + '; '
      + 'position:absolute; '
      + 'left:' + randomInRange(10, game.width - 10) + 'px;'
      + '">*</div>';
  }

  function attack() {
    asterisk = $(getAsterisk());
    $("#asterisk-attack").prepend(asterisk);
    $(asterisk).animate({top:200}, 3000);
  }

  $("#ls").animate({top:50}, 'medium');
  
  $("#asterisk-attack").mouseenter(function() {
    $("#asterisk-attack").mousemove(function(event) {
      $("#defender").css({ left: normalizePosition(event.pageX) });
    });
  });
  
  setInterval(attack, game.speed);
});

