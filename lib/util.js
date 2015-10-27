(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }
  window.Helicopter.Util = {};

  window.Helicopter.Util.inherits = function(childClass, parentClass) {
    function Surrogate () {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
    };

  window.Helicopter.Util.randomPos = function(maxX, maxY){
    var randX = Math.floor(Math.random() * maxX);
    var randY = Math.floor(Math.random() * maxY);

    return [randX, randY];
  };
  //
  // window.Asteroids.Util.randomVel = function(){
  //   var randX = Math.floor(Math.random() * 2);
  //   var randY = Math.floor(Math.random() * 2);
  //
  //   return [randX, randY];
  // };
})();
