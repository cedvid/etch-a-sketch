const container = document.querySelector('.container');
const sizeValue = document.querySelector('.size-value');
const newSize = document.querySelector('#grid-resize');
const clearBtn = document.querySelector('#clear');
const resetBtn = document.querySelector('#reset');
const rainbowBtn = document.querySelector('#random-color');
const modeBtn = document.querySelector('#change-mode');
const eraser = document.querySelector('#eraser');
const inkModeBtn = document.querySelector('#ink');

let size = 16;
let rainbowOn = false;
let inkModeOn = false;
let eraserOn = false;
let currentMode = 'hoverMode';
let color = 'black';

newSize.addEventListener('input', changeSize);
clearBtn.addEventListener('click', clearGrid);
resetBtn.addEventListener('click', resetGrid);
modeBtn.addEventListener('click', changeMode);
rainbowBtn.addEventListener('click', setRainbow);
eraser.addEventListener('click', setEraser);
inkModeBtn.addEventListener('click', setInkMode);
container.addEventListener('contextmenu', ()=>{
    rainbowOn = false;
    rainbowBtn.classList.remove('clicked-button');
    rainbowBtn.classList.add('hover');
    eraser.classList.add('hover');
    eraser.classList.remove('clicked-button');
    generateColor();
});

let isMousedown = false;
container.addEventListener('mousedown', ()=>{isMousedown = true;});
container.addEventListener('mouseup', ()=>{isMousedown = false;});

container.addEventListener('mouseover', function (e) {
    if (currentMode == 'hoverMode') {
        e.target.style.background = `${color}`;
    }
});

container.addEventListener('mousemove', (e) => {
        if (currentMode == 'clickMode' && isMousedown) {
            e.target.style.backgroundColor = `${color}`;
        }
});
container.addEventListener('mousemove', e => e.preventDefault()); //prevents drag behavior

container.addEventListener('mousemove', () => {
    if (rainbowOn) {generateColor();} 
});

container.addEventListener('mousemove', ()=> {
    if (inkModeOn) {setInkMode();}
})

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
        color = 'black';
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

//WORK IN PROGRESS
function setInkMode() {
    e.target.style.backgroundColor = 'black';
    e.target.style.opacity = '(Number(e.target.style.opacity) + 0.1)';
    console.log(e.target.style.opacity);
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
    color = 'black';
    currentMode = 'hoverMode';
    modeBtn.textContent = 'Drawing Mode: Hover';
    rainbowOn = false;
    rainbowBtn.classList.remove('clicked-button');
    rainbowBtn.classList.add('hover');
    eraser.classList.remove('clicked-button')
    eraser.classList.add('hover');
    generateDiv();
}

function generateDiv() {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
    sizeValue.textContent = `${size} x ${size}`;
}

generateDiv(size);