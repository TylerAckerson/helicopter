(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Box = window.Whirlybird.Box = function(options) {
    this.height = options.height || Box.HEIGHT;
    this.width = options.width || Box.WIDTH;
    this.pos = options.pos;
    this.game = options.game;
    this.col = options.col || Box.COL;
    this.textXOffset = options.textXOffset || Box.TEXT_X_OFFSET;
    this.textYOffset = options.textYOffset || Box.TEXT_Y_OFFSET;
    this.text = options.text || "";
    this.textSize = options.textSize || Box.TEXT_SIZE;

    return this;
  };

  Box.HEIGHT = 40;
  Box.WIDTH = 100;
  Box.COL = "steelblue";
  Box.TEXT_X_OFFSET = 50;
  Box.TEXT_Y_OFFSET = 25;
  Box.TEXT_SIZE = 15;

  Box.prototype.drawBox = function(ctx) {
    ctx.fillStyle = this.col;
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

  Box.prototype.drawText = function(ctx) {
    ctx.font = this.textSize + "px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.strokeText(this.text, this.pos[0] + this.textXOffset, this.pos[1] + this.textYOffset);
    ctx.stroke();
  };

  Box.prototype.draw = function(ctx) {
    this.drawBox(ctx);
    this.drawText(ctx);
  };


}());
