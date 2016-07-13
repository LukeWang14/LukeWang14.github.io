var requestAnimationFrame;
if (window.requestAnimationFrame) requestAnimationFrame = window.requestAnimationFrame; 
else if (window.mozRequestAnimationFrame) requestAnimationFrame = window.mozRequestAnimationFrame;
else if (window.webkitRequestAnimationFrame) requestAnimationFrame = window.webkitRequestAnimationFrame;

var numOfLoadingImage = 0;
var gameLoaded = false;

var loadImage = function(imgSrc){
  numOfLoadingImage++;
  var im = document.createElement('img');
  im.src = imgSrc;
  im.onload = function () {
    numOfLoadingImage--;
    if (numOfLoadingImage == 0){
      gameLoaded();
    }
  }
  return im;
}

var loadMusic = function(musicName){
  var musics = {};
  var audio = document.createElement("audio");
  audio.src = musicName;
  audio.type = "audio/wav";
  musics.sound = audio;
  document.body.appendChild(audio);
  musics.play = function(){
    if (!soundOnOff.turnOn){
      return;
    }
    this.sound.play();
  }
  return musics;
}

var gameLoaded = function(){
  game.div.appendChild(gameLogo.img);
  game.div.appendChild(startButton.img);
  game.div.appendChild(gameOver.img);
  game.div.appendChild(tryAgain.img);
  game.div.appendChild(land.canvas);
  game.div.appendChild(soundOnOff.div);
  game.div.appendChild(score.div);
  game.div.appendChild(bullet.div);
  bullet.setNum(1);
  resize();
  gameLoaded = true;
  requestAnimationFrame(controller);
  controller();
 
  document.body.onmousedown = function(){
    flapOnce();
  }
 
  document.body.onkeydown = function(ev){
    if (ev.keyCode == 32) {
      flapOnce();
    }
  }
}
