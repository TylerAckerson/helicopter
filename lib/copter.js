(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Copter = window.Whirlybird.Copter = function(params) {
    this.HEIGHT = 50;
    this.WIDTH = 75;

    this.pos = params.pos;
    this.game = params.game;
  };

  Copter.prototype.draw = function(ctx) {
    var image = document.getElementById("copter-image");

    ctx.drawImage(
      image,
      this.pos[0],
      this.pos[1],
      this.WIDTH,
      this.HEIGHT
    );

    ctx.fill();
  };

  Copter.prototype.move = function() {
    this.pos[1] += 2;
  };

  Copter.prototype.lift = function() {
    this.pos[1] -= 4;
  };


    // var isCollidedWith = function(otherMovingObject){};

  // Copter.prototype.move = function(){
  //   this.pos[0] -= this.vel;
  //   window.Whirlybird.Game.wrap(this.pos);
  // };

}());
