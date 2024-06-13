const easyTiles = [
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
];

const mediumTiles = [
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
    { id: 3, img: 'electric-car.png' },
    { id: 4, img: 'recycle.png' },
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
    { id: 3, img: 'electric-car.png' },
    { id: 4, img: 'recycle.png' },
];

const hardTiles = [
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
    { id: 3, img: 'electric-car.png' },
    { id: 4, img: 'recycle.png' },
    { id: 5, img: 'melting-ice.png' },
    { id: 6, img: 'forest-fire.png' },
    { id: 1, img: 'solar-panel.png' },
    { id: 2, img: 'wind-turbine.png' },
    { id: 3, img: 'electric-car.png' },
    { id: 4, img: 'recycle.png' },
    { id: 5, img: 'melting-ice.png' },
    { id: 6, img: 'forest-fire.png' },
];

let firstTile = null;
let secondTile = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;
let timer;
let timeElapsed = 0;

function getTiles() {
    const difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'easy':
            return easyTiles;
        case 'medium':
            return mediumTiles;
        case 'hard':
            return hardTiles;
        default:
            return mediumTiles;
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const tiles = getTiles();
    tiles.sort(() => 0.5 - Math.random());

    tiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        tileElement.dataset.id = tile.id;

        const tileImage = document.createElement('img');
        tileImage.src = tile.img;

        tileElement.appendChild(tileImage);
        tileElement.addEventListener('click', flipTile);
        gameBoard.appendChild(tileElement);
    });

    matchedPairs = 0;
    moves = 0;
    timeElapsed = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = timeElapsed;
    clearInterval(timer);
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').textContent = timeElapsed;
    }, 1000);

    // 隱藏恭喜消息
    const congratulationsMessage = document.getElementById('congratulations');
    congratulationsMessage.classList.add('hidden');
}

function flipTile() {
    if (lockBoard) return;
    if (this === firstTile) return;

    const img = this.querySelector('img');
    img.style.display = 'block';

    if (!firstTile) {
        firstTile = this;
        return;
    }

    secondTile = this;
    lockBoard = true;

    moves++;
    document.getElementById('moves').textContent = moves;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstTile.dataset.id === secondTile.dataset.id;

    isMatch ? disableTiles() : unflipTiles();
}

function disableTiles() {
    firstTile.removeEventListener('click', flipTile);
    secondTile.removeEventListener('click', flipTile);

    matchedPairs++;
    if (matchedPairs === getTiles().length / 2) {
        clearInterval(timer);
        showCongratulations();
    }

    resetBoard();
}

function unflipTiles() {
    setTimeout(() => {
        firstTile.querySelector('img').style.display = 'none';
        secondTile.querySelector('img').style.display = 'none';

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstTile, secondTile, lockBoard] = [null, null, false];
}

function showCongratulations() {
    const congratulationsMessage = document.getElementById('congratulations');
    congratulationsMessage.classList.remove('hidden');
}

document.getElementById('reset-button').addEventListener('click', () => {
    createBoard();
});

document.getElementById('difficulty').addEventListener('change', () => {
    createBoard();
});

document.addEventListener('DOMContentLoaded', createBoard);
