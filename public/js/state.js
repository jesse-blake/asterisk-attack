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

    game: $('#game'),
    effects: $('#effects'),
    logo: $('#logo'),
    score: $('#score'),
    background: $('#background'),
    startBtn: $('#start-btn'),
    gameOver: $('#game-over'),
    gg: $('#gg'),
    ga: $('#ga'),
    gm: $('#gm'),
    ge: $('#ge'),
    oo: $('#oo'),
    ov: $('#ov'),
    oe: $('#oe'),
    or: $('#or'),
    antena1: $('#antena1'),
    antena2: $('#antena2'),
    antena3: $('#antena3'),
    antena4: $('#antena4'),
    antena5: $('#antena5'),
    antena6: $('#antena6'),
    scoreboardHeader: $('#scoreboard-header'),
    scoreboard: $('#scoreboard'),
    scoreboardDone: $('#scoreboard-done'),
    scoreboardDoneBtn: $('#scoreboard-done-btn'),
    scoreboardLink: $('#scoreboard-link'),
    scoreboardLinkBtn: $('#scoreboard-link-btn'),
    instructions: $('#instructions'),
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
    gg:              null,
    ga:              null,
    gm:              null,
    ge:              null,
    oo:              null,
    ov:              null,
    oe:              null,
    or:              null,
    antena1:         null,
    antena2:         null,
    antena3:         null,
    antena4:         null,
    antena5:         null,
    antena6:         null
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

