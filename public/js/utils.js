var asteriskAttack = (function(aa) {
  
  aa.randomInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Range [min, max]
  };

  return aa;

})({});

