(function() {
  if (typeof Whirlybird === "undefined") {
    window.Whirlybird = {};
  }

  var Wall = window.Whirlybird.Wall = function(params) {
    this.COLOR = "green";
    this.HEIGHT = 500;
    this.WIDTH = 5;

  window.Whirlybird.MovingObject.call(this, { col: this.COLOR,
                                              height: this.HEIGHT,
                                              width: this.WIDTH,
                                              pos: params.pos } );

  };

  window.Whirlybird.Util.inherits(Wall, window.Whirlybird.MovingObject);
}());
