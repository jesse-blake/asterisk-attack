"use strict";

var asteriskAttack = (function _utilsJs(aa) {


  /*
   * Return a number in range [min, max].
   # @param {number} min The range minimum.
   # @param {number} max The range maximum.
   */
  aa.randomInRange = function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  /*
   * Test browser for local storage capabilities.
   * @return {bool} true if capabale, false if not.
   */
  aa.storageAvailable = function storageAvailable() {
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


  return aa;

})({});

