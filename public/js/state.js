"use strict";

var asteriskAttack = (function _stateJs(aa) {


  /*
   * Make ready to play the game anew.
   */
  aa.reset = function() {
    aa.game.prevScore = aa.game.score;
    aa.game.score = 0;
    aa.game.plays++;

    aa.game.asteriskGenerationSpeed = 1000;
    aa.updateScore();
  };
  

  // Pre-referenced dom elements for performance.
  aa.dom = {
    win:                      $(window),
    doc:                      $(document),

    screenSizeError:          $('#screen-size-error'),

    stars:                    $('#stars'),

    game:                     $('#game'),

    logo:                     $('#logo'),

    starlessAreas:            $('#starless-areas'),
    background:               $('#background'),
    antenas:                  $('#antenas'),
    cityscape:                $('#cityscape'),

    playBtn:                  $('#play-btn'),
    playBtnLink:              null, // Set in load.js.

    gameOverMsg:              $('#game-over-msg'),

    menubar:                  $('#menubar'),
    menu:                     $('#menu'),

    howToPlayLink:            null, // Set in load.js.
    howToPlayBackLinkWrapper: $('#how-to-play-back-link-wrapper'),
    howToPlayBackLink:        null, // Set in load.js.

    topScoresLink:            null, // Set in load.js.
    topScoresBackLinkWrapper: $('#top-scores-back-link-wrapper'),
    topScoresBackLink:        null, // Set in load.js.

    howToQuitMsg:             $('#how-to-quit-msg'),

    digitalScore:             $('#digital-score'),
    digitalTopScoresHeadline: $('#digital-top-scores-headline'),
    digitalHowToPlayHeadline: $('#digital-how-to-play-headline'),

    topScores:                $('#top-scores'),
    howToPlay:                $('#how-to-play'),

    zones:                    $('#zones'),
    attackZone:               $('#attack-zone'),
    gameOverZone:             $('#game-over-zone'),

    defender:                 $('#defender'),

    asterisksIdle:            [],
    asterisksAttacking:       {},
    attackerKeyCount:         0,  // Not a dom element; oh, well.
    heatraysIdle:             [],
    heatraysDefending:        []
  };

  aa.intervals = {
    screenSizeError:          null,
    attack:                   null,
    collision:                null,
    background:               null,
    antenas:                  []
  };

  aa.game = {
    score:                   null,
    prevScore:               null,
    plays:                   0,
    asteriskGenerationSpeed: null,
  };


  return aa;

})(asteriskAttack); 

