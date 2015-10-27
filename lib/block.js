(function() {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Block = window.Helicopter.Block = function(params) {
    Block.COLOR = "#ADADAD";
    Block.HEIGHT = 50;
    Block.WIDTH = 20;

  window.Helicopter.MovingObject.call(this, { col: Block.COLOR,
                                              height: Block.HEIGHT,
                                              width: Block.WIDTH,
                                              pos: params['pos'] } );

  };

  window.Helicopter.Util.inherits(Block, window.Helicopter.MovingObject);
}());
