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

  window.Whirlybird.Util.FirstBlockPos = function(X, maxY){
    var randY = Math.floor(Math.random() * maxY);
    return [X, randY];
  };

  window.Whirlybird.Util.BlockPos = function(startX, count, maxY){
    var X = (startX + (count * 400));
    var randY = Math.floor(Math.random() * maxY) - 100;

    return [X, randY];
  };

  window.Whirlybird.Util.RandomY = function(maxY){
    return Math.floor(Math.random() * maxY);
  };
  // 
  // window.Whirlybird.Util.dist = function(pos1, pos2) {
  //   return pos2 - pos
  //
  //   return Math.sqrt(
  //     Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  //   );
  // };
})();
