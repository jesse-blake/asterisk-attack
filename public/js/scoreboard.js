var asteriskAttack = (function(aa) {

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
  
  aa.retrieveScores = function() {
    return storageAvailable()
      ? JSON.parse(localStorage.getItem('scores'))
      : null;
  }

  aa.updateScores = function() {
    var scores = null;

    if (aa.stats.score > 0 && storageAvailable()) {
      scores = JSON.parse(localStorage.getItem('scores')) || [];

      scores.push([aa.stats.score, Date.now()]);
      scores = scores.sort(function(a, b) {
        return b[0] - a[0];
      });
      scores = scores.slice(0, 10);

      localStorage.setItem('scores', JSON.stringify(scores)); 
    }

    return scores;
  }

  aa.updateScoreboard = function() {
    var i
      , maxNumScores = 10
      , data = ''
      , line = ''
      , scoreData
      , timestamp
      , scores = aa.retrieveScores()
      , colors = ['magenta','#de71de','#ca84ca','#b58ab5','#9f899f','#8d828d','#787578','#646464','#4e4e4e','#393939'];

    for (i = 0; i < maxNumScores; i++) {
      // Start with a line of dots.
      line = '................................................................................................';

      if (typeof scores[i] !== 'undefined') {
        scoreData = scores[i][0] + '';
        timestamp = getScoreTimestamp(scores[i][1]);
      }
      else {
        scoreData = '*';
        timestamp = '*';
      }

      // Add rank and score (or and asterisk) to line.
      line = '<span style="color:' + colors[i] + ';">'
        + '#' + (i + 1)
        + '</span>' 
        + line.slice(('#' + (i+1)).length, 20)
        + '<span style="color:' + colors[i] + ';">'
        + scoreData
        + '</span>'
        + line.slice(20 + scoreData.length, line.length);

      // Add timestamp (or an asterisk) to line.
      line = line.slice(0, (line.length - timestamp.length - 1))
        + '<span style="color:' + colors[i] + ';">'
        + timestamp.replace(/ /g, '&nbsp;')
        + '</span>';

      data += line + '<br><br>';
    }

    aa.dom.scoreboard.html(data);
  }

  return aa;
  
})(asteriskAttack);

