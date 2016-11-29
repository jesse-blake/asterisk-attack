var asteriskAttack = (function state(aa) {


  /*
   * Make ready to play the game anew.
   */
  function reset() {
    aa.game.prevScore = aa.game.score;
    aa.game.score = 0;
    aa.game.plays++;

    aa.game.asteriskGenerationSpeed = 1000;
    aa.updateScore();
  };
  

  // Pre-referenced dom elements for performance.
  var dom = {
    win:                 $(window),
    doc:                 $(document),
    screenSizeError:     $('#screen-size-error'),

    errorMsg:            $('#error-msg'),
    reload:              $('#reload-page'),

    stars:               $('#stars'),
    starlessAreas:       $('#starless-areas'),

    game:                $('#game'),
    effects:             $('#effects'),
    menubar:             $('#menubar'),
    logo:                $('#logo'),
    score:               $('#score'),
    background:          $('#background'),
    antenas:             $('#antenas'),
    cityscape:           $('#cityscape'),
    startBtn:            $('#start-btn'),
    gameOver:            $('#game-over'),

    menu:                $('#menu'),
    scoreboardLink:      $('#scoreboard-link'),
    instructionsLink:    $('#instructions-link'),

    quitInstructions:    $('#quit-instructions'),

    scoreboardDone:      $('#scoreboard-done'),
    scoreboardDoneBtn:   $('#scoreboard-done-btn'),
    scoreboardHeader:    $('#scoreboard-header'),
    scoreboard:          $('#scoreboard'),

    instructionsDone:    $('#instructions-done'),
    instructionsDoneBtn: $('#instructions-done-btn'),
    instructionsHeader:  $('#instructions-header'),
    instructions:        $('#instructions'),

    zones:               $('#zones'),
    attackZone:          $('#attack-zone'),
    gameOverZone:        $('#game-over-zone'),

    defender:            $('#defender'),

    asterisksIdle:       [],
    asterisksAttacking:  {},
    attackerKeyCount:    0,  // Not a dom element; oh, well.
    heatraysIdle:        [],
    heatraysDefending:   []
  };

  var intervals = {
    screenSizeError:     null,
    attack:              null,
    collision:           null,
    background:          null,
    antenas:             []
  };

  var game = {
    score:                   null,
    prevScore:               null,
    plays:                   0,
    asteriskGenerationSpeed: null,
  };


  aa.reset = reset;
  aa.dom = dom;
  aa.intervals = intervals;
  aa.game = game;
  return aa;

})(asteriskAttack); 

