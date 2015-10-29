(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Copter = window.Whirlybird.Copter = function(params) {
    this.height = 50;
    this.width = 75;

    this.pos = params.pos;
    this.game = params.game;
  };

  Copter.prototype.draw = function(ctx) {
    var image = document.getElementById("copter-image");

    ctx.drawImage(
      image,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );

    ctx.fill();
  };

  Copter.prototype.move = function() {
    this.pos[1] += 4;
  };

  Copter.prototype.lift = function() {
    this.pos[1] -= 8;
  };

  Copter.prototype.collideWith = function(object) {
   if (otherObject instanceof Whirlybird.movingObject) {
     debugger;
   }
  };

}());
