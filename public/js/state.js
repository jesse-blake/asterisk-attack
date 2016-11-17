var asteriskAttack = (function(aa) {

  aa.reset = function() {
    aa.stats.score = 0;
    aa.game.slugCount = 0;
    aa.game.asteriskCount = 0;
    aa.game.asteriskSpeed = 3000;
    aa.game.generationSpeed = 1000;
    aa.updateScore();
  };
  
  aa.dom = {
    window: $(window),
    doc: $(document),
    effects: $('#effects'),
      logo: $('#logo'),
      score: $('#score'),
      background: $('#background'),
      startBtn: $('#start-btn'),
      instructions: $('#instructions'),
      quitInstructions: $('#quit-instructions'),
      blinker1: $('#blinker1'),
      blinker2: $('#blinker2'),
      blinker3: $('#blinker3'),
      blinker4: $('#blinker4'),
      blinker5: $('#blinker5'),
      blinker6: $('#blinker6'),
    zones: $('#zones'),
      attackZone: $('#attack-zone'),
      gameOverZone: $('#game-over-zone'),
    defender: $('#defender')
  };

  aa.stats = {
    score: null
  };

  aa.loops = {
    attack:    null,
    collision: null,
    background: null,
    blinker1: null,
    blinker2: null,
    blinker3: null,
    blinker4: null,
    blinker5: null,
    blinker6: null
    // civilian:  null
  };

  aa.sizes = {
    padding: 15
  };

  aa.game = {
    slugs: {}, // Key: id, value: dom object.
    slugCount: null,
    asterisks: {}, // Key: id, value: dom object.
    asteriskCount: null,
    asteriskSpeed: null,
    generationSpeed: null,
  };

  return aa;

})(asteriskAttack); 

