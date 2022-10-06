const container = document.querySelector('.container');
const sizeValue = document.querySelector('.size-value');
const newSize = document.querySelector('#grid-resize');
const clearBtn = document.querySelector('#clear');
const resetBtn = document.querySelector('#reset');
const rainbowBtn = document.querySelector('#random-color');
const modeBtn = document.querySelector('#change-mode');
const eraser = document.querySelector('#eraser');
const shadeModeBtn = document.querySelector('#shade-mode');

let squares;
let size = 16;
let defaultOn = true;
let rainbowOn = false;
let shadeModeOn = false;
let eraserOn = false;
let currentMode = 'hoverMode';
let color;

container.addEventListener('mousemove', e => e.preventDefault()); //prevents drag behavior

newSize.addEventListener('input', changeSize);
clearBtn.addEventListener('click', clearGrid);
resetBtn.addEventListener('click', resetGrid);
modeBtn.addEventListener('click', changeMode);
rainbowBtn.addEventListener('click', setRainbow);
eraser.addEventListener('click', setEraser);
container.addEventListener('contextmenu', changeColor);
// shadeModeBtn.addEventListener('click', setShadeMode);

let isMousedown = false;
container.addEventListener('mousedown', ()=>{isMousedown = true;});
container.addEventListener('mouseup', ()=>{isMousedown = false;});

function generateDiv() {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
    sizeValue.textContent = `${size} x ${size}`;

    squares = container.querySelectorAll('.cell');
    squares.forEach((square) => {square.addEventListener('mouseover', colorCell)});
}

function colorCell() {
    // if (currentMode == 'clickMode' && isMousedown && shadeModeOn) {
    //     paintBlack();
    // } else if (currentMode == 'hoverMode' && shadeModeOn) {
    //     paintBlack();
    if (currentMode == 'hoverMode') {
        checkColor();
        this.style.backgroundColor = `${color}`;
    } else if (currentMode == 'clickMode' && isMousedown) {
        checkColor();
        this.style.backgroundColor = `${color}`;
    }
}

function checkColor() {
    if (rainbowOn) {
        generateColor();
    } else if (eraserOn) {
        color = '#F7ECDE';
    } else if (defaultOn) {
        color = 'black';
    }
}

function changeColor() {
    rainbowOn = false;
    defaultOn = false;
    eraserOn = false;
    rainbowBtn.classList.remove('clicked-button');
    rainbowBtn.classList.add('hover');
    eraser.classList.remove('clicked-button');
    eraser.classList.add('hover');
    generateColor();
}

function changeMode() {
    if (currentMode == 'hoverMode') {
        currentMode = 'clickMode';
        modeBtn.textContent = 'Drawing Mode: Click';
    } else if (currentMode == 'clickMode') {
        currentMode = 'hoverMode';
        modeBtn.textContent = 'Drawing Mode: Hover';
    }
}

function setRainbow() {
    eraserOn = false;
    eraser.classList.remove('clicked-button');
    eraser.classList.add('hover');

    if (rainbowOn) {
        rainbowOn = false;
        rainbowBtn.classList.remove('clicked-button');
        rainbowBtn.classList.add('hover');
        defaultOn = true;
    } else if (!rainbowOn) {
        rainbowOn = true;
        rainbowBtn.classList.add('clicked-button');
        rainbowBtn.classList.remove('hover');
    }
}

function generateColor() {
    let randomColor = '#';
    let characters = 'ABCDEF0123456789';
    for(let i=0; i < 6; i++) {
        randomColor += characters.charAt(Math.floor(Math.random() * characters.length));
        color = randomColor;
    }
}

function setEraser() {
    rainbowOn = false;
    rainbowBtn.classList.remove('clicked-button');
    rainbowBtn.classList.add('hover');

    if (!eraserOn) {
        eraserOn = true;
        color = '#F7ECDE';
        eraser.classList.add('clicked-button');
        eraser.classList.remove('hover');
    } else {
        eraserOn = false;
        color = 'black';
        eraser.classList.remove('clicked-button');
        eraser.classList.add('hover');
    }
}

function changeSize() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.remove();
    });
    size = newSize.value;
    generateDiv(size);
}

function clearGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#F7ECDE';
    });
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.remove();
    });
    size = 16;
    newSize.value = size;
    defaultOn = true;
    currentMode = 'hoverMode';
    modeBtn.textContent = 'Drawing Mode: Hover';
    rainbowOn = false;
    rainbowBtn.classList.remove('clicked-button');
    rainbowBtn.classList.add('hover');
    eraser.classList.remove('clicked-button')
    eraser.classList.add('hover');
    generateDiv();
}

generateDiv(size);

// function setShadeMode() {
//     eraserOn = false;
//     rainbowOn = false;
//     if (!shadeModeOn) {
//         shadeModeOn = true;
//     } else shadeModeOn = false;
// }

// function paintBlack() {
//     container.addEventListener('mouseover', (e)=>{
//         if (e.target.style.backgroundColor.match(/rgba/)) {
//             let opacity = parseFloat(e.target.style.backgroundColor.slice(-4, -1));
//             if (opacity <= 0.9) {
//                 e.target.style.backgroundColor = `rgba(0, 0, 0, ${(opacity + 0.1).toFixed(2)})`;
//             } else if (e.target.classList.contains('shade'));
//             return;
//         } else {
//             e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
//         }
//         });
// }