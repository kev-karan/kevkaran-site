const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("scoreVal");
const livesElement = document.getElementById("livesVal"); // Elemento das vidas
const startBtn = document.getElementById("startBtn");

let gameRunning = false;
let score = 0;
let lives = 3;
let animationId;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    w: 30,
    h: 30,
    speed: 5,
    dx: 0,
};

let bullets = [];
let enemies = [];

document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;
    if (e.key === "ArrowRight" || e.key === "d") player.dx = player.speed;
    if (e.key === "ArrowLeft" || e.key === "a") player.dx = -player.speed;
    if (e.key === " " || e.key === "Spacebar") {
        atirar();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "ArrowLeft" || e.key === "a") {
        player.dx = 0;
    }
});

function atirar() {
    bullets.push({
        x: player.x,
        y: player.y,
        w: 4,
        h: 10,
        speed: 7,
    });
}

function criarInimigo() {
    if (!gameRunning) return;
    const size = Math.random() * 20 + 20;

    const dificuldade = 1 + score / 500;

    enemies.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        w: size,
        h: size,
        speed: (Math.random() * 2 + 1) * dificuldade,
    });

    let tempoSpawn = Math.random() * 1000 + 500;
    if (score > 100) tempoSpawn -= 100;
    if (score > 300) tempoSpawn -= 100;

    setTimeout(criarInimigo, Math.max(300, tempoSpawn));
}

function desenharPlayer() {
    ctx.fillStyle = "#00ff00";
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.h / 2);
    ctx.lineTo(player.x + player.w / 2, player.y + player.h / 2);
    ctx.lineTo(player.x - player.w / 2, player.y + player.h / 2);
    ctx.closePath();
    ctx.fill();
}

function desenharBullets() {
    ctx.fillStyle = "#ccffcc";
    bullets.forEach((b, index) => {
        b.y -= b.speed;
        ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);
        if (b.y < 0) bullets.splice(index, 1);
    });
}

function desenharEnemies() {
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        e.y += e.speed;
        ctx.strokeRect(e.x, e.y, e.w, e.h);

        if (e.y > canvas.height) {
            enemies.splice(i, 1);
            perderVida();
        } else if (
            player.x < e.x + e.w &&
            player.x + player.w > e.x &&
            player.y < e.y + e.h &&
            player.y + player.h > e.y
        ) {
            enemies.splice(i, 1);
            perderVida();
        }
    }
}

function checarColisoes() {
    bullets.forEach((b, bIndex) => {
        enemies.forEach((e, eIndex) => {
            if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;
                scoreElement.innerText = score;
            }
        });
    });
}

function perderVida() {
    lives--;
    livesElement.innerText = lives;

    canvas.style.borderColor = "red";
    setTimeout(() => (canvas.style.borderColor = "#00ff00"), 200);

    if (lives <= 0) {
        gameOver();
    }
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.x += player.dx;
    if (player.x < player.w / 2) player.x = player.w / 2;
    if (player.x > canvas.width - player.w / 2) player.x = canvas.width - player.w / 2;

    desenharPlayer();
    desenharBullets();
    desenharEnemies();
    checarColisoes();

    animationId = requestAnimationFrame(update);
}

function iniciarJogo() {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    lives = 3;
    bullets = [];
    enemies = [];

    scoreElement.innerText = score;
    livesElement.innerText = lives;
    startBtn.style.display = "none";
    player.x = canvas.width / 2;

    criarInimigo();
    update();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = "40px VT323";
    ctx.textAlign = "center";
    ctx.fillText("SISTEMA CORROMPIDO", canvas.width / 2, canvas.height / 2);

    ctx.font = "20px VT323";
    ctx.fillText(`Score Final: ${score}`, canvas.width / 2, canvas.height / 2 + 40);

    startBtn.style.display = "inline-block";
    startBtn.innerText = ">> REINICIAR SISTEMA <<";
}
