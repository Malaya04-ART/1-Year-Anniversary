const wall = document.querySelector('.wall-container');

// 💌 10 messages
const messages = [
  "You make me feel love and appreciated 💕",
  "your an amazing person inside and out 🌟",
  "I always beating up in Astro Duel (LOSER) 🎮",
  "I love how you light up when you talk about the things you love ✨",
  "I love our late night talks and car rides 🌙",
  "Your smile instantly makes my day 💖",
  "You feel like home 🏠",
  "I love how careing you are towards others ✨",
  "I love that im your person and your mine 💞",
  "I love you Forever and ALways 💗"
];

const colors = ["#ffe5ec", "#ffd6e0", "#fff0f5", "#ffeef2", "#ffd9e6"];

// 💌 Create notes
function createNote(text, delay = 0) {
  const note = document.createElement('div');
  note.classList.add('note');
  note.textContent = text;
  note.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
  note.style.setProperty('--delay', `${delay}s`);
  note.style.setProperty('--tilt', `${(Math.random() * 8 - 4).toFixed(2)}deg`);
  note.style.animation = `popIn 0.8s ease forwards, floaty 8s ease-in-out infinite alternate`;
  wall.appendChild(note);
}

// Show all 10 notes with stagger
messages.forEach((msg, i) => {
  setTimeout(() => createNote(msg, i * 0.2), i * 400);
});

// Floating sparkles for retro glow ✨
const sparkleContainer = document.createElement('div');
sparkleContainer.classList.add('sparkle');
document.body.appendChild(sparkleContainer);

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.textContent = '✦';
  sparkle.style.position = 'absolute';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 100 + 'vh';
  sparkle.style.color = '#ff8fab';
  sparkle.style.fontSize = Math.random() * 10 + 8 + 'px';
  sparkle.style.opacity = 0.7;
  sparkle.style.animation = 'sparkleFade 2s ease forwards';
  sparkleContainer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 300);

// Sparkle animation
const style = document.createElement('style');
style.textContent = `
@keyframes sparkleFade {
  0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
}`;
document.head.appendChild(style);
