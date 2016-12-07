"use strict";

var asteriskAttack = (function _collisionsJs(app) {

  /*
   * Detect collisions between attacking asterisks and heatrays shot by the defender.
   */
  app.detectCollisions = function detectCollisions() {
    var a // asterisk
      , h // heatray
      , d // defender
      , goz // game over zone
      , collision
      , aIdx
      , hIdx;

    /*
     * Get the positional coordinates of a dom element.
     * @param {object} element A jquery wrapped dom element.
     */
    function _getPosition(element) {
      var pos    = element.offset()
        , width  = element.width()
        , height = element.height();

      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    /*
     * Determine if two elements overlap by their positional coordinates.
     * @param {number[]} p1 Some top and bottom (or left and right) coordinates.
     * @param {number[]} p2 Other top and bottom (or left and right) coordinates.
     */
    function _positionsCollide(p1, p2) {
      var x = p1[0] < p2[0] ? p1 : p2
        , y = p1[0] < p2[0] ? p2 : p1;
      
      return x[1] > y[0] || x[0] === y[0];
    }

    // Check every attacking asterisk for possible collisions.
    for (aIdx in app.dom.asterisksAttacking) {
      a = _getPosition(app.dom.asterisksAttacking[aIdx]);
      collision = false;

      // Check if the asterisk is colliding with a heatray.
      for (hIdx in app.dom.heatraysDefending) {
        h = _getPosition(app.dom.heatraysDefending[hIdx]);

        if (_positionsCollide(a[0], h[0]) && _positionsCollide(a[1], h[1])) {
          app.completeAttack(aIdx, true);
          collision = true;
          break;
        }
      }

      if (collision) continue; // The asterisk was thwarted by a heatray, so ignore it now.

      // Check if the asterisk collided with the defender.
      d = _getPosition(app.dom.defender);
      if (_positionsCollide(a[0], d[0]) && _positionsCollide(a[1], d[1])) {
        app.completeAttack(aIdx, true);
        continue;
      }

      // Check if the asterisk got past the defender to the game-over zone.
      goz = _getPosition(app.dom.gameOverZone);
      if (_positionsCollide(a[0], goz[0]) && _positionsCollide(a[1], goz[1])) {
        app.completeAttack(aIdx, false);
        app.quit();
        break;
      }
    }
  }


  return app;

})(asteriskAttack);

