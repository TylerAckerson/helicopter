(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Block = window.Whirlybird.Block = function(options) {
    options.col = Block.COLOR;
    options.height = Block.HEIGHT;
    options.width = Block.WIDTH;

  window.Whirlybird.MovingObject.call(this, options);

  };

  Block.COLOR = "slategray";
  Block.HEIGHT = 150;
  Block.WIDTH = 20;

  window.Whirlybird.Util.inherits(Block, window.Whirlybird.MovingObject);
}());
