"use strict";

var asteriskAttack = (function _utilsJs(aa) {


  /*
   * Return a number in range [min, max].
   # @param {number} min The range minimum.
   # @param {number} max The range maximum.
   */
  aa.randomInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  return aa;

})({});

