var asteriskAttack = (function(aa) {

  aa.detectCollisions = function() {
    var a // asterisk
      , s // heatray
      , d // defender
      , goz // game over zone
      , collision
      , aIdx
      , hIdx;

    function getPosition(element) {
      var pos    = element.offset()
        , width  = element.width()
        , height = element.height();

      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    function positionsCollide(p1, p2) {
      var x = p1[0] < p2[0] ? p1 : p2
        , y = p1[0] < p2[0] ? p2 : p1;
      
      return x[1] > y[0] || x[0] === y[0];
    }

    // Check for asterisk collisions.
    for (aIdx in aa.dom.attacking) {
      a = getPosition(aa.dom.attacking[aIdx]);
      collision = false;

      // See if the asterisk was hit by a heatray.
      for (hIdx in aa.dom.defending) {
        h = getPosition(aa.dom.defending[hIdx]);

        if (positionsCollide(a[0], h[0]) && positionsCollide(a[1], h[1])) {
          aa.completeAttack(aIdx, true);
          collision = true;
          break;
        }
      }

      if (collision) continue;

      // See if the asterisk hit the defender.
      d = getPosition(aa.dom.defender);
      if (positionsCollide(a[0], d[0]) && positionsCollide(a[1], d[1])) {
        aa.completeAttack(aIdx, true);
        continue;
      }

      // See if the asterisk hit the game over zone.
      goz = getPosition(aa.dom.gameOverZone);
      if (positionsCollide(a[0], goz[0]) && positionsCollide(a[1], goz[1])) {
        aa.completeAttack(aIdx, false);
        aa.quit();
        break;
      }
    }
  }

  return aa;

})(asteriskAttack);

