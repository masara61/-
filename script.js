const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeBtn = document.getElementById("close-btn");
const saveSettingsBtn = document.getElementById("save-settings-btn");
const workMinutesInput = document.getElementById("work-minutes");
const shortBreakMinutesInput = document.getElementById("short-break-minutes");
const longBreakMinutesInput = document.getElementById("long-break-minutes");

let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let workMinutes = 25;
let shortBreakMinutes = 5;
let longBreakMinutes = 20;
let sessionCount = 0;
let currentSession = "work";

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
      switchSession();
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
  timeLeft = workMinutes * 60;
  updateDisplay();
}

function switchSession() {
  stopTimer();

  if (currentSession === "work") {
    sessionCount++;
    if (sessionCount % 4 === 0) {
      currentSession = "longBreak";
      timeLeft = longBreakMinutes * 60;
      alert("長い休憩の時間です");
    } else {
      currentSession = "shortBreak"
      timeLeft = shortBreakMinutes * 60;
      alert("短い休憩の時間です");
    }
  } else {
    currentSession = "work";
    timeLeft = workMinutes * 60;
    alert("仕事の時間です");
  }
  updateDisplay();
  startTimer();
}

//設定の読み込み
function loadSettings() {
  const savedSettings = localStorage.getItem("pomodoroSettings");
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    workMinutes = settings.work;
    shortBreakMinutes = settings.shortBreak;
    longBreakMinutes = settings.longBreak;
  }
  
  workMinutesInput.value = workMinutes;
  shortBreakMinutesInput.value = shortBreakMinutes;
  longBreakMinutesInput.value = longBreakMinutes;
}

function saveSettings() {
  workMinutes = parseInt(workMinutesInput.value);
  shortBreakMinutes = parseInt(shortBreakMinutesInput.value);
  longBreakMinutes = parseInt(longBreakMinutesInput.value);

  const settings = {
    work: workMinutes,
    shortBreak: shortBreakMinutes,
    longBreak: longBreakMinutes
  };
  localStorage.setItem("pomodoroSettings", JSON.stringify(settings));

  resetTimer();
  closeModal();
}

function openModal() {
  settingsModal.classList.add("show");
}

function closeModal() {
  settingsModal.classList.remove("show");
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
settingsBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
saveSettingsBtn.addEventListener("click", saveSettings);

window.addEventListener("click", (event) => {
  if (event.target == settingsModal) {
    closeModal();
  }
});
loadSettings();
resetTimer();