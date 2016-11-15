var asteriskAttack = (function(aa) {

  var animations = null;

  function buildAnimations() {
    var colors = ['lightskyblue', 'lightskyblue', 'dodgerblue', 'blue']
      , i
      , j;

    animations = {
      current: 0,
      frames: [ // Lots of ugly backspace escapes.
        [
          '                                                                                                ',
          '    o/           \\o/                           o               oO                o              ',
          '   /|             )                           v|v             /><\\              /(\\             ',
          '____)\\___________/ )___________________________)\\_____________))((______________( )_____________'
        ],[
          '                                                                                \\o/             ',
          '    o                 \\o/                     \\o/             \\oO/               |              ',
          '   /|V                 )                       |              /  \\              / \\             ',
          '____)\\________________/ )______________________)\\_____________))((______________________________'
        ],[
          '                                                                                                ',
          '    o/                \\o/                      o              \\oO/               o              ',
          '   /|                  (                      v|v             /  \\              /(\\             ',
          '____)\\________________( \\_____________________/(______________))((______________( )_____________'
        ],[
          '                                                                                                ',
          '    o            \\o/                          \\o/              oO                o              ',
          '   /|V            (                            |              /><\\              /(\\             ',
          '____)\\___________( \\__________________________/(______________))((______________( )_____________'
        ]
      ]
    };

    for (i = 0; i < animations.frames.length; i++) {
      for (j = 0; j < animations.frames[i].length; j++) {
        animations.frames[i][j] = animations.frames[i][j]
          .replace(/ /g, '&nbsp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        animations.frames[i][j] = '<span class="civilians'
          + (i+1) 
          + '" style="color:' + colors[j] + '">' 
          + animations.frames[i][j] 
          + '</span><br>';
      }
    }
    
    return animations
  }

  aa.animateCivilians = function() {

    if (!animations) buildAnimations();
      
    if (++animations.current % animations.frames.length === 0) {
      animations.current = 0;
    }

    aa.dom.civilians.html(animations.frames[animations.current].join(''));
  };

  aa.animateStartBtn = function(show) {
    var startBtn = $('#start-btn');

    if (show) { // Animate start button into view.
      startBtn.css({ 'right': -(800 + 500) })
        .animate({ 'right': '' }, 300, function() {
          $('#start-btn a').hover(
            function() {
              var newBtn = startBtn.clone();

              newBtn.attr('id', 'temp-start-btn')
                .insertAfter('#start-btn')
                .animate({ 'opacity': '0', 'font-size': '35px' }, 300, function() {
                  newBtn.remove();
                });
            },
            function() {} // So the hover-in function isn't called on hover-out.
          );
        })
    }
    else { // Animate start button out of view.
      startBtn.animate({'right': -(800 + 500) }, 500)
        .unbind('mouseenter mouseleave');
    }
  };

  aa.animateQuitInstruction = function(show) {
    var quitInst = $('#quit-instruction');

    if (show) {
      quitInst.css({ 'left': -(800 + 500) })
        .animate({'left': '' }, 300);
    }
    else {
      quitInst.animate({ 'left': -(800 + 500) }, 500);
    }
  };

  aa.animateDefender = function(show) {
    if (show) {
      aa.dom.defender.css({ 'left': (aa.dom.game.width() / 2) - 20, 'top': -500 })
        .animate({ 'top': 350 }, 300);
    }
    else {
      aa.dom.defender.animate({ 'top': -500 }, 300);
    }
  };

  return aa;

})(asteriskAttack);

