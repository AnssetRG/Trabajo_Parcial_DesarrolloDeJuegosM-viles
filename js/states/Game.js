Game = function (game) {};

Game.prototype = {
  init: function (current_video) {
    console.log(current_video);
    this.video = this.game.add.video(current_video);
  },
  create: function () {
    this.video.play(true);
    this.video.addToWord();
  },
};
