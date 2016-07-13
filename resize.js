gameLogo.reset = function () {
  gameLogo.img.style.left = width / 2 - 310 + 'px';
  gameLogo.img.style.top = height / 2 - 180 + 'px';
}

startButton.reset = function () {
  startButton.img.style.left = width / 2 - 150 + 'px';
  startButton.img.style.top = height / 2 + 110 + 'px';
}

gameOver.reset = function () {
  gameOver.img.style.left = width / 2 - 330 + 'px';
  gameOver.img.style.top = height / 2 - 180 + 'px';
}

tryAgain.reset = function () {
  tryAgain.img.style.left = width / 2 - 150 + 'px';
  tryAgain.img.style.top = height / 2 + 120 + 'px';
}

soundOnOff.reset = function () {
  soundOnOff.div.style.right = '4px';
  soundOnOff.div.style.top = height - 60 +'px';
}

land.reset = function(){
  land.x = 0;
  land.canvas.width = width + 96;
  land.canvas.height = 48;
  land.draw.fillRect(0, 0, width + 96, 48);
  for(var currentX = 0; currentX <= (width + 96); currentX += 48){
    land.draw.drawImage(land.unit, currentX, 0);
  }
  land.canvas.style.left = '0px';
  land.canvas.style.bottom = '0px';
}

score.reset = function(){
  score.div.style.left = width / 2 - 75 +'px';
  score.div.style.top = '15px';
}

var resize = function () {
  width = window.innerWidth;
  height = window.innerHeight;
 
  game.div.style.width = width + 'px';
  game.div.style.height = height + 'px';

  land.reset();
  gameLogo.reset();
  gameOver.reset();
  startButton.reset();
  soundOnOff.reset();
  tryAgain.reset();
  score.reset();
}

window.onresize = function () {
  resize();
}