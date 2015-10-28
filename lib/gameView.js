(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var GameView = window.Helicopter.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    setInterval(function(){
      this.game.moveObjects(this.ctx);
      this.game.draw(this.ctx);
    }.bind(this), 20);

    setInterval(function(){
      game.wallDirection *= -1;
    }.bind(this), 2000);
  };
})();
