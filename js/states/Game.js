Game = function (game) {};

Game.prototype = {
  init: function (current_video) {
    this.video = this.game.add.video(current_video.attachedVideo);
  },
  create: function () {

  	this.speedDowner = 0;
  	this.speedUpper = 0;
  	this.canSpeedUp = true;

    this.video.play();
    this.video.playbackRate = 0;
    this.video.volume = 0;
    this.video.addToWorld();

    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceBar.onDown.add(this.SpeedUP,this);
    this.game.input.onDown.add(this.SpeedUP,this);

    this.video.onComplete.add(this.goMenu,this);
  },
  SpeedUP:function(){
  	if(this.video.playbackRate < 2 && this.canSpeedUp == true){
  		this.canSpeedUp = false;
  		this.video.playbackRate += 0.1;
  	}
  },

  update:function(){
  	this.speedDowner += this.time.elapsed;
  	if(this.speedDowner >= 300){
  		if(this.video.playbackRate > 0.11){   //A veces le da céntimos y sale error, por eso le pongo un threshold un poco mayor
  			this.video.playbackRate  -= 0.1;
  		}
  		else{
  			this.video.playbackRate = 0;
  		}
  		this.speedDowner = 0;
  	}
  	if(this.canSpeedUp == false){
  		this.speedUpper += this.time.elapsed;
  	}
  	if(this.speedUpper >= 100){
  		this.canSpeedUp = true;
  		this.speedUpper = 0;
  	}
  },

  goMenu:function(){
  	this.state.start("Menu");
  }
};