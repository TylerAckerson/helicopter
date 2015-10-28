(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Mo = window.Whirlybird.MovingObject = function(params) {
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
    window.Whirlybird.Game.wrap(this.pos);
  };

  Mo.prototype.moveWall = function(){
    this.pos[0] -= this.vel;
    window.Whirlybird.Game.wrapWall(this.pos);
  };
})();
