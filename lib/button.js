(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Button = window.Whirlybird.Button = function(options) {
    this.height = Button.HEIGHT;
    this.width = Button.WIDTH;
    this.pos = options.pos;
    this.game = options.game;
    this.text = options.text;

    return this;
  };

  Button.HEIGHT = 40;
  Button.WIDTH = 100;

  Button.prototype.drawButton = function(ctx) {
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.beginPath();
    ctx.rect(
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );

    ctx.fill();
  };

  Button.prototype.drawText = function(ctx) {
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.strokeText(this.text, this.pos[0] + 50, this.pos[1] + 25);
    ctx.stroke();
  };

  Button.prototype.draw = function(ctx) {
    this.drawButton(ctx);
    this.drawText(ctx);
  };


}());
