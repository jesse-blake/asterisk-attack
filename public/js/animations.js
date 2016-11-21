var asteriskAttack = (function(aa) {

  var offscreenLR = -1500
    , offscreenTB = -50
    , duration = 300;

  aa.animateLoadGame = function() {
    animateScore();
    animateStartBtn(true);
    animateScoreboardLink(true);
    animateInstructions(true);
  };

  aa.animateStartGame = function() {
    animateStartBtn(false);
    animateScore();
    animateDefender(true);
    animateGameOver(false);
    animateScoreboardLink(false);
    animateInstructions(false);
    animateQuitInstructions(true);
  };

  aa.animateEndGame = function() {
    animateStartBtn(true);
    animateDefender(false);
    animateGameOver(true);
    animateScoreboardLink(true);
    animateInstructions(true);
    animateQuitInstructions(false);
  };

  function animateScore() {
    if (aa.stats.plays > 0) {
      if (aa.stats.prevScore > 0) {
        aa.dom.score.effect('shake', duration, function() {
          aa.updateScore();
        });
      }
    }
    else {
      aa.updateScore();
      aa.dom.score
        .css({ 'right': offscreenLR })
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
  }

  function animateStartBtn(show) {
    if (show) { // Animate start button into view.
      if (aa.stats.plays === 1) {
        aa.dom.startBtn.html('<a href="#" style="color:white">P L A Y&nbsp;&nbsp;&nbsp;A G A I N</a><br>');

        $('#start-btn a').click(function() {
          asteriskAttack.start();
        });
      }

      aa.dom.startBtn
        .css({ 'right': offscreenLR })
        .show()
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
    else { // Animate start button out of view.
      aa.dom.startBtn
        .animate({'right': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.startBtn.hide();
        });
    }
  }

  function animateScoreboardLink(show) {
    if (aa.retrieveScores()) {
      if (show) {
        aa.dom.scoreboardLinkWrapper
          .css({ 'left': offscreenLR })
          .show()
          .animate({ 'left': '' }, { duration: duration, queue: false });
      }
      else {
        aa.dom.scoreboardLinkWrapper
          .animate({ 'left': offscreenLR }, { duration: duration, queue: false }, function() {
            aa.dom.scoreboardLinkWrapper.hide();
          });
      }
    }
  }

  function animateGameOver(show) {
    var i
      , colors = ['#444', '#888', '#ccc'] // Gray tones.
      //, colors = ['#ffff00','#ffd700','#ffa500','#ff4500','#ff0000'] // Red to yellow.
      , loops = ['gg','ga','gm','ge','oo','ov','oe','or'];

    if (show) {
      aa.dom.gameOver
        .show(function() {
          for (i = 0; i < loops.length; i++) {
            (function() {
              var j = i
                , dur = aa.randomInRange(700, 1000);

              aa.loops[loops[j]] = setInterval(function() {
                var color = colors[aa.randomInRange(0, colors.length-1)];
                aa.dom[loops[j]]
                  .animate({ 'color':color }, dur) 
                  .animate({ 'color':'#111' }, dur);
              }, dur*2);
            })();
          }
        });
    }
    else if (aa.stats.plays > 1) { // Game over isn't shown until a game has been played.
      aa.dom.gameOver
        .fadeOut(200, function() {
          for (i = 0; i < loops.length; i++) {
            window.clearInterval(aa.loops[loops[i]])
          }
        });
    }
  }

  function animateInstructions(show) {
    if (show) {
      aa.dom.instructions
        .css({ 'left': offscreenLR })
        .show()
        .animate({ 'left': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.instructions
        .animate({ 'left': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.instructions.hide();
        });
    }
  }

  function animateQuitInstructions(show) {
    if (show) {
      aa.dom.quitInstructions
        .css({ 'right': offscreenLR })
        .show()
        .animate({ 'right': '' }, { duration: duration, queue: false });
    }
    else {
      aa.dom.quitInstructions
        .animate({ 'right': offscreenLR }, { duration: duration, queue: false }, function() {
          aa.dom.quitInstructions.hide();
        });
    }
  }

  function animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.window.width() / 2) - 20, 'top': offscreenTB })
        .animate({ 'top': 450 }, { duration: duration, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': offscreenTB }, { duration: duration, queue: false });
    }
  }

  return aa;

})(asteriskAttack);

