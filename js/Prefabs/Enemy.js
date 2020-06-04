Enemy = function (game, sprite) {
  Phaser.Sprite.call(this, game, 0, 0, sprite);
  this.game = game;
  this.loadTexture(sprite);
  this.anchor.setTo(0.5);
  this.animations.add("fly", [0, 1, 2], 20, true);
  this.runSetUp();
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function () {
  Phaser.Sprite.prototype.reset.call(this, 0, 0);
  this.runSetUp();
};

Enemy.prototype.runSetUp = function () {
  this.game.physics.arcade.enable(this);
  this.body.velocity.y = 200;
  this.play("fly");
  this.x = this.game.rnd.integerInRange(
    this.width / 2,
    this.game.width - this.width / 2
  );
  this.y = -this.height / 2;
};
