(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Mo = window.Helicopter.MovingObject = function(params) {
    this.height = params.height;
    this.pos = params.pos;
    this.col = "#ADADAD";
    this.vel = 2;
    this.game = params.game;
  };

  Mo.prototype.draw = function(ctx) {
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.rect(
      this.pos[0],
      this.pos[1],
      this.height,
      50
  );

  ctx.fill();
};

var isCollidedWith = function(otherMovingObject){};

Mo.prototype.move = function(){
  this.pos[0] -= this.vel;
  window.Helicopter.Game.wrap(this.pos);
};

})();
