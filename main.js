const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const languageSelect = document.getElementById('language-select');
const replayButton = document.getElementById('replay-button');

const translations = {
    ko: {
        gameOver: '게임 오버',
    },
    en: {
        gameOver: 'Game Over',
    }
};

let currentLang = 'ko';
let gameOver = false;
let speedIncreaseInterval;
let gameStartTime;

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-ko]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
}

// Ball properties
let ballRadius = 10;
let x, y, dx, dy;

// Paddle properties
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX;

function resetGame() {
    gameOver = false;
    x = canvas.width / 2;
    y = canvas.height - 40; // Start slightly higher
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    replayButton.style.display = 'none';

    // Clear any existing speed increase interval
    if (speedIncreaseInterval) {
        clearInterval(speedIncreaseInterval);
    }

    // Set interval to increase speed every 10 seconds
    speedIncreaseInterval = setInterval(() => {
        dx *= 1.1;
        dy *= 1.1;
    }, 10000);

    draw();
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = body.classList.contains('dark-mode') ? "#FFEB3B" : "#FF5722"; // Yellow in dark, Orange in light
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight); // 10px off the bottom
    ctx.fillStyle = body.classList.contains('dark-mode') ? "#B0BEC5" : "#2196F3"; // Light Grey in dark, Blue in light
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if (gameOver) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // Ball collision detection
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - 10) { // Adjust for paddle position
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // Game over
            gameOver = true;
            clearInterval(speedIncreaseInterval); // Stop increasing speed
            ctx.font = "30px 'Jua', sans-serif";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText(translations[currentLang].gameOver, canvas.width / 2, canvas.height / 2);
            replayButton.style.display = 'block';
            return; // Stop the game loop
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

// Paddle controls
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function touchMoveHandler(e) {
    let relativeX = e.touches[0].clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    e.preventDefault();
}


document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
replayButton.addEventListener('click', resetGame);


themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});

languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Set initial language and start game
setLanguage('ko');
resetGame();
