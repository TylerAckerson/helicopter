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

  Mo.prototype.collideWith = function (otherObject) {
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

  Mo.prototype.isCollidedWith = function(otherObject) {
    var xDist = (otherObject.pos[0] + otherObject.width) - this.pos[0];

    var yDistBottom = Math.abs((otherObject.pos[1] + otherObject.height) - this.pos[1]);
    var yDistTop = Math.abs((otherObject.pos[1] - (this.pos[1] + this.height)));

    // var xDist = Whirlybird.Util.dist(this.pos[0], otherObject.pos[0]);
    // var yDIst = Whirlybird.Util.dist(this.pos[1], otherObject.pos[1]);
    if (xDist >= 0 && (yDistTop <= 0 || yDistBottom <= 0) )  {
       debugger;
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
