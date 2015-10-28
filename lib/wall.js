(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Wall = window.Whirlybird.Wall = function(params) {
    Wall.COLOR = "green";
    Wall.HEIGHT = 500;
    Wall.WIDTH = 20;

  window.Whirlybird.MovingObject.call(this, { col: Wall.COLOR,
                                              height: Wall.HEIGHT,
                                              width: Wall.WIDTH,
                                              pos: params.pos } );

  };

  window.Whirlybird.Util.inherits(Wall, window.Whirlybird.MovingObject);
}());
