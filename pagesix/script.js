// === Floating Pixel Hearts ===
const container = document.querySelector('.hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 6 + Math.random() * 4 + 's';
  heart.style.opacity = 0.7 + Math.random() * 0.3;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}
setInterval(createHeart, 400);

// === Live Counter (counting UP since Nov 9, 2024) ===
const timerEl = document.getElementById("timer");
const startDate = new Date("November 9, 2024 00:00:00").getTime();

function updateCounter() {
  const now = new Date().getTime();
  const diff = now - startDate; // note: swapped order for counting UP

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.textContent =
    `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCounter, 1000);
updateCounter();

// === Easter Egg Heart Reveal ===
const easterEggHeart = document.getElementById('easter-egg-heart');
setTimeout(() => {
  easterEggHeart.classList.add('glow');
  easterEggHeart.addEventListener('click', () => {
    window.location.href = "/easter-egg/index.html"; // make sure this path exists
  });
}, 5000);
