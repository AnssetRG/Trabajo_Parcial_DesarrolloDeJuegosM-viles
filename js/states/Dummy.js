Dummy = function (game) {};

Dummy.prototype = {
  create: function () {
    this.background = this.add.tileSprite(
      0,
      0,
      this.game.width,
      this.game.height,
      "sea"
    );
    //this.background.moveAxis(0,100);
    this.background.autoScroll(0, 100);

    this.explosionSound = this.add.sound("explosion");
    this.shoowSound = this.add.sound("fire");

    //this.game.arcade.enable(Phaser.ARCADE);
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.add.sprite(0, 0, "player");
    this.player.animations.add("fly", [0, 1, 2], 20, true);
    this.player.animations.play("fly");

    //this.player.animations.attach('fly', [ 0, 1, 2 ], 20, true);
    //this.player.play("fly");

    this.player.anchor.setTo(0.5);
    this.player.x = this.game.world.centerX;
    this.player.y = this.game.world.centerY;

    this.player.movement = {
      left: false,
      right: false,
      down: false,
      up: false,
      shoot: false,
    };

    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.keys = this.input.keyboard.createCursorKeys();

    this.bullets = this.game.add.group();
    this.playerLifes = 4;
    this.powerups = this.game.add.group();
    this.score = 0;
    this.lifes = this.game.add.group();
    this.gameOver = false;
    this.enemies = this.game.add.group();

    this.hud();

    //this.createControls();

    this.style = {
      fill: "#FFF",
    };

    this.poweupInterval = 0;
    this.enemyInterval = 0;
    this.shootInterval = 0;
  },
  /*createControls:function(){
		this.shootBtn = this.add.icon(900,650,'shoot');
		this.shootBtn.inputEnable = true;
		
		this.shootBtn.event.onClick.addListener.add(function(){
			this.player.movement.shoot = true;
		},this);

		this.shootBtn.event.onClick.addListenerUp.add(function(){
			this.player.movement.shoot = false;
		},this);

		
		this.left = this.add.icon(30,650,'arrow');
		this.right = this.add.icon(170,650,'arrow');
		this.up = this.add.icon(100,600,'arrow');
		this.down = this.add.icon(100,700,'arrow');
		this.left.inputEnable = true;
		this.right.inputEnable = true;
		this.down.inputEnable = true;
		this.up.inputEnable = true;

		this.left.event.onClick.addListener.add(function(){
			this.player.movement.left = true;
		},this);

		this.right.event.onClick.addListener.add(function(){
			this.player.movement.right = true;	
		},this);
		this.down.event.onClick.addListener.add(function(){
			this.player.movement.down = true;	
		},this);

		this.up.event.onClick.addListener.add(function(){
			this.player.movement.up = true;
		},this);

		this.left.event.onClick.addListenerUp.add(function(){
			this.player.movement.left = false;
		},this);

		this.right.event.onClick.addListenerUp.add(function(){
			this.player.movement.right = false;	
		},this);
		this.down.event.onClick.addListenerUp.add(function(){
			this.player.movement.down = false;	
		},this);

		this.up.event.onClick.addListenerUp.add(function(){
			this.player.movement.up = false;
		},this);
	},*/
  hud: function () {
    this.scoreText = this.game.add.text(0, 0, "Score: " + this.score);
    this.scoreText.x = this.game.width - 400;
    this.scoreText.fill = "#000000";

    for (let i = 0; i < this.playerLifes; i++) {
      let life = this.game.add.sprite(0, 0, "player");
      life.scale.setTo(0.5);
      life.anchor.setTo(0.5);
      life.index = i;
      life.x = life.width * i + life.width / 2;
      life.y = life.height / 2;
      this.lifes.add(life);
    }
  },
  update: function () {
    //console.log(localStorage.points);
    if (this.gameOver) {
      return;
    }
    this.poweupInterval += this.game.time.elapsed;
    this.enemyInterval += this.game.time.elapsed;
    this.shootInterval += this.game.time.elapsed;

    if (this.poweupInterval >= 10000 && this.playerLifes < 4) {
      this.poweupInterval = 0;
      this.createPowerUp();
    }

    if (
      this.game.input.keyboard.isDown(Phaser.Keyboard.Z) &&
      //|| this.player.movement.shoot)
      this.shootInterval >= 300
    ) {
      this.shootInterval = 0;
      this.shoot();
    }
    if (this.enemyInterval >= 1000) {
      this.enemyInterval = 0;
      this.createEnemy();
    }

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    /*if(this.keys.left.isDown || this.player.movement.left){
			this.player.body.velocity.x = -300;
		}

		if(this.keys.right.isDown || this.player.movement.right){
			this.player.body.velocity.x = 300;
		}

		if(this.keys.up.isDown || this.player.movement.up){
			this.player.body.velocity.y = -300;
		}

		if(this.keys.down.isDown || this.player.movement.down){
			this.player.body.velocity.y = 300;
		}*/

    if (this.keys.left.isDown) {
      this.player.body.velocity.x = -300;
    }

    if (this.keys.right.isDown) {
      this.player.body.velocity.x = 300;
    }

    if (this.keys.up.isDown) {
      this.player.body.velocity.y = -300;
    }

    if (this.keys.down.isDown) {
      this.player.body.velocity.y = 300;
    }

    this.enemies.forEach(function (enemy) {
      if (enemy.y >= this.game.height) {
        enemy.kill();
      }
    }, this);

    this.powerups.forEach(function (powerup) {
      if (powerup.y >= this.game.height) {
        powerup.kill();
      }
    }, this);

    this.physics.arcade.overlap(
      this.player,
      this.enemies,
      this.reduceLife,
      null,
      this
    );

    this.physics.arcade.overlap(
      this.bullets,
      this.enemies,
      this.destroyEnemies,
      null,
      this
    );

    this.physics.arcade.overlap(
      this.player,
      this.powerups,
      this.gainLife,
      null,
      this
    );
  },

  gainLife: function (player, powerup) {
    powerup.kill();
    if (this.playerLifes < 4) {
      this.playerLifes++;
      let life = this.lifes.getFirstDead();
      life.reset(
        life.width * (4 - this.playerLifes) + life.width / 2,
        life.height / 2
      );
    }
  },
  createPowerUp: function () {
    let powerup = this.game.add.sprite(0, 0, "player");
    powerup.scale.setTo(0.5);
    powerup.anchor.setTo(0.5);
    powerup.y = -powerup.height / 2;
    powerup.x = this.game.rnd.integerInRange(
      powerup.width / 2,
      this.game.width - powerup.width / 2
    );
    this.physics.arcade.enable(powerup);
    this.powerups.add(powerup);
    powerup.body.velocity.y = 100;
  },
  reduceLife: function (player, enemy) {
    this.showExplosion(enemy);
    enemy.kill();
    let life = this.lifes.getFirstAlive();
    life.kill();
    this.playerLifes--;
    if (this.playerLifes == 0) {
      this.gameOver = true;
      this.showExplosion(this.player);
      this.player.kill();
      this.enemies.killAll();
      this.powerups.killAll();
      this.gameOverText = this.game.add.text(0, 0, "Game Over", this.style);
      this.gameOverText.anchor.setTo(0.5);
      this.gameOverText.x = this.game.world.centerX;
      this.gameOverText.y = this.game.world.centerY;

      //Local Storage Points
      if (localStorage.points != null) {
        let temp = localStorage.points;
        if (temp < this.score) {
          localStorage.points = parseInt(this.score);
        }
      } else {
        localStorage.points = parseInt(this.score);
      }

      this.gameOverText.inputEnabled = true;
      this.gameOverText.events.onInputDown.add(function () {
        this.game.state.start("Game");
      }, this);
    }
  },
  destroyEnemies: function (bullet, enemy) {
    this.showExplosion(enemy);
    let types = ["greenEnemy", "whiteEnemy", "boss"];
    if (enemy.key == "greenEnemy") {
      this.score += 10;
    }
    if (enemy.key == "whiteEnemy") {
      this.score += 20;
    }
    if (enemy.key == "boss") {
      this.score += 40;
    }
    //this.scoreText = "Score : "+this.score;
    this.scoreText.setText("Score: " + this.score);
    bullet.kill();
    enemy.kill();
  },
  showExplosion: function (sprite) {
    let explosion = this.game.add.sprite(sprite.x, sprite.y, "explosion");
    explosion.anchor.setTo(0.5);
    explosion.width = sprite.width;
    explosion.height = sprite.height;
    explosion.animations.add("boom");
    explosion.animations.play("boom", 7, false, true);
    this.explosionSound.play();
  },
  createEnemy: function () {
    let types = ["greenEnemy", "whiteEnemy", "boss"];
    let key = this.game.rnd.integerInRange(0, 2);
    let enemy = this.enemies.getFirstDead();
    if (enemy) {
      enemy.reset();
    } else {
      enemy = new Enemy(this.game, types[key]);
      this.enemies.add(enemy);
    }
  },
  shoot: function () {
    let bullet = this.bullets.getFirstDead();
    this.shoowSound.play();
    if (bullet) {
      bullet.reset(this.player.x, this.player.y);
    } else {
      bullet = this.game.add.sprite(this.player.x, this.player.y, "bullet");
      this.bullets.add(bullet);
    }
    bullet.scale.setTo(2);
    bullet.anchor.setTo(0.5);
    this.physics.arcade.enable(bullet);
    bullet.body.velocity.y = -200;
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
  },
};
