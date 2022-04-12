document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementsByClassName('grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button');
    const width = 10;
    let nextRandom = 0;


const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2, width*2+1],
    [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
];

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
];

const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];

const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3] 
];

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let currentRotation = 0;

//random first
let random = Math.floor(Math.random()*theTetrominoes.length);
let currentTetromino = theTetrominoes[random][currentRotation];

//draw the tetromino

function draw() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino");
    });
}

//undraw the tetromino

function undraw() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino");
    });
}

//make tetrominoes move down
timerId = setInterval(moveDown, 1000);

//keycodes
function control(e) {
    if(e.key === 'ArrowLeft') {
        moveLeft();
    } else if(e.key === 'ArrowRight') {
        moveRight();
    } else if(e.key === 'ArrowUp') {
        rotate();
    } else if(e.key === 'ArrowDown') {
        moveDown();
    }

}

document.addEventListener('keydown', control);

function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
}

//freeze function


function freeze() {                                                                                                 //ISSUE : can't move when hitting the floor
    if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        currentTetromino.forEach(index => squares[currentPosition + index].classList.add('taken'));
        //start new tetromino falling
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        currentTetromino = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
    }
}

//move tetromino left unless is at the edge or there is a blockage

function moveLeft (){
    undraw();
    const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);
    
    if(!isAtLeftEdge) {
        currentPosition -=1;
    }

    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1;
    }
    
    draw();
}

function moveRight (){
    undraw();
    const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === 9);
    
    if(!isAtRightEdge) {
        currentPosition +=1;
    }

    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1;
    }
    
    draw();
}

function rotate(){                                                                                        //ISSUE : can rotate inside a taken tetromino and accross border
    undraw();
    currentRotation++;
    if(currentRotation === currentTetromino.length) {
        currentRotation = 0;
    }
    currentTetromino = theTetrominoes[random][currentRotation];
    draw();
}

//show-up next tetromino
const displaySquares = document.querySelectorAll('#mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

const nextTetromino = [
    [1, displayWidth+1, displayWidth*2+1, 2],               //L
    [0, displayWidth, displayWidth+1, displayWidth*2+1],    //Z
    [1, displayWidth, displayWidth+1, displayWidth+2],      //T
    [0, 1, displayWidth, displayWidth+1],                   //O
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //I
];

//display the shape in mini-grid
function displayShape() {
    displaySquares.forEach(index => {
        index.classList.remove('tetromino');
    });
    nextTetromino[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino');
    });
}

startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
});

});