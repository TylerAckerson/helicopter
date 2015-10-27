(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  Util = window.Helicopter.Util = {};

  window.Helicopter.Util.inherits = function(childClass, parentClass) {
    function Surrogate () {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
    };

  window.Helicopter.Util.FirstBlockPos = function(X, maxY){
    var randY = Math.floor(Math.random() * maxY);
    return [X, randY];
  };

  window.Helicopter.Util.BlockPos = function(startX, count, maxY){
    var X = (startX + (count * 100));
    var randY = Math.floor(Math.random() * maxY);

    return [X, randY];
  };

  window.Helicopter.Util.RandomY = function(maxY){
    return Math.floor(Math.random() * maxY);
  };
})();
