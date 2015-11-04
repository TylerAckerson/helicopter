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

  Game.prototype.drawStart = function(){
    this.displayStartButton(ctx);
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

  Game.prototype.updateDistance = function() {
    this.distance += 1;
    var distanceDisplay = "Distance: " + this.distance;
    var bestDisplay = "Best: " + gameView.highScore;

    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
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
      this.displayBackground(ctx);
      this.displayDistance(ctx);
      this.displayButton(ctx);
    }.bind(this), 500);
  };

  Game.prototype.displayDistance = function(ctx){
    this.shouldDraw = false;
    var distanceDisplay = "Distance: " + this.distance;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", (this.DIM_Y/2), (this.DIM_X/2));
    ctx.fillText(distanceDisplay, (this.DIM_Y/2), ((this.DIM_X/2 + 30)));
  };

  Game.prototype.displayButton = function(ctx) {
    this.startGameButton = new window.Whirlybird.Box( {
      pos: [((this.DIM_Y/2) - 50), ((this.DIM_X/2) + 50)],
      game: this,
      col: "red",
      text: "Play again?"
    });

    this.startGameButton.draw(ctx);
    canvasElement.addEventListener('mousedown',this.createNewGame);
  };

  Game.prototype.displayStartButton = function(ctx) {
    this.startGameButton = new window.Whirlybird.Box( {
      pos: [((this.DIM_Y/2) - 50), ((this.DIM_X/2) + 50)],
      game: this,
      col: "red",
      width: 100,
      text: "Start Game"
    });

    this.startGameButton.draw(ctx);
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
    var button = game.startGameButton;
    var buttonX = button.pos[0];
    var buttonY = button.pos[1];

    var clickX = e.clientX - canvasElement.offsetLeft - 4;
    var clickY = e.clientY - canvasElement.offsetTop - 6;

    if ((clickX >= buttonX && clickX <= buttonX + game.startGameButton.width) &&
         (clickY >= buttonY && clickY <= buttonY + game.startGameButton.height)) {
           gameView.newGame();
     }
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
