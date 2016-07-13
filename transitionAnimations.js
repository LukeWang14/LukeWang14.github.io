var transitionAnimations = function () {
	if (gameLogo.showing) {
        gameLogo.opc = gameLogo.opc + 0.03;
        if (gameLogo.opc >= 1) {
          gameLogo.opc = 1;
          gameLogo.showing = false;
        }
        gameLogo.img.style.opacity = gameLogo.opc;
      }
      if (gameLogo.hiding) {
        gameLogo.opc = gameLogo.opc - 0.03;
        if (gameLogo.opc <= 0) {
          gameLogo.opc = 0;
          gameLogo.hiding = false;
        }
        gameLogo.img.style.opacity = gameLogo.opc;
      }
   

      if (gameOver.showing) {
        gameOver.opc = gameOver.opc + 0.03;
        if (gameOver.opc >= 1) {
          gameOver.opc = 1;
          gameOver.showing = false;
        }
        gameOver.img.style.opacity = gameOver.opc;
      }
      if (gameOver.hiding) {
        gameOver.opc = gameOver.opc - 0.08;
        if (gameOver.opc <= 0) {
          gameOver.opc = 0;
          gameOver.hiding = false;
        }
        gameOver.img.style.opacity = gameOver.opc;
      }

      if (startButton.showing) {
        startButton.opc = startButton.opc + 0.03;
        if (startButton.opc >= 1) {
          startButton.opc = 1;
          startButton.showing = false;
        }
        startButton.img.style.opacity = startButton.opc;
      }
      if (startButton.hiding) {
        startButton.opc = startButton.opc - 0.08;
        if (startButton.opc <= 0) {
          startButton.opc = 0;
          startButton.hiding = false;
        }
        startButton.img.style.opacity = startButton.opc;
      }
   
   
      if (tryAgain.showing) {
        tryAgain.opc = tryAgain.opc + 0.03;
        if (tryAgain.opc >= 1) {
          tryAgain.opc = 1;
          tryAgain.showing = false;
        }
        tryAgain.img.style.opacity = tryAgain.opc;
      }
      if (tryAgain.hiding) {
        tryAgain.opc = tryAgain.opc - 0.08;
        if (tryAgain.opc <= 0) {
          tryAgain.opc = 0;
          tryAgain.hiding = false;
        }
        tryAgain.img.style.opacity = tryAgain.opc;
      }
      if (tryAgain.opc > 0) {
        if (!tryAgain.respondToClick) {
          tryAgain.respondToClick = true;
          tryAgain.img.style.display = 'block';
        }
      } else {
        if (tryAgain.respondToClick) {
          tryAgain.respondToClick = false;
          tryAgain.img.style.display = 'none';
        } 
      }
}