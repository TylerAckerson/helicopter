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
    this.wallRate = 1;
    this.topBottomSpacing = 100;

    this.topWalls = [];
    this.bottomWalls = [];
    this.addWalls();

    this.score = 0;
    this.shouldDraw = true;
  };

  Game.prototype.addCopter = function(){
    copter = new window.Whirlybird.Copter({pos: [100, 100], game: this});
    this.copters.push(copter);

    return copter;
  };

  Game.prototype.addWalls = function(){
    wallsCount = Math.ceil(this.DIM_Y / 5);

    for (var i = 0; i < wallsCount; i ++) {
      topPos = [this.DIM_Y + (5 * i), this.wallOffset/4 - (this.DIM_X - 50)];
      this.topWalls.push(new window.Whirlybird.Wall(
        {pos: topPos,  game: this })
      );

      var bottomPos = topPos.slice();
      bottomPos[1] = topPos[1] + this.DIM_Y + this.topBottomSpacing;
      this.bottomWalls.push(new window.Whirlybird.Wall(
        {pos: bottomPos, game: this })
      );

      this.wallOffset += (this.wallRate * this.wallDirection);
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

  Game.prototype.regenerateWall = function(pos) {
    pos[0] = 770 + Whirlybird.Wall.WIDTH;

    if (pos[0] < 0) {
      //top wall
      //pos[1] stuff
    } else {
      //bottom wall
      //pos[1] stuff
    }
  };

  Game.prototype.draw = function(ctx) {
    if (this.shouldDraw){
      ctx.clearRect(0, 0, this.DIM_Y, this.DIM_X);
      this.allObjects().forEach(function(object) { object.draw(ctx); });
      this.updateScore(ctx);
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
    // this.wallOffset = 0;
    // this.wallRate = 2;
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

  Game.prototype.updateScore = function() {
    this.score += 1;
    var scoreDisplay = "Score: " + this.score;

    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(scoreDisplay, 20, this.DIM_X - 20);
  };

  Game.prototype.endGame = function(ctx){
    this.displayBackground(ctx);
    this.displayScore(ctx);
    this.displayButton(ctx);
  };

  Game.prototype.displayScore = function(ctx){
    this.shouldDraw = false;
    var scoreDisplay = "Score: " + this.score;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "darkred";
    ctx.fillText("GAME OVER", (this.DIM_Y/2), (this.DIM_X/2));
    ctx.fillText(scoreDisplay, (this.DIM_Y/2), ((this.DIM_X/2 + 30)));
  };

  Game.prototype.displayButton = function(ctx) {
    this.endGameButton = new window.Whirlybird.Box( {
      pos: [((this.DIM_Y/2) - 50), ((this.DIM_X/2) + 50)],
      game: this,
      text: "Play again?"
    });

    this.endGameButton.draw(ctx);
    canvasElement.addEventListener('click', this.createNewGame);
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
    e.target.removeEventListener('click', this.createNewGame);
    var button = game.endGameButton;
    var buttonX = button.pos[0];
    var buttonY = button.pos[1];

    var clickX = e.clientX - canvasElement.offsetLeft;
    var clickY = e.clientY - canvasElement.offsetTop;

    if ((clickX >= buttonX && clickX <= buttonX + game.endGameButton.width) &&
         (clickY >= buttonY && clickY <= buttonY + game.endGameButton.height)) {
           gameView.newGame();
     }
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
      game.regenerateWall(pos);
    }
  };

})();
