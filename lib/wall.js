(function() {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Wall = window.Helicopter.Wall = function(params) {
    Wall.COLOR = "green";
    Wall.HEIGHT = 500;
    Wall.WIDTH = 20;

  window.Helicopter.MovingObject.call(this, { col: Wall.COLOR,
                                              height: Wall.HEIGHT,
                                              width: Wall.WIDTH,
                                              pos: params.pos } );

  };

  window.Helicopter.Util.inherits(Wall, window.Helicopter.MovingObject);
}());
