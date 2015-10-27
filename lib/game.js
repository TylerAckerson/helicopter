(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  Game = window.Helicopter.Game = function() {
    this.DIM_X = window.canvasElement.height;
    this.DIM_Y = window.canvasElement.width;
    this.NUM_BLOCKS = 8;
    this.NUM_BLOCKS = 10;
    this.BLOCK_SPACING = 200;

    this.blocks = [];
    this.addBlocks();

    this.walls = [];
    this.addWalls();
  };

  Game.prototype.addWalls = function(){
    topPos = [this.DIM_Y, 0];
    this.walls.push(new window.Helicopter.Wall(
      {pos: topPos,  game: window.Helicopter.game })
    );

    bottomPos= [this.DIM_Y, this.DIM_X - 200];
    this.walls.push(new window.Helicopter.Wall(
      {pos: bottomPos, game: window.Helicopter.game })
    );
  };

  Game.prototype.addBlocks = function() {
    var firstBlockPos = Util.FirstBlockPos(500, 500);

    for(var i = 0; i < this.NUM_BLOCKS; i++) {
      this.addBlock(firstBlockPos, i);
    }
  };

  Game.prototype.addBlock = function(firstBlockPos, count) {
    var blockPos = Util.BlockPos(firstBlockPos[0], count, 500);

    this.blocks.push( new window.Helicopter.Block(
       {pos: blockPos, game: window.Helicopter.game } ));
  };

  Game.prototype.regenerateBlock = function(blockPos) {
    blockPos[0] = this.DIM_Y;
    blockPos[1] = Util.RandomY(this.DIM_X);

    return blockPos;
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
    this.blocks.forEach(function(block) { block.draw(ctx); });
    this.walls.forEach(function(wall) { wall.draw(ctx); });
  };

  Game.prototype.moveObjects = function(ctx) {
    this.blocks.forEach(function(block) { block.move(); } );
    this.walls.forEach(function(wall) { wall.move(); } );
  };

  Game.wrap = function(pos) {
    var posX = pos[0];

    if (posX < 1) {
      return game.regenerateBlock(pos);
    }
  };

  // Game.wrapWall = function(pos) {
  //   var posX = pos[0];
  //
  //   if (posX < 1) {
  //     return game.regenerateBlock(pos);
  //   }
  // };

})();
