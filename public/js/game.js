(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Game = window.Whirlybird.Game = function() {
    this.DIM_X = window.canvasElement.height;
    this.DIM_Y = window.canvasElement.width;
    this.NUM_BLOCKS = 3;
    this.BLOCK_SPACING = 500;

    this.copters = [];

    this.blocks = [];
    this.addBlocks();

    this.wallOffset = 0;
    this.wallDirection = 1;
    this.wallRate = 0;
    this.topBottomSpacing = 100;

    this.topWalls = [];
    this.bottomWalls = [];
    this.addWalls();

    this.distance = 0;
    this.shouldDraw = true;
  };

  Game.prototype.addCopter = function(){
    copter = new window.Whirlybird.Copter({pos: [100, 100], game: this});
    this.copters.push(copter);
  };

  Game.prototype.addWalls = function(){
    wallsCount = Math.ceil(this.DIM_Y / 5);

    for (var i = 0; i < wallsCount; i ++) {
      topPos = [this.DIM_Y + (5 * i), this.wallOffset/4 - (this.DIM_X - 50)];
      this.topWalls.push(new window.Whirlybird.Wall(
        {pos: topPos,  game: this, idx: i })
      );

      var bottomPos = topPos.slice();
      bottomPos[1] = topPos[1] + this.DIM_Y + this.topBottomSpacing;
      this.bottomWalls.push(new window.Whirlybird.Wall(
        {pos: bottomPos, game: this, idx: i })
      );

      this.wallOffset += this.wallDirection;
    }
  };

  Game.prototype.addBlocks = function() {
    for(var i = 0; i < this.NUM_BLOCKS; i++) {
      var blockPos = Util.BlockPos(i, this.DIM_Y, this.DIM_X);

      this.blocks.push( new window.Whirlybird.Block(
         {pos: blockPos, game: this } ));
    }
  };

  Game.prototype.allObjects = function () {
   return [].concat(this.copters, this.topWalls, this.bottomWalls, this.blocks);
  };

  Game.prototype.allNonCopterObjects = function () {
   return [].concat(this.topWalls, this.bottomWalls, this.blocks);
  };

  Game.prototype.regenerateBlock = function(blockPos) {
    var newY = Util.RandomY(this.DIM_X);
    blockPos[0] = 1500;
    blockPos[1] = newY;
  };

  Game.prototype.regenerateWall = function(pos, idx) {
    pos[0] = 770 + Whirlybird.Wall.WIDTH;

    neighborWallIdx = idx - 1;
    if (neighborWallIdx < 0) { neighborWallIdx = game.topWalls.length - 1; }

    if (pos[1] < 0) {
      //top wall
      neighborY = game.topWalls[neighborWallIdx].pos[1];
      pos[1] = neighborY - (neighborY * game.wallRate);
    } else {
      //bottom wall
      neighborY = game.bottomWalls[neighborWallIdx].pos[1];
      pos[1] = neighborY - (neighborY * game.wallRate);
    }
  };

  Game.prototype.draw = function(ctx) {
    if (this.shouldDraw){
      ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
      this.allObjects().forEach(function(object) { object.draw(ctx); });
      this.updateDistance(ctx);
    }
  };

  Game.prototype.moveObjects = function(ctx) {
    this.blocks.forEach(function(block) { block.move(); } );
    this.topWalls.forEach(function(wall) { wall.moveWall(); } );
    this.bottomWalls.forEach(function(wall) { wall.moveWall(); } );
    this.copters.forEach(function(copter) { copter.move(); } );
  };

  Game.prototype.changeWallVectors = function(){
    this.wallDirection *= -1;
    this.wallRate += 0.001;
  };

  Game.prototype.checkCollisions = function() {
  var game = this;

  this.allNonCopterObjects().forEach(function (obj1) {
    game.copters.forEach(function (copter) {
      if (obj1.isCollidedWith(copter)) {
          obj1.collideWith(copter);
        }
      });
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.updateDistance = function(ctx) {
    this.distance += 1;
    var distanceDisplay = "Distance: " + this.distance;
    var bestDisplay = "Best: " + gameView.highScore;

    ctx.font = "20px Fantasy";
    ctx.textAlign = "left";
    ctx.fillStyle = "red";
    ctx.fillText(distanceDisplay, 20, this.DIM_X - 20);
    ctx.fillText(bestDisplay, this.DIM_Y - 110, this.DIM_X - 20);
  };

  Game.prototype.animateExplosions = function(ctx){
    copterPos = this.copters[0].pos;
    copterPos[0] -= 15;
    copterPos[1] -= 45;

    explosions = [];

    explosions.push(new Whirlybird.Explosion(
      { pos: copterPos,
        game: this } ));

    explosions.push(new Whirlybird.Explosion(
      { pos: [copterPos[0] + 25, copterPos[1] - 15],
        game: this } ));

    explosions.push(new Whirlybird.Explosion(
      { pos: [copterPos[0] - 20, copterPos[1] + 10],
        game: this } ));

    explosions.forEach(function(explosion) {
        explosion.draw(ctx);
    });
  };

  Game.prototype.endGame = function(ctx){
    this.animateExplosions(ctx);

    setTimeout(function(){
      this.displayDistance(ctx);
      this.displayButton(ctx);
    }.bind(this), 1250);

  };

  Game.prototype.displayDistance = function(ctx){
    this.shouldDraw = false;
    var distanceDisplay = "Distance: " + this.distance;

    ctx.font = "28px Fantasy";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over.", this.DIM_Y/2, this.DIM_X/2 - 50);
    ctx.fillText(distanceDisplay, this.DIM_Y/2, this.DIM_X/2 - 15);
    ctx.fill();
  };

  Game.prototype.displayButton = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillText("Click anywhere to play again.", this.DIM_Y/2, this.DIM_X/2 + 55);
    ctx.fill();

    canvasElement.addEventListener('mousedown',this.createNewGame);
  };

  Game.prototype.displayStart = function(ctx) {
    ctx.font = "28px Fantasy";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Click and hold left mouse button to go up.",
                                      this.DIM_Y/2, this.DIM_X/2 - 50);
    ctx.fillText("Release to go down.", this.DIM_Y/2, this.DIM_X/2 - 15);
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.fillText("Click anywhere to start game.", this.DIM_Y/2, this.DIM_X/2 + 55);
    ctx.fill();

    canvasElement.addEventListener('mousedown', this.createNewGame);
  };

  Game.prototype.displayBackground = function(ctx) {
    var background = document.getElementById("background-image");

    ctx.drawImage(
      background,
      this.DIM_Y/2 - 100,
      this.DIM_X/2 - 45,
      200,
      150
    );

    ctx.fill();
  };

  Game.prototype.createNewGame = function(e){
    e.target.removeEventListener('mousedown', this.createNewGame);
    gameView.newGame();
  };

  Game.wrap = function(pos) {
    var posX = pos[0];

    if (posX < 1) {
      return game.regenerateBlock(pos);
    }
  };

  Game.wrapWall = function(pos, idx) {
    var posX = pos[0];
    var posY = pos[1];

    if (posX < -20) {
      game.regenerateWall(pos, idx);
    }
  };

})();
