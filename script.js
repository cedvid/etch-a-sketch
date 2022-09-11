const container = document.querySelector('.container');
let size = 16;

function createDiv() {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
};

addEventListener('mouseover', function(e) {
    if (e.target.classList == 'cell') {
        e.target.style.backgroundColor = 'blue';
    }
});

createDiv(size);
