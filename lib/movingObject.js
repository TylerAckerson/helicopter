(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Mo = window.Helicopter.MovingObject = function(params) {
    this.height = params.height;
    this.width = params.width;
    this.pos = params.pos;
    this.col = "#ADADAD";
    this.vel = 5;
    this.game = params.game;
  };

  Mo.prototype.draw = function(ctx) {
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.rect(
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
  );

  ctx.fill();
};

var isCollidedWith = function(otherMovingObject){};

Mo.prototype.move = function(){
  this.pos[0] -= this.vel;
  window.Helicopter.Game.wrap(this.pos);
};

Mo.prototype.moveWall = function(){
  this.pos[0] -= this.vel;
  window.Helicopter.Game.wrapWall(this.pos);
};
})();
