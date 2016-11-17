var asteriskAttack = (function(aa) {
  
  aa.dom = {
    window: $(window),
    doc: $(document),
    game: $('#asterisk-attack'),
    logo: $('#logo'),
    score: $('#score'),
    background: $('#background'),
    startBtn: $('#start-btn'),
    defender: $('#defender'),
    civilians: $('#civilians'),
    instructions: $('#instructions'),
    quitInstructions: $('#quit-instructions'),
    blinker1: $('#blinker1'),
    blinker2: $('#blinker2'),
    blinker3: $('#blinker3'),
    blinker4: $('#blinker4'),
    blinker5: $('#blinker5'),
    blinker6: $('#blinker6')
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

  aa.load = function() {
    aa.animateLoadGame();

    $('#start-btn a').click(function() {
      asteriskAttack.start();
    });
  };

  return aa;

})(asteriskAttack); 

