var asteriskAttack = (function(aa) {

  aa.reset = function() {
    aa.stats.prevScore = aa.stats.score;
    aa.stats.score = 0;
    aa.game.heatbeamCount = 0;
    aa.game.asteriskCount = 0;
    aa.game.asteriskSpeed = 3000;
    aa.game.generationSpeed = 1000;
    aa.updateScore();
  };
  
  aa.dom = {
    window: $(window),
    doc: $(document),
    screenSizeError: $('#screen-size-error'),

    errorMsg: $('#error-msg'),
    reload: $('#reload-page'),

    stars: $('#stars'),
    starlessAreas: $('#starless-areas'),

    game: $('#game'),
    effects: $('#effects'),
    menubar: $('#menubar'),
    logo: $('#logo'),
    score: $('#score'),
    background: $('#background'),
    antenas: $('#antenas'),
    cityscape: $('#cityscape'),
    startBtn: $('#start-btn'),
    gameOver: $('#game-over'),

    menu: $('#menu'),
    scoreboardLink: $('#scoreboard-link'),
    instructionsLink: $('#instructions-link'),

    scoreboardHeader: $('#scoreboard-header'),
    scoreboard: $('#scoreboard'),
    scoreboardDone: $('#scoreboard-done'),
    scoreboardDoneBtn: $('#scoreboard-done-btn'),

    instructions: $('#instructions'),
    instructionsDone: $('#instructions-done'),
    instructionsDoneBtn: $('#instructions-done-btn'),

    quitInstructions: $('#quit-instructions'),

    zones: $('#zones'),
    attackZone: $('#attack-zone'),
    gameOverZone: $('#game-over-zone'),

    defender: $('#defender')
  };

  aa.stats = {
    score: null,
    prevScore: null,
    plays: 0
  };

  aa.loops = {
    screenSizeError: null,
    attack:          null,
    collision:       null,
    background:      null,
    antenas:         []
  };

  aa.sizes = {
    padding: 15
  };

  aa.game = {
    heatbeams: {}, // Key: id, value: dom object.
    heatbeamCount: null,
    asterisks: {}, // Key: id, value: dom object.
    asteriskCount: null,
    asteriskSpeed: null,
    generationSpeed: null,
  };

  return aa;

})(asteriskAttack); 

