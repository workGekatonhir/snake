let canvasHeight = 640;
let canvasWidth  = 640;

let backgroundCanvas = document.getElementById('background');
let backgroundCanvasCtx = backgroundCanvas.getContext('2d');
    backgroundCanvas.width  = canvasWidth;
    backgroundCanvas.height = canvasHeight;

let objectsCanvas = document.getElementById('objects');
let objectsCanvasCtx = objectsCanvas.getContext('2d');
    objectsCanvas.width  = canvasWidth;
    objectsCanvas.height = canvasHeight;


let btnStart = document.getElementById('start');
let btnRestart = document.getElementById('restart');




function drawMap() {
    backgroundCanvasCtx.fillStyle = "#ececec";
    backgroundCanvasCtx.strokeStyle = "gray";
    backgroundCanvasCtx.fillRect(0, 0, canvasHeight, canvasWidth);
    for (let i =0; i<32; i++){
        for (let j =0; j<32; j++){
            backgroundCanvasCtx.strokeRect(j*20, i*20, 20, 20);
        }
    }
}


class Block {
    constructor(x,y){
        this.x =x;
        this.y =y;
    }
}

let snake =  [new Block(15,14),new Block(15,15),new Block(15,16)];
let food,direction, gameOver, CanPress, speed, score;
let scoreBLock = document.getElementsByClassName('score')[0];

function moveSnake() {
    switch (direction) {
        case 'up':    snake.pop(); snake.unshift(new Block(snake[0].x,snake[0].y-1)) ; break;
        case 'left':  snake.pop(); snake.unshift(new Block(snake[0].x-1,snake[0].y)) ; break;
        case 'down':  snake.pop(); snake.unshift(new Block(snake[0].x,snake[0].y+1)) ; break;
        case 'right': snake.pop(); snake.unshift(new Block(snake[0].x+1,snake[0].y)) ; break;
    }
}

function tryEat() {
    for (let i =0; i< snake.length; i++) {
        for (let i = 0; i < snake.length; i++) {
            if (food.y === snake[i].y && food.x === snake[i].x) {
                switch (direction) {
                    case 'up':    snake.unshift(new Block(food.x,food.y-1)); break;
                    case 'left':  snake.unshift(new Block(food.x-1,food.y)); break;
                    case 'down':  snake.unshift(new Block(food.x,food.y+1)); break;
                    case 'right': snake.unshift(new Block(food.x+1,food.y)); break;
                }
                score+=10;
                scoreBLock.textContent = ''+score+'';
                food = getRandomBlock();
            }
        }
    }
}

function crushTest() {

    for (let i =0; i< snake.length;i++) {
      if(snake[i].x < 32 && snake[i].y<32 && snake[i].x >= 0 && snake[i].y >= 0  ){
          for (let j=1; j < snake.length;j++) {
              if(j!== i && snake[j].y === snake[i].y && snake[j].x === snake[i].x) {
                  gameOver = true;
                  btnRestart.style.display = 'block';
                  btnRestart.focus();

              }
          }
      }else {
          btnRestart.style.display = 'block';
          btnRestart.focus();
          gameOver = true;

      }

    }
}

function drawObjects () {
    objectsCanvasCtx.clearRect(0,0,canvasWidth,canvasHeight);
    objectsCanvasCtx.fillStyle = "#bdbdbd";
    for (let i =0; i<snake.length; i++){
        objectsCanvasCtx.fillRect(snake[i].x*20+1, snake[i].y*20+1, 18, 18);
    }
    objectsCanvasCtx.fillRect(food.x*20+1, food.y*20+1, 18, 18);
}


function getRandomBlock() {
    let canSendFood;
    let food;
    do {
        canSendFood = true;
        food = new Block(getRandom(0, 31), getRandom(0, 31));

        for (let i = 0; i < snake.length; i++) {
            if (food.y === snake[i].y && food.x === snake[i].x  ) {
                canSendFood = false;
            }
        }
    }while (!canSendFood);
    return food;

}

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function switchCanPress() {
    CanPress = !CanPress;
}

function loop(){
    objectsCanvas.focus();
    tryEat();
    moveSnake();
    crushTest();
    if(!gameOver){
        drawObjects ();
        setTimeout(loop,speed);
    }



}

drawMap();

function start () {

    btnStart.style.display ='none';

    snake =  [new Block(15,14),new Block(15,15),new Block(15,16)];
     food = getRandomBlock();
     direction ='up';
     gameOver = false;
     CanPress = true;
     speed = 150;
     score =0;
    scoreBLock.textContent = ''+score+'';
    setTimeout(loop,speed);
}

function restart () {
    btnRestart.style.display = 'none';
    start();
}

document.addEventListener("keydown", function(event){
   if(CanPress) {
       switch (event.keyCode) {
           case 87: if(direction !== 'down') direction = 'up'; break;
           case 65: if(direction !== 'right') direction = 'left';  break;
           case 83: if(direction !== 'up') direction = 'down'; break;
           case 68: if(direction !== 'left') direction = 'right'; break;

           case 38: if(direction !== 'down') direction = 'up'; break;
           case 37: if(direction !== 'right') direction = 'left';  break;
           case 40: if(direction !== 'up') direction = 'down'; break;
           case 39: if(direction !== 'left') direction = 'right'; break;

       }
       switchCanPress();
       setTimeout(switchCanPress,speed/1.4);
   }
});


btnStart.onclick =  function () {
    start();
};

btnStart.focus();
objectsCanvas.focus();

btnRestart.onclick =  function () {
    restart();
};