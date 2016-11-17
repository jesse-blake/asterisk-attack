var asteriskAttack = (function(aa) {
  
  aa.dom = {
    window: $(window),
    doc: $(document),
    logo: $('#logo'),
    score: $('#score'),
    background: $('#background'),
    quitInstructions: $('#quit-instructions'),
    startBtn: $('#start-btn'),
    instructions: $('#instructions'),
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
