window.onload = function () {
  let game = new Phaser.Game(800, 600, Phaser.AUTO);
  //Agregamos nombre del diccionario y su calse respectiva
  game.state.add("Preload", Preload);
  game.state.add("Menu", Menu);
  game.state.add("Game", Game);
  game.state.start("Preload");
};
