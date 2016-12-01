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
    topScoresLink:       null, // Set in load.js.
    howToPlayLink:       null, // Set in load.js.

    howToQuitMsg:        $('#how-to-quit-msg'),

    topScoresDone:       $('#top-scores-done'),
    topScoresDoneBtn:    null, // Set in load.js.
    topScoresHeader:     $('#top-scores-header'),
    topScores:           $('#top-scores'),

    howToPlayDone:       $('#how-to-play-done'),
    howToPlayDoneBtn:    null, // Set in load.js.
    howToPlayHeader:     $('#how-to-play-header'),
    howToPlay:           $('#how-to-play'),

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

