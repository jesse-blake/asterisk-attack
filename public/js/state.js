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
      antena1: $('#antena1'),
      antena2: $('#antena2'),
      antena3: $('#antena3'),
      antena4: $('#antena4'),
      antena5: $('#antena5'),
      antena6: $('#antena6'),
    zones: $('#zones'),
      attackZone: $('#attack-zone'),
      gameOverZone: $('#game-over-zone'),
    defender: $('#defender')
  };

  aa.stats = {
    score: null,
    plays: 0
  };

  aa.loops = {
    attack:    null,
    collision: null,
    background: null,
    antena1: null,
    antena2: null,
    antena3: null,
    antena4: null,
    antena5: null,
    antena6: null
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

