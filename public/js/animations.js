var asteriskAttack = (function(aa) {

  var duration = 300;

  aa.animateLoadGame = function() {
    aa.updateScore();
    setClickHandlers();

    showFromLeft(aa.dom.menubar);
    showFromRight(aa.dom.logo);
    showFromLeft(aa.dom.score);
    showFromRight(aa.dom.startBtn);
    showFromLeft(aa.dom.menu);
  };

  aa.animateStartGame = function() {
    resetScore();
    updateStartBtn();

    animateDefender(true);
    hideToRight(aa.dom.startBtn);
    hideToRight(aa.dom.menu);

    showFromLeft(aa.dom.quitInstructions);
  };

  aa.animateEndGame = function() {
    updateStartBtn();

    animateDefender(false);
    showFromLeft(aa.dom.gameOver);
    hideToRight(aa.dom.quitInstructions);

    setTimeout(function() {
      hideToRight(aa.dom.gameOver);
      showFromLeft(aa.dom.startBtn);
      showFromLeft(aa.dom.menu);
    }, 1500);
  };

  function showScoreboard() {
    aa.updateScoreboard();

    hideToRight(aa.dom.score);
    hideToRight(aa.dom.startBtn);
    hideToRight(aa.dom.menu);
    hideToRight(aa.dom.background);

    showFromLeft(aa.dom.scoreboardHeader);
    showFromLeft(aa.dom.scoreboard);
    showFromLeft(aa.dom.scoreboardDone);
  }

  function hideScoreboard() {
    hideToRight(aa.dom.scoreboardHeader);
    hideToRight(aa.dom.scoreboard);
    hideToRight(aa.dom.scoreboardDone);

    showFromLeft(aa.dom.score);
    showFromLeft(aa.dom.startBtn);
    showFromLeft(aa.dom.menu);
    showFromLeft(aa.dom.background);
  }

  function showInstructions() {
    animateDefender(true);

    hideToRight(aa.dom.menu);
    hideToRight(aa.dom.score);
    hideToRight(aa.dom.startBtn);
    hideToRight(aa.dom.background);

    showFromLeft(aa.dom.instructionsDone);
    showFromLeft(aa.dom.instructionsHeader);
    showFromLeft(aa.dom.instructions);
  }

  function hideInstructions() {
    animateDefender(false);

    hideToRight(aa.dom.instructionsDone);
    hideToRight(aa.dom.instructionsHeader);
    hideToRight(aa.dom.instructions);

    showFromLeft(aa.dom.menu);
    showFromLeft(aa.dom.score);
    showFromLeft(aa.dom.startBtn);
    showFromLeft(aa.dom.background);
  }

  function showFromLeft(element) {
    var startPos = -(element.width() * 2);

    element.stop()
      .css({ 'left': startPos, 'right': 'auto', 'margin': '0 0 0 ' + (-(element.width()/2)) + 'px' })
      .show()
      .animate({ 'left': '' }, { duration: duration, queue: false });
  }

  function showFromRight(element) {
    var startPos = -(element.width() * 2);

    element.stop()
      .css({'right': startPos, 'left': 'auto', 'margin': '0 ' + (-(element.width()/2)) + 'px 0 0' })
      .show()
      .animate({ 'right': '' }, { duration: duration, queue: false });
  }

  function hideToLeft(element) {
    var endPos = -(element.width() * 2);

    element
      .css({ 'right': 'auto' })
      .animate({
        'left': endPos,
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
    var endPos = -(element.width() * 2)
      , margin

    element
      .css({ 'left': 'auto' })
      .animate({
        'right': endPos,
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

    aa.dom.scoreboardDone.click(function() {
      hideScoreboard();
    });

    aa.dom.instructionsLink.click(function() {
      showInstructions(); 
    });

    aa.dom.instructionsDone.click(function() {
      hideInstructions();
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

  function animateDefender(show) {
    if (show) {
      aa.dom.defender
        .css({ 'left': (aa.dom.window.width() / 2) - 20, 'top': -50 })
        .animate({ 'top': 475 }, { duration: duration, queue: false });
    }
    else {
      aa.dom.defender
        .animate({ 'top': -50 }, { duration: duration, queue: false });
    }
  }

  return aa;

})(asteriskAttack);

