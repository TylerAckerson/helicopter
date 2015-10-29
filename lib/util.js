(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  Util = window.Whirlybird.Util = {};

  window.Whirlybird.Util.inherits = function(childClass, parentClass) {
    function Surrogate () {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  window.Whirlybird.Util.BlockPos = function(count, maxX, maxY){
    var posX = maxX + (count * 500);
    var posY = Math.floor(Math.random() * (maxY - 400)) + 200;

    return [posX, posY];
  };

  window.Whirlybird.Util.RandomY = function(maxY){
    return Math.floor(Math.random() * (maxY  -400)) + 200;
  };
})();
