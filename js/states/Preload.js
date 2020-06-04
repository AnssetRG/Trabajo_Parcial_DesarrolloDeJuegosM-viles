Preload = function (game) {};

Preload.prototype = {
  preload: function () {
    /*this.load.image("titlepage", "assets/titlepage.png");

    this.load.audio("explosion", "assets/explosion.ogg");
    this.load.audio("fire", "assets/enemy-fire.ogg");*/

    this.load.image("boton1", "assets/Images/Video1.png");
    this.load.image("boton2", "assets/Images/Video2.png");
    this.load.video("video1", "assets/Videos/Video1.mp4");
    this.load.video("video2", "assets/Videos/Video2.mp4");
    console.log("CARGO assets PRELOAD");
  },
  create: function () {
    this.state.start("Menu");
  },
};
