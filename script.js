// script.js
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

let score = 0;
let gameActive = true;
let scoreInterval;

// Função de pulo
const jump = () => {
    if (gameActive && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 700);
    }
};

// Iniciar pontuação
const startScoring = () => {
    scoreInterval = setInterval(() => {
        if (gameActive) {
            score++;
            scoreElement.textContent = score;
        }
    }, 100);
};

// Verificar colisão
const loop = setInterval(() => {
    if (!gameActive) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Colisão
    if (pipePosition <= 160 && pipePosition > 0 && marioPosition < 90) {
        // Parar animações
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Mario cai (sem imagem de morte, usa a mesma)
        mario.style.width = '90px';
        mario.style.marginLeft = '20px';

        gameActive = false;
        clearInterval(scoreInterval);

        // Mostrar tela de game over
        finalScoreElement.textContent = score;
        gameOverScreen.style.display = 'flex';
        restartBtn.style.display = 'block';
    }
}, 10);

// Reiniciar jogo
const restart = () => {
    location.reload();
};

// Controles
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', jump);
restartBtn.addEventListener('click', restart);

// Iniciar pontuação
startScoring();
