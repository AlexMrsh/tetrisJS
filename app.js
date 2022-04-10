document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementsByClassName('grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button');
    const width = 10;


const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+2, width*2, width*2+1],
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

let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw the tetromino

function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
    });
}

//undraw the tetromino

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
    });
}

//make tetrominoes move down

timerId = setInterval(moveDown, 100);

function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    // freeze();
}

//freeze function

// function freeze() {
//     if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
//         current.forEach(index => squares[currentPosition + index].classList.add('taken'));
//         //start new tetromino falling
//         random = Math.floor(Math.random() * theTetrominoes.length);
//         current = theTetrominoes[random][currentRotation];
//         currentPosition = 4;
//         draw();
//     }
// }

});