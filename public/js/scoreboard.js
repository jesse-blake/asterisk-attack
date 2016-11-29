var asteriskAttack = (function scoreboard(aa) {


  /*
   * Test browser for local storage capabilities.
   * @return {bool} true if capabale, false if not.
   */
  function storageAvailable() {
    try {
      var storage = window.localStorage
        , x = '__storage_test__';

      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }


  /*
   * Convert a date number to the game scoreboard's date format.
   * @param {number} dateNum An integer value representing the number of milliseconds since 1 January 1970...yada yada.
   */
  function getScoreTimestamp(dateNum) {
    var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      , months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      , date = (new Date(dateNum))
      , hours = date.getHours();

    if (hours > 12) {
      hours -= 12;
    }
    else if (hours === 0) {
      hours = 12;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    return ''
      + days[date.getDay()]
      + ' '
      + months[date.getMonth()]
      + ' '
      + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
      + ' '
      + hours
      + ':'
      + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
      + ':'
      + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
      + ' '
      + (date.getHours() > 11 ? 'PM' : 'AM');
  }
  

  /*
   * Return the locally stored scores, or null.
   */
  function retrieveScores() {
    return storageAvailable()
      ? JSON.parse(localStorage.getItem('scores'))
      : null;
  }


  /*
   * Update the scores in local storage.
   */
  aa.updateTopScoresData = function() {
    var scores = null;

    if (aa.game.score > 0 && storageAvailable()) {
      scores = JSON.parse(localStorage.getItem('scores')) || [];

      // Push the latest score, sort the scores array, then keep only the highest 10.
      scores.push([aa.game.score, Date.now()]);
      scores = scores.sort(function(a, b) {
        return b[0] - a[0];
      });
      scores = scores.slice(0, 10);

      localStorage.setItem('scores', JSON.stringify(scores)); 
    }

    return scores;
  }


  /*
   * Update the html in the scoreboard div with latest score data.
   */
  function updateScoreboard() {
    var i
      , maxNumScores = 10
      , data = ''
      , line = ''
      , scoreData
      , timestamp
      , scores = retrieveScores()
      //, colors = ['magenta','#de71de','#ca84ca','#b58ab5','#9f899f','#8d828d','#787578','#646464','#4e4e4e','#393939'];
      , colors = ['#fff','#eee','#ddd','#ccc','#bbb','#aaa','#999','#888','#777','#666'];

    if (scores) {
      for (i = 0; i < maxNumScores; i++) {
        // Start with a line of dots!
        line = '................................................................................................';

        if (typeof scores[i] !== 'undefined') {
          scoreData = scores[i][0] + '';
          timestamp = getScoreTimestamp(scores[i][1]);
        }
        else { // No score data.
          scoreData = '';
          timestamp = '*';
        }

        // Add rank and score (or an asterisk if no score data) to line.
        line = '<span style="color:' + colors[i] + ';">'
          + '' + (i + 1)
          + '</span>'
          + line.slice(('' + (i+1)).length, 4)
          + '<span style="color:' + colors[i] + ';">'
          + scoreData
          + '</span>'
          + line.slice(4 + scoreData.length, line.length);

        // Add timestamp (an asterisk if no score data) to line.
        line = line.slice(0, (line.length - timestamp.length - 1))
          + '<span style="color:' + colors[i] + ';">'
          + timestamp.replace(/ /g, '&nbsp;')
          + '</span>';

        data += line + '<br><br>';
      }

      aa.dom.scoreboard.html(data);
    }
    else {
      aa.dom.scoreboard.html('<br><br><br><div style="color:white">No Scores Yet.</div>');
    }
  }


  aa.updateScoreboard = updateScoreboard;
  return aa;
  
})(asteriskAttack);

