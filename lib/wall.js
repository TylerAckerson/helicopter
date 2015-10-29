(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Wall = window.Whirlybird.Wall = function(options) {
    options.col = Wall.COLOR;
    options.height = Wall.HEIGHT;
    options.width = Wall.WIDTH;

    window.Whirlybird.MovingObject.call(this, options);
  };

  Wall.COLOR = "#D3D3D3";
  Wall.HEIGHT = 500;
  Wall.WIDTH = 5;

  window.Whirlybird.Util.inherits(Wall, window.Whirlybird.MovingObject);
}());
