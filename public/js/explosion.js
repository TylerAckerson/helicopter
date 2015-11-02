(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Explosion = window.Whirlybird.Explosion = function(params) {
    this.height = 60;
    this.width = 60;

    this.pos = params.pos;
    this.game = params.game;

    this.sprite = new Whirlybird.Sprite({ imageId: 'explosion',
                                              pos: this.pos,
                                             size: [this.height, this.width],
                                           frames: [0, 1, 2, 3] } );

  };

  Explosion.prototype.draw = function(ctx) {
    this.sprite.update(this.pos);
    this.sprite.render(ctx);
  };

}());
