(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Game = window.Helicopter.Game = function() {
    var DIM_X = window.canvasElement.height;
    var DIM_Y = window.canvasElement.width;
    var NUM_ASTEROIDS = 20;

    this.blocks = [];
    this.addBlocks();
  };

  Game.prototype.addBlocks = function() {
    for(var i = 0; i < 20; i++) {
      var blockPos = window.Helicopter.Util.randomPos(500, 500);
      this.blocks.push( new window.Helicopter.Block(
         {pos: blockPos, game: window.Helicopter.game } ));
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, window.canvasElement.width, window.canvasElement.height);
    this.blocks.forEach(function(block) { block.draw(ctx); });
  };

  Game.prototype.moveObjects = function(ctx) {
    this.blocks.forEach(function(block) { block.move(); } );
  };

  Game.wrap = function(pos) {
    var posX = pos[0];
    var posY = pos[1];

    if (posX === window.canvasElement.width){
      pos[0] = 0;
    } else if (posX === 0) {
      pos[0] = window.canvasElement.width;
    }

    if (posY === window.canvasElement.height){
      pos[1] = 0;
    } else if (posY === 0) {
      pos[1] = window.canvasElement.height;
    }
  };

})();
