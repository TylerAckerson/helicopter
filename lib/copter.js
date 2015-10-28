(function() {
  if (typeof Helicopter === "undefined") {
    window.Helicopter = {};
  }

  var Copter = window.Helicopter.Copter = function(params) {
    this.COLOR = "green";
    this.HEIGHT = 100;
    this.WIDTH = 100;

    // this.height = params.height;
    // this.width = params.width;
    // this.pos = params.pos;
    this.col = "#ADADAD";
    this.vel = 5;
    this.game = params.game;
  };

  Copter.prototype.draw = function(ctx) {
    var image = document.getElementById("copter-image");

    ctx.drawImage(
      image,
      200,
      200,
      // this.pos[0],
      // this.pos[1],
      75,
      50
    );

    ctx.fill();
  };

    // var isCollidedWith = function(otherMovingObject){};

  // Copter.prototype.move = function(){
  //   this.pos[0] -= this.vel;
  //   window.Helicopter.Game.wrap(this.pos);
  // };

}());
