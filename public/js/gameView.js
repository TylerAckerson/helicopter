(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var GameView = window.Whirlybird.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.highScore = 0;
    this.copter = this.game.addCopter();

    this.game.drawStart(ctx);
  };

  GameView.prototype.addInterval = function(){
    boundCopter = this.copter.lift.bind(this.copter);
    window.mouseInterval = setInterval(boundCopter, 20);
  };

  GameView.prototype.clearInterval = function(){
    clearInterval(window.mouseInterval);
  };

  GameView.prototype.start = function() {
    window.addEventListener('mousedown', this.addInterval);
    window.addEventListener('mouseup', this.clearInterval);

    this.gameInterval = setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);

    this.wallInterval = setInterval(function(){
      game.changeWallVectors();
    }, 2000);
  };

  GameView.prototype.end = function(){
    this.updateHighScore();

    window.removeEventListener('mousedown', this.addInterval);
    window.removeEventListener('mouseup', this.clearInterval);
    clearInterval(this.gameInterval);
    this.gameInterval = null;
    clearInterval(this.mouseInterval);
    clearInterval(this.wallInterval);

    game.shouldDraw = false;
    this.game.endGame(this.ctx);
  };

  GameView.prototype.newGame = function(){
    console.log(this.gameInterval);
    if (!this.gameInterval){
      this.game = new Whirlybird.Game();
      this.ctx.clearRect(0, 0, game.DIM_Y, game.DIM_X);
      this.copter = this.game.addCopter();
      this.game.draw(this.ctx);
      this.start();
    }
  };

  GameView.prototype.updateHighScore = function(){
    if (this.game.distance > this.highScore){
      this.highScore = this.game.distance;
    }
  };

})();
