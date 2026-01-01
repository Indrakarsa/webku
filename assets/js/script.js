// Update waktu & salam
function updateTime() {
  const now = new Date();
  const wibOffset = 7 * 60;
  const localOffset = now.getTimezoneOffset();
  const totalOffset = (wibOffset + localOffset) * 60 * 1000;
  const wib = new Date(now.getTime() + totalOffset);

  const hours = wib.getHours();
  const minutes = wib.getMinutes().toString().padStart(2, '0');
  const seconds = wib.getSeconds().toString().padStart(2, '0');
  const day = wib.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  document.getElementById("datetime").textContent = `${day}, ${hours}:${minutes}:${seconds}`;

  let greet = "";
  if (hours >= 4 && hours < 11) greet = "Selamat pagi 🌄";
  else if (hours >= 11 && hours < 15) greet = "Selamat siang ☀️";
  else if (hours >= 15 && hours < 18) greet = "Selamat sore 🌇";
  else greet = "Selamat malam 🌙";

  document.getElementById("greeting").textContent = greet;
  document.getElementById("loading-greeting").textContent = greet;
}
setInterval(updateTime, 1000);
updateTime();

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loading-screen");
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = "none", 500);
    try { playMusic(); } catch {}
  }, 2000);
});

// Efek vibrasi
function vibrateButton(el) {
  el.classList.add("vibrate");
  setTimeout(() => el.classList.remove("vibrate"), 500);
}
function openLink(url, el) {
  window.open(url, "_blank");
  vibrateButton(el);
}
function trackClick(name) {
  console.log("Klik:", name);
}

// Playlist musik
const playlist = [
  { title: "Sick of Love - Mill West", src: "assets/sound/sick of love.mp3" },
  { title: "DJ JANJI MANISMU YANK - VINKY YETE", src: "assets/sound/dj janji manismu.mp3" },
  { title: "WALK IN THE SUMMER", src: "assets/sound/walk in the summer.mp3"},
  { title: "MEJIKUHIBINIU", src: "assets/sound/mejikuhibiniu.mp3"},
];

let currentTrack = 0;
const audio = document.getElementById('audio-player');
const title = document.getElementById('music-title');
const progress = document.getElementById('progress');
const currentTimeText = document.getElementById('current-time');
const durationText = document.getElementById('duration');

function loadTrack(index) {
  const track = playlist[index];
  if (!track) return;
  audio.src = track.src;
  title.textContent = "🎵 " + track.title;
  audio.load();
}
function playMusic() {
  if (!audio.src) loadTrack(currentTrack);
  audio.play();
}
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}
function nextMusic() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  playMusic();
}
audio.addEventListener('timeupdate', () => {
  progress.max = audio.duration || 0;
  progress.value = audio.currentTime || 0;
  currentTimeText.textContent = formatTime(audio.currentTime);
  durationText.textContent = formatTime(audio.duration);
});
progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});
audio.addEventListener('ended', nextMusic);
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ini generate name tab web */
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.style.transition = 'opacity 0.5s';
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 500);
});

const fullTitle = 'Indrakarsa';
let index = 1;
let forward = true;

setInterval(() => {
    document.title = fullTitle.slice(0, index);

    if (forward) {
        index++;
        if (index > fullTitle.length) forward = false;
    } else {
        index--;
        if (index < 1) forward = true;
    }
}, 300);
