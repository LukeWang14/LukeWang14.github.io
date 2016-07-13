var lastFlapTime = 0;

var flapOnce = function () {
 if (game.hasEnded) { 
    return false;
 }
 if (!game.hasStarted) {

    bullet.setNum(1);
    bullet.width = brickSize;
    bullet.reset();

    gameLogo.showing = false;
    gameLogo.hiding = true;
    startButton.showing = false;
    startButton.hiding = true;
    gameOver.showing = false;
    gameOver.hiding = true;
    tryAgain.showing = false;
    tryAgain.hiding = true;

    points = 0;
    score.update();

    for (var i = walls.length-1; i >= 0; i--) {
      for (var j = 0; j < walls[i].bricks.length; j++) {
        game.div.removeChild(walls[i].bricks[j].div);
      }
    }
    createWallTimer = 0;
    game.currentWallValue = 1;
    walls = [];

    game.hasStarted = true;
 };

  var nowTime = new Date().getTime();
  lastFlapTime = nowTime;
  bullet.y_speed = -10 + 4 * Math.min(1, (nowTime - lastFlapTime) / 600);
  bullet.destinationAngle = -0.4;
  flap.play();
}