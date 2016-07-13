var justScored = false;
var justScoredBrick = null;

var createWallTimer = 0;
var globalTimer = 0;

var controller = function(){
  if (gameLoaded){
  
    var realTimer = new Date().getTime();
    var timerSlow = 0;
  
    while(globalTimer < realTimer){
      globalTimer = globalTimer + 21;
      timerSlow++;
      if (timerSlow > 10){ 
        globalTimer = realTimer;
        break;
      }

      transitionAnimations();

      if (game.hasStarted){

        //地面的向前运动动画
        land.x = (land.x - screenSpeed) % 48;
        if(land.x > 0){
          land.x = land.x - 48;
        }
        land.canvas.style.left = land.x + 'px';

        //定期产生新墙
        createWallTimer++;
        createWallTimer = createWallTimer % wallCreatorTimeInterval;
        if(createWallTimer == 3){ 
          var wall = newWall(game.currentWallValue);
          //wallCreatorTimeInterval = wallCreatorTimeInterval - 3;
          game.currentWallValue++;
        }

        //画每一面墙上的砖块
        for(var i = walls.length - 1; i >= 0; i--){
          var wall = walls[i];
          wall.x = wall.x + wall.x_speed;
          var wallHeight = wall.bricks.length * (brickSize + 14);
          for(var j = 0;  j < wall.bricks.length; j++){
            wall.bricks[j].x = wall.x;
            wall.bricks[j].x_speed = wall.x_speed;
            wall.bricks[j].y = height - 84 - (wall.bricks[j].distanceToground + wallHeight + 
              (wall.x - bullet.x - brickSize - 14) * wall.verticalSpeed * wall.verticalDirection) % wallHeight;
            wall.bricks[j].updatePosition();
          }
          if((wall.x + wall.width) < 0){
            wall.delete();
            break;
          }
        }

    
        for(var i = walls.length-1; i >= 0; i--){
          var wall = walls[i];

          if (!wall.passed){
            var destValue = wall.value;
            var isColliding = false;
            var bricks = wall.bricks;

            //选出碰撞砖块
            if(!isColliding){
              if (Math.abs(bullet.x - wall.x) < (wall.width + 12)){
                var dyMin = 9999;
                for(var j = 0; j < bricks.length; j++){
                  var dy = Math.abs(bullet.y - bricks[j].y);
                  if(dy < dyMin){
                    dyMin = dy;
                    wall.collideBrick = bricks[j];
                    isColliding = true;
                  }
                } 
              }
            }

            //碰撞时
            if (wall.collideBrick != null && isColliding) {
              if(wall.collideBrick.value == destValue){
                wall.collideBrick.div.style.opacity = 0.1;
              }
              if (wall.collideBrick.value != destValue) {
                fail.play();
                game.hasEnded = true;
              } 
              bullet.y = bullet.y + (wall.collideBrick.y - bullet.y) / 10;
              bullet.y_speed = bullet.y_speed * 0.8;
              bullet.destinationAngle = bullet.destinationAngle * 0.8;
              if(wall.collideBrick.value == destValue && bullet.x > (wall.collideBrick.x + 14)) {
                wall.passed = true;
                if (!justScored) {
                  bullet.setNum(bullet.value + 1);
                  points ++;
                  score.update();
                  justScored = true;
                  justScoredBrick = wall.collideBrick;
                  through.play();
                }
              }
            }

          }
        }
    
        //得分后砖块消失，状态转换
        if(justScored){
          bullet.y_acceleration = 0;
          var scoringFinishFlag = false;
          justScoredBrick.opc = justScoredBrick.opc - 0.2;
          if (justScoredBrick.opc <= 0) {
            justScoredBrick.opc = 0;
            scoringFinishFlag = true;
          }
          justScoredBrick.div.style.opacity = justScoredBrick.opc;
          if (scoringFinishFlag) {
            justScored = false;
          }
        }
    
        //平时
        if ((!isColliding) && (!justScored)) {
          bullet.y_acceleration = bullet.y_acceleration + 0.7;
          if (bullet.y_acceleration > 0.7) {
            bullet.y_acceleration = 0.7;
          }
          bullet.y_speed = bullet.y_speed + bullet.y_acceleration;
          if (bullet.y_speed >= 15) {
            bullet.y_speed = 15;
          }
          bullet.destinationAngle = bullet.destinationAngle + 0.03;
          if (bullet.destinationAngle > 0.5){
            bullet.destinationAngle = 0.5;
          }
        }
    
        //画英雄
        if(bullet.y_speed > -10 && bullet.y_speed < 10){
          bullet.y = bullet.y + bullet.y_speed;
        }else if(bullet.y_speed <= -10){
          bullet.y = bullet.y - 10;
        }else{
          bullet.y = bullet.y + 10;
        }
        bullet.currentAngle = bullet.currentAngle + (bullet.destinationAngle - bullet.currentAngle) * 0.3;
        bullet.updatePosition();
        var rotationDeg = bullet.currentAngle * 180 / Math.PI;
        bullet.div.style.transform       = 'rotate('+rotationDeg+'deg)';

        //落地
        var groundHeight = height - brickSize - 54;
        if (bullet.y > groundHeight) {
          fail.play();
          game.hasEnded = true;
        }
    
        if (game.hasEnded) {
          game.endTimer = 0;
          deathAnimation.style.display = 'block';
          deathAnimation.style.opacity = 0.8;
          game.hasStarted = false;
          game.hasEnded = true;
          gameOver.hiding = false;
          gameOver.showing = true;
          tryAgain.hiding = false;
          tryAgain.showing = true;
        }
      }
    }
  }

  //死亡动画
 if (game.hasEnded) {
    game.endTimer++;
    var opc = 0.8 - game.endTimer / 15;
    if (opc < 0) {
      deathAnimation.style.display = 'none';
    } else {
      deathAnimation.style.opacity = opc;
    }
  }

  requestAnimationFrame(controller);
}