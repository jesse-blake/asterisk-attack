var asteriskAttack = (function(aa) {

  var duration = 300;

  aa.animateLoadGame = function() {
    aa.updateScore();
    setClickHandlers();

    showFromRight(aa.dom.logo);
    showFromLeft(aa.dom.score);
    showFromRight(aa.dom.startBtn);
    showFromLeft(aa.dom.instructions);
    if (aa.retrieveScores()) {
      showFromRight(aa.dom.scoreboardLinkWrapper);
    }
  };

  aa.animateStartGame = function() {
    resetScore();
    updateStartBtn();

    animateDefender(true);
    if (aa.stats.plays > 1) {
      hideToRight(aa.dom.gameOver);
    }
    hideToRight(aa.dom.startBtn);
    if (aa.retrieveScores()) {
      hideToLeft(aa.dom.scoreboardLinkWrapper);
    }
    hideToLeft(aa.dom.instructions);
    showFromRight(aa.dom.quitInstructions);
  };

  aa.animateEndGame = function() {
    updateStartBtn();

    animateDefender(false);
    showFromRight(aa.dom.startBtn);
    showFromRight(aa.dom.gameOver);
    if (aa.retrieveScores()) {
      showFromLeft(aa.dom.scoreboardLinkWrapper);
    }
    showFromLeft(aa.dom.instructions);
    hideToRight(aa.dom.quitInstructions);
  };

  function showScoreboard() {
    hideToRight(aa.dom.score);
    hideToRight(aa.dom.startBtn);
    hideToRight(aa.dom.gameOver);
    hideToRight(aa.dom.scoreboardLinkWrapper);
    hideToRight(aa.dom.instructions);
    hideToRight(aa.dom.background);
    showFromLeft(aa.dom.scoreboard);
  }

  function hideScoreboard() {
    showFromRight(aa.dom.score);
    showFromRight(aa.dom.startBtn);
    showFromRight(aa.dom.gameOver);
    showFromRight(aa.dom.scoreboardLinkWrapper);
    showFromRight(aa.dom.instructions);
    showFromRight(aa.dom.background);
    hideToLeft(aa.dom.scoreboard);
  }

  function showFromLeft(element) {
    var startPos = -(element.width() + 50);

    element.stop()
      .css({ 'left': startPos, 'right': 'auto', 'margin': '0 0 0 ' + (-(element.width()/2)) + 'px' })
      .show()
      .animate({ 'left': '' }, { duration: duration, queue: false });
  }

  function showFromRight(element) {
    var startPos = -(element.width() + 50);

    element.stop()
      .css({'right': startPos, 'left': 'auto', 'margin': '0 ' + (-(element.width()/2)) + 'px 0 0' })
      .show()
      .animate({ 'right': '' }, { duration: duration, queue: false });
  }

  function hideToLeft(element) {
    var endPos = -(element.width() + 50);

    element.animate({
      'left': endPos,
      'right': 'auto',
      'margin': '0 0 0 ' + (-(element.width()/2)) + 'px'
    },{
      duration: duration,
      queue: false,
      complete: function() {
        element.hide();
      }
    });
  }

  function hideToRight(element) {
    var endPos = -(element.width() + 50)
      , margin

    element.animate({
      'right': endPos,
      'left': 'auto',
      'margin': '0 ' + (-(element.width()/2)) + 'px 0 0'
    },{
      duration: duration,
      queue: false, 
      complete: function() {
        element.hide();
      }
    });
  }

  function setClickHandlers() {
    $('#start-btn a').click(function() {
      aa.start();
    });

    aa.dom.scoreboardLink.click(function() {
      showScoreboard(); 
    });

    aa.dom.scoreboardDoneBtn.click(function() {
      hideScoreboard();
    });
  }

  function resetScore() {
    if (aa.stats.prevScore > 0) {
      aa.dom.score.effect('shake', duration, function() {
        aa.updateScore();
      });
    }
  }

  function updateStartBtn() {
    if (aa.stats.plays === 1) {
      aa.dom.startBtn.html('<a href="#" style="color:white">P L A Y&nbsp;&nbsp;&nbsp;A G A I N</a><br>');

      $('#start-btn a').click(function() {
        aa.start();
      });
    }
  }

  // function animateGameOver(show) {
  //   var i
  //     , colors = ['#444', '#888', '#ccc'] // Gray tones.
  //     //, colors = ['#ffff00','#ffd700','#ffa500','#ff4500','#ff0000'] // Red to yellow.
  //     , loops = ['gg','ga','gm','ge','oo','ov','oe','or'];

  //   if (show) {
  //     aa.dom.gameOver
  //       .show(function() {
  //         for (i = 0; i < loops.length; i++) {
  //           (function() {
  //             var j = i
  //               , dur = aa.randomInRange(700, 1000);

  //             aa.loops[loops[j]] = setInterval(function() {
  //               var color = colors[aa.randomInRange(0, colors.length-1)];
  //               aa.dom[loops[j]]
  //                 .animate({ 'color':color }, dur) 
  //                 .animate({ 'color':'#111' }, dur);
  //             }, dur*2);
  //           })();
  //         }
  //       });
  //   }
  //   else if (aa.stats.plays > 1) { // Game over isn't shown until a game has been played.
  //     aa.dom.gameOver
  //       .fadeOut(200, function() {
  //         for (i = 0; i < loops.length; i++) {
  //           window.clearInterval(aa.loops[loops[i]])
  //         }
  //       });
  //   }
  // }

  function animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.window.width() / 2) - 20, 'top': -50 })
        .animate({ 'top': 450 }, { duration: duration, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': -50 }, { duration: duration, queue: false });
    }
  }

  return aa;

})(asteriskAttack);

