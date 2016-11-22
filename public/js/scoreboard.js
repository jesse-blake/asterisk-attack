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
      , data = ''
      , line = ''
      , scores = aa.retrieveScores()
      , colors = ['#ddd','#ccc','#bbb','#aaa','#999','#888','#777','#666','#555','#444'];


    for (i = 0; i < scores.length; i++) {
      // Start with a line of dots.
      line = '................................................................................................';

      // Replace some leading spaces with the current score, colored.
      line = '<span style="color:' + colors[i] + ';">'
        + scores[i][0] 
        + '</span>' 
        + line.slice(('' + scores[i][0]).length, line.length);

      // Replace some ending spaces with the score's time stamp, colored.
      line = line.slice(0, line.length - getScoreTimestamp(scores[i][1]).length)
        +'<span style="color:' + colors[i] + ';">'
        + getScoreTimestamp(scores[i][1]).replace(/ /g, '&nbsp;')
        + '</span>';

      data += line + '<br><br>';
    }

    aa.dom.scoreboard.html(data);
  }

  return aa;
  
})(asteriskAttack);

