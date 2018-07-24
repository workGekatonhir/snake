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
let snake =  [];



 for (let i=0; i< 30; i++) {
     for (let j=0; j< 30; j++) {
         snake.push( [[i],[j]]);
     }

 }

let food = [getRandomBlock()];



// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);
// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);
// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);
// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);
// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);
// blocksArray.push([[getRandomBlock(0,31)],[getRandomBlock(0,31)]]);


function drawObjects () {
    objectsCanvasCtx.fillStyle = "#bdbdbd";

    for (let i =0; i<snake.length; i++){
        objectsCanvasCtx.fillRect(snake[i][0]*20+1, snake[i][1]*20+1, 18, 18);
    }

    objectsCanvasCtx.fillRect(food[0][0]*20+1, food[0][1]*20+1, 18, 18);


}

function getRandomBlock() {
    let canSendFood;
    let block;
    do {
        canSendFood = true;
        block =[[getRandom(0,31)],[getRandom(0,31)]];
        for (let i =0; i< snake.length;i++){

            if(block[0][0] === snake[i][0] && block[0][1] === snake[i][1] ) {
                canSendFood = false;
                console.log(block);
            }
        }
    } while (!canSendFood) ;
    return block;

}

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


drawMap();
drawObjects ();