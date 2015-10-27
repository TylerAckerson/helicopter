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

    this.topWalls = [];
    this.bottomWalls = [];
    this.addWalls();
  };

  Game.prototype.addWalls = function(){
    wallsCount = Math.ceil(this.DIM_Y / 20);

    for (var i = 0; i < wallsCount; i ++) {
      topPos = [this.DIM_Y + (20 * i), 0];
      this.topWalls.push(new window.Helicopter.Wall(
        {pos: topPos,  game: window.Helicopter.game })
      );

      bottomPos= [this.DIM_Y + (20 * i), this.DIM_X - 200];
      this.bottomWalls.push(new window.Helicopter.Wall(
        {pos: bottomPos, game: window.Helicopter.game })
      );
    }
  };

  Game.prototype.addWall = function(){

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

  Game.prototype.regenerateTopWall = function(wallPos) {
    lastWallPos = _.last(game.topWalls).pos;

    wallPos[0] = this.DIM_Y;
    wallPos[1] = lastWallPos[1] + 10;

    return wallPos;
  };
  Game.prototype.regenerateBottomWall = function(wallPos) {
    lastWallPos = _.last(game.bottomWalls).pos;

    wallPos[0] = this.DIM_Y;
    wallPos[1] = lastWallPos[1] - 10;

    return wallPos;
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
    this.blocks.forEach(function(block) { block.draw(ctx); });
    this.topWalls.forEach(function(wall) { wall.draw(ctx); });
    this.bottomWalls.forEach(function(wall) { wall.draw(ctx); });
  };

  Game.prototype.moveObjects = function(ctx) {
    this.blocks.forEach(function(block) { block.move(); } );
    this.topWalls.forEach(function(wall) { wall.moveWall(); } );
    this.bottomWalls.forEach(function(wall) { wall.moveWall(); } );
  };

  Game.wrap = function(pos) {
    var posX = pos[0];

    if (posX < 1) {
      return game.regenerateBlock(pos);
    }
  };

  Game.wrapWall = function(pos) {
    var posX = pos[0];
    var posY = pos[1];

    if (posX < 1) {
      if (posY < 100) {
        return game.regenerateTopWall(pos);
      } else {
        return game.regenerateBottomWall(pos);
      }
    }
  };

})();
