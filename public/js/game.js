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

    this.distance = 0;
    this.shouldDraw = true;
  };

  Game.prototype.addCopter = function(){
    copter = new window.Whirlybird.Copter({pos: [100, 100], game: this});
    this.copters.push(copter);
  };

  Game.prototype.drawStart = function(){
    this.displayBackground(ctx);
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

  Game.prototype.regenerateWall = function(pos, idx) {
    pos[0] = 770 + Whirlybird.Wall.WIDTH;

    if (pos[1] < 0) {
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

  Game.prototype.animateExplosion = function(ctx){
    copterPos = this.copters[0].pos;
    copterPos[0] += 90;

    var explosion = new Whirlybird.Explosion(
      { pos: copterPos,
        game: this } );

    explosion.draw(ctx);
  };

  Game.prototype.endGame = function(ctx){
    this.animateExplosion(ctx);

    this.displayBackground(ctx);
    this.displayDistance(ctx);
    this.displayButton(ctx);
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
      text: "Play again?"
    });

    this.startGameButton.draw(ctx);
    canvasElement.addEventListener('click',this.createNewGame);
  };

  Game.prototype.displayStartButton = function(ctx) {
    this.startGameButton = new window.Whirlybird.Box( {
      pos: [((this.DIM_Y/2) - 50), ((this.DIM_X/2) + 50)],
      game: this,
      width: 100,
      text: "Start Game"
    });

    this.startGameButton.draw(ctx);
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
