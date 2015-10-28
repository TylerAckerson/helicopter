(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Block = window.Whirlybird.Block = function(params) {
    Block.COLOR = "#ADADAD";
    Block.HEIGHT = 50;
    Block.WIDTH = 20;

  window.Whirlybird.MovingObject.call(this, { col: Block.COLOR,
                                              height: Block.HEIGHT,
                                              width: Block.WIDTH,
                                              pos: params['pos'] } );

  };

  window.Whirlybird.Util.inherits(Block, window.Whirlybird.MovingObject);
}());
