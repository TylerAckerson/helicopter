(function() {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Block = window.Helicopter.Block = function(params) {
    Block.COLOR = "#ADADAD";
    Block.HEIGHT = 20;
  // Asteroid.VELOCITY = window.Asteroids.Util.randomVel();

  window.Helicopter.MovingObject.call(this, { col: Block.COLOR,
                                              height: Block.HEIGHT,
                                              pos: params['pos'] } );

  };

  window.Helicopter.Util.inherits(Block, window.Helicopter.MovingObject);
}());
