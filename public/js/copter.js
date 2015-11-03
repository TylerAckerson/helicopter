(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Copter = window.Whirlybird.Copter = function(params) {
    this.height = 45;
    this.width = 73;

    this.pos = params.pos;
    this.game = params.game;
    this.sprite = new Whirlybird.Sprite({ imageId:'copter-sprite',
                                          pos: this.pos,
                                         size: [this.height, this.width],
                                       frames: [0, 1, 2, 3] } );

    return this;
  };

  Copter.prototype.draw = function(ctx) {
    this.sprite.update(this.pos);
    this.sprite.render(ctx);
  };

  Copter.prototype.move = function() {
    this.pos[1] += 7;
  };

  Copter.prototype.lift = function() {
    this.pos[1] -= 13;
  };

}());
