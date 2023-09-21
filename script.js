let colors = ["red", "green", "blue", "yellow", "black", "white", "grey", "pink", "brown", "purple"];
let currentColor = "";
let timer;
let timeLeft = 10;
let round = 1;
let score = 1000;
const colorImage = document.getElementById('colorImage');
const timerSpan = document.getElementById('timer');
const scoreSpan = document.getElementById('score');
const roundSpan = document.getElementById('round');
const restartBtn = document.getElementById('restart');
const options = document.querySelectorAll('.options button');

function startGame() {
    restartBtn.style.display = 'none';
    timeLeft = 10;
    round = 1;
    score = 1000;
    nextQuestion();
}

function nextQuestion() {
    let chosenColors = colors.sort(() => Math.random() - 0.5).slice(0, 4);
    currentColor = chosenColors[Math.floor(Math.random() * 4)];
    colorImage.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='${currentColor}' /%3E%3C/svg%3E`;
    
    options.forEach((btn, index) => {
        btn.textContent = chosenColors[index];
        btn.style.backgroundColor = "#4CAF50";
    });
    
    timerSpan.textContent = `Time left: ${timeLeft}s`;
    scoreSpan.textContent = `Score: ${score}`;
    roundSpan.textContent = `Round ${round}`;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft == 0) {
            clearInterval(timer);
            transitionToNextQuestion();
        }

        score--;
        scoreSpan.textContent = `Score: ${score}`;
    }, 1000);
}

function checkAnswer(btn) {
    if (btn.textContent === currentColor) {
        btn.style.backgroundColor = "green";
        clearInterval(timer);
        transitionToNextQuestion();
    } else {
        score -= 50;
        scoreSpan.textContent = `Score: ${score}`;
        btn.style.backgroundColor = "red";
    }
}

function transitionToNextQuestion() {
    setTimeout(() => {
        if (round < 10) {
            round++;
            timeLeft = 10;
            nextQuestion();
        } else {
            endGame();
        }
    }, 1800);
}

function endGame() {
    clearInterval(timer);
    restartBtn.style.display = 'block';
    alert(`Game Over! Your final score is: ${score}`);
}

startGame();
