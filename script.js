const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = randomFood();
let score = 0;
let highScore = 0;
let speed = 120;

function randomFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function drawSnake() {
    snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#ff4081' : '#aff';
        ctx.fillRect(
            seg.x * gridSize,
            seg.y * gridSize,
            gridSize,
            gridSize
        );
    });
}

function drawFood() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize,
        gridSize
    );
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.some(s => s.x === head.x && s.y === head.y)
    ) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = randomFood();
        updateScore();
    } else {
        snake.pop();
    }
}

function updateScore() {
    document.querySelector('#score span').textContent = score;
    if (score > highScore) {
        highScore = score;
        document.querySelector('#high-score span').textContent = highScore;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function resetGame() {
    alert(`Game Over! Nilai Anda: ${score}`);
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    food = randomFood();
    updateScore();
}

function gameLoop() {
    moveSnake();
    draw();
    setTimeout(gameLoop, speed);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

gameLoop();
