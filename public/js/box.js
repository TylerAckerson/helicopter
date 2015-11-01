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
    this.textOffset = options.textOffset || Box.TEXT_OFFSET;
    this.text = options.text || "";

    return this;
  };

  Box.HEIGHT = 40;
  Box.WIDTH = 100;
  Box.COL = "steelblue";
  Box.TEXT_OFFSET = 50;

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
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.strokeText(this.text, this.pos[0] + this.textOffset, this.pos[1] + 25);
    ctx.stroke();
  };

  Box.prototype.draw = function(ctx) {
    this.drawBox(ctx);
    this.drawText(ctx);
  };


}());
