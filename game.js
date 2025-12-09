const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("scoreVal");
const startBtn = document.getElementById("startBtn");

// Configurações do Jogo
let gameRunning = false;
let score = 0;
let animationId;

// Jogador
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    w: 30,
    h: 30,
    speed: 5,
    dx: 0,
};

// Listas de objetos
let bullets = [];
let enemies = [];

// Controles
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
    const size = Math.random() * 20 + 20; // Tamanho aleatório entre 20 e 40
    enemies.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        w: size,
        h: size,
        speed: Math.random() * 2 + 1, // Velocidade aleatória
    });

    // Cria próximo inimigo em tempo aleatório
    setTimeout(criarInimigo, Math.random() * 1000 + 500);
}

function desenharPlayer() {
    ctx.fillStyle = "#00ff00";
    // Desenha um triângulo simples
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.h / 2); // Topo
    ctx.lineTo(player.x + player.w / 2, player.y + player.h / 2); // Direita
    ctx.lineTo(player.x - player.w / 2, player.y + player.h / 2); // Esquerda
    ctx.closePath();
    ctx.fill();
}

function desenharBullets() {
    ctx.fillStyle = "#ccffcc";
    bullets.forEach((b, index) => {
        b.y -= b.speed;
        ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);

        // Remove se sair da tela
        if (b.y < 0) bullets.splice(index, 1);
    });
}

function desenharEnemies() {
    ctx.strokeStyle = "#ff0000"; // Inimigos são contornos vermelhos
    ctx.lineWidth = 2;

    enemies.forEach((e, index) => {
        e.y += e.speed;
        ctx.strokeRect(e.x, e.y, e.w, e.h);

        // Game Over se tocar no chão
        if (e.y > canvas.height) {
            gameOver();
        }

        // Colisão com Jogador
        if (player.x < e.x + e.w && player.x + player.w > e.x && player.y < e.y + e.h && player.y + player.h > e.y) {
            gameOver();
        }
    });
}

function checarColisoes() {
    bullets.forEach((b, bIndex) => {
        enemies.forEach((e, eIndex) => {
            if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
                // Colisão detectada!
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;
                scoreElement.innerText = score;
            }
        });
    });
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa tela

    // Movimento Player
    player.x += player.dx;
    // Impede sair da tela
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

    // Reseta variaveis
    gameRunning = true;
    score = 0;
    bullets = [];
    enemies = [];
    scoreElement.innerText = score;
    startBtn.style.display = "none"; // Esconde botão
    player.x = canvas.width / 2;

    criarInimigo();
    update();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    // Desenha tela de Game Over
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = "40px VT323";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px VT323";
    ctx.fillText(`Score Final: ${score}`, canvas.width / 2, canvas.height / 2 + 40);

    startBtn.style.display = "inline-block";
    startBtn.innerText = ">> TENTAR NOVAMENTE <<";
}
