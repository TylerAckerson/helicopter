(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Explosion = window.Whirlybird.Explosion = function(params) {
    this.height = 120;
    this.width = 120;

    this.pos = params.pos;
    this.game = params.game;

    this.sprite = new Whirlybird.Sprite({ imageId: 'explosion',
                                              pos: this.pos,
                                             size: [this.height, this.width],
                                           frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] } );

  };

  Explosion.prototype.draw = function(ctx) {
    this.sprite.render(ctx);

    var i = 0;
    var animate = function() {
      if (i < 15) {

        ctx.clearRect(0, 0, game.DIM_Y, game.DIM_X);
        this.game.allNonCopterObjects().forEach(function(object) {
          object.draw(ctx);
        });

        this.sprite.update(this.pos);
        this.sprite.render(ctx);
        i++;
      }
    };

    setInterval(animate.bind(this), 20);
  };

}());
