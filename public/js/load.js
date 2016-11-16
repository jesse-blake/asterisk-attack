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
    quitInstructions: $('#quit-instructions')
  };

  aa.stats = {
    score: null
  };

  aa.loops = {
    attack:    null,
    collision: null,
    background: null
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

