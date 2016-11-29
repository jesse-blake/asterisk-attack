var asteriskAttack = (function utils(aa) {


  /*
   * Return a number in range [min, max].
   # @param {number} min The range minimum.
   # @param {number} max The range maximum.
   */
  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  aa.randomInRange = randomInRange;
  return aa;

})({});

