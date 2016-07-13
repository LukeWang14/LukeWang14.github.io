var brickSize = 86;
var width = 768;
var height = 920;
var wallCreatorTimeInterval = 120;
var screenSpeed = 6;

var game = {};
game.hasEnded = false;
game.hasStarted = false;
game.div = document.createElement('div');
game.div.style.width = '100%';
game.div.style.height = '100%';
game.div.style.overflow = 'hidden';
game.div.style.position = 'relative';
document.body.appendChild(game.div);

var gameLogo = {};
gameLogo.opc = -0.2;
gameLogo.showing = true;
gameLogo.hiding = false;
gameLogo.img = loadImage('image/gameLogo.png'); 
gameLogo.img.style.position = 'absolute';
gameLogo.img.style.opacity = 0;
gameLogo.img.style.zIndex = 4;

var startButton = {};
startButton.opc = -0.4;
startButton.showing = true;
startButton.hiding = false;
startButton.img = loadImage('image/clicktostart.png'); // 337 x 75
startButton.img.style.position = 'absolute';
startButton.img.style.opacity = 0;
startButton.img.style.zIndex = 6;


var gameOver = {};
gameOver.opc = -0.2;
gameOver.showing = false;
gameOver.hiding = true;
gameOver.img = loadImage('image/gameOver.png'); 
gameOver.img.style.position = 'absolute';
gameOver.img.style.opacity = 0;
gameOver.img.style.zIndex = 5;


var tryAgain = {}; 
tryAgain.opc = -0.2;
tryAgain.showing = false;
tryAgain.hiding = true;
tryAgain.img = loadImage('image/tryAgain.png');
tryAgain.img.style.position = 'absolute';
tryAgain.respondToClick = false;
tryAgain.img.style.display = 'none';
tryAgain.img.style.cursor = 'pointer';
tryAgain.img.style.opacity = 0;
tryAgain.img.style.zIndex = 9;
tryAgain.img.onclick = function () {
  game.hasEnded = false;
  flapOnce();
}

var soundOnOff = {};
soundOnOff.showing = true;
soundOnOff.hiding = false;
soundOnOff.turnOn = true;
soundOnOff.div = document.createElement('div');
soundOnOff.div.style.backgroundImage = 'url("image/soundonoff.jpg")';
soundOnOff.div.style.position = 'absolute';
soundOnOff.div.style.width = '56px';
soundOnOff.div.style.height = '56px';
soundOnOff.div.style.zIndex = 8;
soundOnOff.div.onclick = function () {
  if (soundOnOff.turnOn) {
    soundOnOff.turnOn = false;
    soundOnOff.div.style.backgroundPosition = '-56px 0px';
  } else {
    soundOnOff.turnOn = true;
    soundOnOff.div.style.backgroundPosition = '0px 0px';
  }
}

var land = {};
land.canvas = document.createElement('canvas');
land.canvas.style.position = 'absolute';
land.canvas.style.zIndex = 3;
land.draw = land.canvas.getContext('2d');
land.unit = loadImage('image/ground.jpg');

var deathAnimation = document.createElement('div');
deathAnimation.style.background = 'red';
deathAnimation.style.position = 'relative';
deathAnimation.style.width = '100%';
deathAnimation.style.height = '100%';
deathAnimation.style.display = 'none';
deathAnimation.style.zIndex = 10;
game.div.appendChild(deathAnimation);

var flap = loadMusic('music/flap.wav');
var through = loadMusic('music/through.wav');
var fail = loadMusic('music/fail.wav');

var points = 0;
var score = {};
score.div = document.createElement('div');
score.div.style.width = '150px';
score.div.style.height = '60px';
score.div.style.position = 'absolute';
score.div.style.textAlign = 'center';
score.div.style.color = 'white';
score.div.style.fontFamily = 'Times New Roman';
score.div.style.fontSize = '60px';
score.div.style.fontWeight = 'bold';
score.div.style.zIndex = 7;
score.div.innerHTML = 'score';
score.update = function(){
  score.div.innerHTML = points;
}


var bullet = newBrick();
bullet.reset = function () {
  this.div.style.zIndex = 2;
  this.x = 200;
  this.y = 200;
  this.y_acceleration = 0;
}
bullet.reset();
bullet.updatePosition();
