(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var GameView = window.Whirlybird.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.copter = this.game.addCopter();
  };

  GameView.prototype.start = function() {
    var mouseInterval;
    window.addEventListener('mousedown', function(){
      boundCopter = this.copter.lift.bind(this.copter);
      mouseInterval = setInterval(boundCopter, 20);
    }.bind(this));

    window.addEventListener('mouseup', function(){
      clearInterval(mouseInterval);
    });

    this.gameInterval = setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);


    setInterval(function(){
      game.changeWallVectors();
    }, 2000);
  };

  GameView.prototype.end = function(){
    clearInterval(this.gameInterval);
    setTimeout(gameView.game.displayScore.bind(this, this.ctx), 20);

    //display score
    //display option to play again
    //start game from here
  };
})();
