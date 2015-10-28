(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var GameView = window.Helicopter.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.copter = this.game.addCopter();
  };

  GameView.prototype.start = function(canvas) {
    var mouseInterval;
    window.addEventListener('mousedown', function(){
      boundCopter = this.copter.lift.bind(this.copter);
      mouseInterval = setInterval(boundCopter, 20);
    }.bind(this));

    window.addEventListener('mouseup', function(){
      clearInterval(mouseInterval);
    });

    setInterval(function(){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);

    setInterval(function(){
      game.changeWallVectors();
    }, 2000);
  };
})();
