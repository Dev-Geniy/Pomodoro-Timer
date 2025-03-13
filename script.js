// Переключение темы
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('.icon');

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Обработчик переключения
toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
});

// Логика таймера Помодоро
const timerDisplay = document.getElementById('timer-display');
const progress = document.getElementById('progress');
const status = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const WORK_TIME = 25 * 60; // 25 минут в секундах
const BREAK_TIME = 5 * 60; // 5 минут в секундах
let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkPhase = true;
let interval;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const totalTime = isWorkPhase ? WORK_TIME : BREAK_TIME;
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    progress.style.width = `${percentage}%`;
    progress.style.background = isWorkPhase ? 'var(--work-color)' : 'var(--break-color)';
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Running';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                updateProgress();
            } else {
                clearInterval(interval);
                isRunning = false;
                isWorkPhase = !isWorkPhase;
                timeLeft = isWorkPhase ? WORK_TIME : BREAK_TIME;
                status.textContent = isWorkPhase ? 'Work' : 'Break';
                updateDisplay();
                updateProgress();
                startTimer(); // Автоматический переход к следующей фазе
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        startBtn.textContent = 'Resume';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    isWorkPhase = true;
    timeLeft = WORK_TIME;
    status.textContent = 'Work';
    updateDisplay();
    updateProgress();
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Инициализация
updateDisplay();
updateProgress();

// Копирование Bitcoin-адреса
const copyBtcButton = document.querySelector('.btc-address .copy-btn');
copyBtcButton.addEventListener('click', () => {
    const btcCode = document.getElementById('btc-code').textContent;
    navigator.clipboard.writeText(btcCode).then(() => {
        copyBtcButton.textContent = 'Copied!';
        setTimeout(() => {
            copyBtcButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
