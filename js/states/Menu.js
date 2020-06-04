Menu = function (game) {
  console.log("CARGO MENU");
};

Menu.prototype = {
  create: function () {
    /*this.background = this.game.add.sprite(0, 0, "titlepage");
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.goGame, this);
    console.log("CARGO prototype MENU");*/

    this.game.stage.backgroundColor = "#FFFFFF";

    this.button1 = this.add.sprite(0, 0, "boton1");
    this.button1.anchor.setTo(0.5);
    this.button1.x = this.game.width * 0.25;
    this.button1.y = this.game.height / 2;
    this.button1.inputEnabled = true;
    this.button1.events.onInputDown.add(this.goGame, this, 0, "video1");

    this.textVideo1 = this.game.add.text(0, 0, "Cargar Primer Video");
    this.textVideo1.x = this.game.width * 0.1;
    this.textVideo1.y = this.game.height / 2 + this.button1.height * 0.6;
    this.textVideo1.fill = "#000000";
    this.textVideo1.inputEnabled = true;
    this.textVideo1.events.onInputDown.add(this.goGame, this, 0, "video1");

    this.button2 = this.add.sprite(0, 0, "boton2");
    this.button2.anchor.setTo(0.5);
    this.button2.x = this.game.width * 0.75;
    this.button2.y = this.game.height / 2;
    this.button2.inputEnabled = true;
    this.button2.events.onInputDown.add(this.goGame, this, 0, "video2");

    this.textVideo2 = this.game.add.text(0, 0, "Cargar Segundo Video");
    this.textVideo2.x = this.game.width * 0.6;
    this.textVideo2.y = this.game.height / 2 + this.button2.height * 0.6;
    this.textVideo2.fill = "#000000";
    this.textVideo2.inputEnabled = true;
    this.textVideo2.events.onInputDown.add(this.goGame, this, 0, "video2");
  },
  goGame: function (video_name) {
    this.state.start("Game", true, false, video_name);
  },
};
