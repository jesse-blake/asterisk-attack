var asteriskAttack = (function(aa) {

  aa.detectCollisions = function() {
    var a // attacker
      , s // slug
      , d // defender
      , c
      , collision
      , defender   = $('#defender')
      , civilians  = $('#civilians')

    function getPosition(element) {
      var pos    = $(element).position()
        , width  = $(element).width()
        , height = $(element).height();

      return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    function positionsCollide(p1, p2) {
      var x = p1[0] < p2[0] ? p1 : p2
        , y = p1[0] < p2[0] ? p2 : p1;
      
      return x[1] > y[0] || x[0] === y[0];
    }

    c = getPosition(civilians);

    // Check for attacker collisions.
    for (aId in aa.game.attackers) {
      a = getPosition(aa.game.attackers[aId]);
      collision = false;

      // See if the attacker was hit by a slug.
      for (sId in aa.game.slugs) {
        s = getPosition(aa.game.slugs[sId]);

        if (positionsCollide(a[0], s[0]) && positionsCollide(a[1], s[1])) {
          aa.completeAttack(aId, true);
          collision = true;
          break;
        }
      }

      if (collision) continue;

      // See if the attacker hit the defender.
      d = getPosition(defender);
      if (positionsCollide(a[0], d[0]) && positionsCollide(a[1], d[1])) {
        aa.completeAttack(aId, true);
        continue;
      }

      // See if the attacker hit the civilians.
      if (positionsCollide(a[0], c[0]) && positionsCollide(a[1], c[1])) {
        aa.completeAttack(aId, false);
        aa.quit();
        break;
      }
    }
  }

  return aa;

})(asteriskAttack);

