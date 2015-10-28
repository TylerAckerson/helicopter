(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  Game = window.Helicopter.Game = function() {
    this.DIM_X = window.canvasElement.height;
    this.DIM_Y = window.canvasElement.width;
    this.NUM_BLOCKS = 5;
    this.BLOCK_SPACING = 400;

    this.copter = null;
    this.addCopter();

    this.blocks = [];
    this.addBlocks();

    this.wallOffset = 0;
    this.wallDirection = 1;
    this.wallRate = 1;

    this.topWalls = [];
    this.bottomWalls = [];
    this.addWalls();
  };

  Game.prototype.addCopter = function(){
    this.copter = new window.Helicopter.Copter({game: window.Helicopter.game});
  };

  Game.prototype.addWalls = function(){
    wallsCount = Math.ceil(this.DIM_Y / 20) + 1;

    for (var i = 0; i < wallsCount; i ++) {
      topPos = [this.DIM_Y + (20 * i), this.wallOffset - (this.DIM_X - 100)];
      this.topWalls.push(new window.Helicopter.Wall(
        {pos: topPos,  game: window.Helicopter.game })
      );

      bottomPos = [this.DIM_Y + (20 * i), this.wallOffset + (this.DIM_X - 200)];
      this.bottomWalls.push(new window.Helicopter.Wall(
        {pos: bottomPos, game: window.Helicopter.game })
      );

      this.wallOffset += (this.wallRate * this.wallDirection);
    }
  };

  Game.prototype.addBlocks = function() {
    var firstBlockPos = Util.FirstBlockPos(this.DIM_X, this.DIM_Y);

    for(var i = 0; i < this.NUM_BLOCKS; i++) {
      this.addBlock(firstBlockPos, i);
    }
  };

  Game.prototype.addBlock = function(firstBlockPos, count) {
    var blockPos = Util.BlockPos(firstBlockPos[0], count, this.DIM_X);

    this.blocks.push( new window.Helicopter.Block(
       {pos: blockPos, game: window.Helicopter.game } ));
  };

  Game.prototype.regenerateBlock = function(blockPos) {
    blockPos[0] = this.DIM_Y;
    blockPos[1] = Util.RandomY(this.DIM_X);

    return blockPos;
  };

  Game.prototype.regenerateTopWall = function(wallPos) {
    this.wallOffset += (this.wallRate * this.wallDirection);

    lastWallPos = _.last(game.topWalls).pos;
    wallPos[0] = this.DIM_Y;
    wallPos[1] = lastWallPos[1] + (this.wallOffset);

    return wallPos;
  };
  Game.prototype.regenerateBottomWall = function(wallPos) {
    this.wallOffset += (this.wallRate * this.wallDirection);

    lastWallPos = _.last(game.bottomWalls).pos;
    wallPos[0] = this.DIM_Y;
    wallPos[1] = lastWallPos[1] + (this.wallOffset);

    return wallPos;
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
    this.blocks.forEach(function(block) { block.draw(ctx); });
    this.topWalls.forEach(function(wall) { wall.draw(ctx); });
    this.bottomWalls.forEach(function(wall) { wall.draw(ctx); });
    this.copter.draw(ctx);
  };

  Game.prototype.moveObjects = function(ctx) {
    this.blocks.forEach(function(block) { block.move(); } );
    this.topWalls.forEach(function(wall) { wall.moveWall(); } );
    this.bottomWalls.forEach(function(wall) { wall.moveWall(); } );
  };

  Game.prototype.changeWallVectors = function(){
    this.wallDirection *= -1;
    // this.wallOffset = 0;
    // this.wallRate = 2;
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

    if (posX < -20) {
      if (posY < game.DIM_Y/2) {
        return game.regenerateTopWall(pos);
      } else {
        return game.regenerateBottomWall(pos);
      }
    }
  };

})();
