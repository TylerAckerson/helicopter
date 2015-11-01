(function () {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Mo = window.Whirlybird.MovingObject = function(options) {
    this.height = options.height;
    this.width = options.width;
    this.pos = options.pos;
    this.col = options.col;
    this.vel = 5;
    this.game = options.game;
    this.idx = options.idx;
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
    var xDistLeft = this.pos[0] - (copter.pos[0] + copter.width);
    var xDistRight = copter.pos[0] - (this.pos[0] + this.width);

    var yDistTop, yDistBottom;
    if (this.pos[1] <= copter.pos[1]) {
      yDistTop = copter.pos[1] - (this.pos[1] + this.height);
    } else {
      yDistBottom = this.pos[1] - (copter.pos[1] + copter.height);
    }

    // collision detected
    if (( xDistLeft <= -2 && xDistRight <= -2 ) &&
       (  yDistTop <= -2 || yDistBottom <= -2 ))  {

      gameView.end();
    }
  };

  Mo.prototype.move = function(){
    this.pos[0] -= this.vel;
    window.Whirlybird.Game.wrap(this.pos);
  };

  Mo.prototype.moveWall = function(){
    this.pos[0] -= this.vel;
    window.Whirlybird.Game.wrapWall(this.pos, this.idx);
  };
})();
