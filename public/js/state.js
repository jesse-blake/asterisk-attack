"use strict";

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

    playBtn:             $('#play-btn'),
    playBtnLink:         null, // Set in load.js.

    gameOverMsg:         $('#game-over-msg'),

    menu:                $('#menu'),
    scoreboardLink:      null, // Set in load.js.
    instructionsLink:    null, // Set in load.js.

    quitInstructionsMsg: $('#quit-instructions-msg'),

    scoreboardDone:      $('#scoreboard-done'),
    scoreboardDoneBtn:   null, // Set in load.js.
    scoreboardHeader:    $('#scoreboard-header'),
    scoreboard:          $('#scoreboard'),

    instructionsDone:    $('#instructions-done'),
    instructionsDoneBtn: null, // Set in load.js.
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

