const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

let timer;
let timeLeft = 25 * 60;
let isRunning = false;

//秒を(分、秒)の形式に変換
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

//タイマーをスタートする
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      //時間が0になるとタイマー停止
      clearInterval(timer);
      isRunning = false;
      alert(`タイマーが終了しました。`);
    }
  },1000);
}

//タイマーを停止する
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

//タイマーをリセットする
function resetTimer() {
  stopTimer();
  timeLeft = 25 * 60;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
