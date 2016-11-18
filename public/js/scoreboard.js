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
  
  aa.updateScores = function() {
    var scores = null;

    if (aa.stats.score > 0 && storageAvailable()) {
      scores = JSON.parse(localStorage.getItem('scores')) || [];

      scores.push(aa.stats.score);
      scores = scores.sort(function(a, b) {
        return b - a;
      });
      scores = scores.slice(0, 10);

      localStorage.setItem('scores', JSON.stringify(scores)); 
    }

    return scores;
  }

  aa.retrieveScores = function() {
    return storageAvailable()
      ? JSON.parse(localStorage.getItem('scores'))
      : null;
  }

  return aa;
  
})(asteriskAttack);
