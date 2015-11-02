(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Sprite = window.Whirlybird.Sprite = function(options) {
    this.imageId = options.imageId;
    this.pos = options.pos;
    this.size = options.size;
    this.frames = options.frames;
    this.speed = 1;
    this._index = 0;
  };

  Sprite.prototype.update = function(pos) {
    this.pos = pos;
  };

  Sprite.prototype.render = function(ctx) {
    var max = this.frames.length;
    var idx = this._index;
    var frame = this.frames[idx % max];

    var offsetY = 0;
    var offsetX = frame * this.size[1];
    var posX = this.pos[0];
    var posY = this.pos[1];

    image = document.getElementById(this.imageId);
    ctx.drawImage( image,
                   offsetX, offsetY,
                   this.size[1], this.size[0],
                   posX, posY,
                   this.size[1], this.size[0]
                  );

    this._index += this.speed;
  };

}());
