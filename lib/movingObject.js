(function () {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Mo = window.Helicopter.MovingObject = function(params) {
    this.height = params.height;
    this.pos = params.pos;
    this.col = "#ADADAD";
    this.vel = 10;
    this.game = params.game;
  };

  Mo.prototype.draw = function(ctx) {
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.rad,
      0,
      2 * Math.PI,
      false
  );

  ctx.fill();
};

var isCollidedWith = function(otherMovingObject){};

Mo.prototype.move = function(){
  this.pos += this.vel;
  // this.pos[1] += this.vel[1];
  window.Helicopter.Game.wrap(this.pos);
};

})();
