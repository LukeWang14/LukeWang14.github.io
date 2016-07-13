var elementList = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 
            'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];

var brickColorList = ['EEE8AA', 'D3D3D3', 'C0C0C0', 'B0C4DE', '87CEFA', '8470FF', '1E90FF', '8A2EB2', 'D2691E', 'D19275', 
                  'FFA07A', 'FFB6C1', 'F4A460', '90EE90', '228B22', '556B2F', '4c4c4c', '3c3c6c', '2c2c5c', '000000']; 

function newBrick () {
  var brick = {};

  brick.opc = 1;
  brick.textNode = null;
  brick.x = 0;
  brick.y = 0;
  brick.x_speed = 0;
  brick.y_speed = 0;
  brick.currentAngle = 0;
  brick.destinationAngle = 0;
  brick.value = 1;

  brick.div = document.createElement('div');
  brick.div.style.left = brick.x + 'px';
  brick.div.style.top = brick.y + 'px';
  brick.div.style.width = brickSize + 'px';
  brick.div.style.height = brickSize + 'px';
  brick.div.style.lineHeight = brickSize + 'px';
  brick.div.style.position = 'absolute';
  brick.div.style.textAlign = 'center';
  brick.div.style.fontFamily = 'Times New Roman';
  brick.div.style.fontSize = '70px';
  brick.div.style.fontWeight = 'bold';
  brick.div.style.borderRadius = '5px';
  brick.div.style.zIndex = 1;


  brick.updatePosition = function () {
    this.div.style.left = this.x + 'px';
    this.div.style.top = this.y + 'px';
  }


  brick.setNum = function (val) {
    this.value = val;
    if (brick.textNode != null) {
      this.div.removeChild(brick.textNode);
      brick.textNode = null;
    }
    if (val == 0) {
      this.div.innerHTML = '';
      this.div.style.background = this.background = '#606060';
    } else {
      if((this.value % 20) <= 4){
        this.div.style.color = '#606060';
      }else{
        this.div.style.color = '#ffffff'
      }

      var c = brickColorList[this.value % 20 - 1];
      this.div.style.background = this.background = '#'+c;
      var s = elementList[this.value-1];
      this.div.style.fontSize = 50 +'px';
      brick.textNode = document.createTextNode(''+s);
      this.div.appendChild(brick.textNode);
    }
  }

  brick.setNum(brick.value);
  return brick;
}




var maxbrickNumInWall = 10;

var walls = [];
var newWall = function (wallValue) {

  var wall = {};
  wall.bricks = [];
  wall.collideBrick = null;
  wall.value = wallValue;
  wall.x = width + 28;
  wall.width = brickSize;
  wall.x_speed = -screenSpeed;
  for (var i = 0; i < maxbrickNumInWall; i++) {
    var brick = newBrick();
    brick.distanceToground = (i + 1) * (brickSize + 14);
    brick.x = wall.x;
    brick.y = (height - 88) - brick.distanceToground;
    brick.x_speed = wall.x_speed;
    brick.width = wall.width;
    brick.div.style.width = brick.width+'px';
    game.div.appendChild(brick.div);
    wall.bricks.push(brick);
    brick.setNum(wallValue);
    if ((brick.y <= -10) && (wall.bricks.length >= 5)) {
      break;
    }
  }


  //墙在垂直方向运动参数
  wall.verticalSpeed = (wallValue / 5 - 1) * 0.7;
  if (wall.verticalSpeed > 1){
    wall.verticalSpeed = 1;
  }
  if (wall.verticalSpeed < 0){
    wall.verticalSpeed = 0;
  }
  if(wallValue % 2 === 0){
    wall.verticalDirection = 1;
  }else{
    wall.verticalDirection = -1;
  }

  wall.setNum = function(wallValue) {
    var brickValues = [];
    var val;
    val = Math.max(1, wallValue - Math.round(this.bricks.length/2));
    for (var i = 1; i < this.bricks.length; i++) {
      val++;
      if (val == wallValue) val = val + 2;
      brickValues.push(val);
    }
    brickValues.push(wallValue);

    for(var i = 0; i < this.bricks.length; i++){
      for(var j = 0; j < this.bricks.length; j++){
        var swapIndex = Math.floor(Math.random() * this.bricks.length);
        var temp = brickValues[j];
        brickValues[j] = brickValues[swapIndex];
        brickValues[swapIndex] = temp;
      }
    }

    while(brickValues[0] === wallValue){
      var swapIndex = Math.floor(Math.random() * this.bricks.length);
      var temp = brickValues[0];
      brickValues[0] = brickValues[swapIndex];
      brickValues[swapIndex] = temp;
    }

    while(brickValues[wall.bricks.length - 1] === wallValue){
      var swapIndex = Math.floor(Math.random() * this.bricks.length);
      var temp = brickValues[wall.bricks.length - 1];
      brickValues[wall.bricks.length - 1] = brickValues[swapIndex];
      brickValues[swapIndex] = temp;
    }

    for(var i = 0; i < this.bricks.length; i++){
      this.bricks[i].setNum(brickValues[i]);
    }
  }

  wall.setNum(wallValue);


  wall.delete = function () {
    for (var i = 0; i < this.bricks.length; i++) {
      game.div.removeChild(this.bricks[i].div);
    }
    for (var i = 0; i < this.bricks.length; i++) {
      if (walls[i] == this) {
        walls.splice(i, 1);
    }
  }
}
 
 
  walls.push(wall);
 
  return wall;
}
