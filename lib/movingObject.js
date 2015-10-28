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

  Mo.prototype.collideWith = function (copter) {
     debugger;
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

  Mo.prototype.isCollidedWith = function(copter) {
    var xDist = this.pos[0] - (copter.pos[0] + copter.width);

    var yDistTop, yDistBottom;
    if (this.pos[1] <= copter.pos[1]) {
      yDistTop = copter.pos[1] - (this.pos[1] + this.height);
    } else {
      yDistBottom = this.pos[1] - (copter.pos[1] + copter.height);
    }

    if (xDist <= -2 && (yDistTop <= -2 || yDistBottom <= -2) )  {
      this.collideWith(copter);
    }
  };

  Mo.prototype.move = function(){
    this.pos[0] -= this.vel;
    window.Whirlybird.Game.wrap(this.pos);
  };

  Mo.prototype.moveWall = function(){
    this.pos[0] -= this.vel;
    window.Whirlybird.Game.wrapWall(this.pos);
  };
})();
