const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    moveSnake();
    checkCollision();
    drawGame();
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;
    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = spawnFood();
        score++;
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" || key === "w") direction = "UP";
    if (key === "ArrowDown" || key === "s") direction = "DOWN";
    if (key === "ArrowLeft" || key === "a") direction = "LEFT";
    if (key === "ArrowRight" || key === "d") direction = "RIGHT";
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * 20) * gridSize,
        y: Math.floor(Math.random() * 20) * gridSize
    };
}

function checkCollision() {
    const head = snake[0];

    // wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }

    // self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = spawnFood();
    score = 0;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = "#00ffee";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });

    // draw food
    ctx.fillStyle = "#ff0066";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // draw score
    ctx.fillStyle = "#00ffee";
    ctx.font = "18px Arial";
    ctx.fillText("Score: " + score, 10, 390);
}

setInterval(gameLoop, 120);
