document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const timeDisplay = document.getElementById('time-display');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const lapBtn = document.getElementById('lap-btn');
    const lapsList = document.getElementById('laps-list');
    const playIcon = startPauseBtn.querySelector('.play-icon');
    const pauseIcon = startPauseBtn.querySelector('.pause-icon');

    // State Variables
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let lapCounter = 0;

    // --- Core Functions ---

    function startTimer() {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        toggleIcons();
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        toggleIcons();
    }

    function resetTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = 0;
        lapCounter = 0;
        timeDisplay.textContent = '00:00.00';
        lapsList.innerHTML = '';
        toggleIcons();
    }

    function recordLap() {
        if (!isRunning) return;
        lapCounter++;
        const lapTime = formatTime(Date.now() - startTime);
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsList.prepend(li);
    }

    // --- Helper Functions ---

    function updateTime() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }

    function formatTime(ms) {
        const date = new Date(ms);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const centiseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
        return `${minutes}:${seconds}.${centiseconds}`;
    }

    function toggleIcons() {
        if (isRunning) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // --- Event Listeners ---

    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
});