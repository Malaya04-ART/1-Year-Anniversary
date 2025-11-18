// 🌟 Shared bubble for all sprites 🌟
const sprites = document.querySelectorAll('.sprite-container');

// Create shared speech bubble
let bubble = document.createElement("div");
bubble.classList.add("speech-bubble");
bubble.textContent = "Time to set the mood 💫";
document.body.appendChild(bubble);

// Sprite click interaction
sprites.forEach(sprite => {
  const character = sprite.querySelector('.sprite');

  sprite.addEventListener('click', () => {
    character.classList.add('active');
    setTimeout(() => character.classList.remove('active'), 400);

    bubble.style.display = 'block';
    clearTimeout(bubble.hideTimeout);
    bubble.hideTimeout = setTimeout(() => {
      bubble.style.display = 'none';
    }, 2000);
  });
});

// Animate progress bar
window.addEventListener('load', () => {
  const fill = document.querySelector('.progress-fill');
  if (fill) {
    const finalWidth = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = finalWidth;
    }, 200);
  }
});

// 🌸 FLOATING PIXEL HEARTS EFFECT 🌸
const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  // 💗 Random position and movement
  heart.style.left = Math.random() * 90 + 'vw';        // random horizontal
  heart.style.bottom = Math.random() * 80 + 'vh';      // random vertical start
  heart.style.animationDuration = 4 + Math.random() * 4 + 's'; // 4–8s duration

  // 💗 Random heart size and slight tilt for variety
  const sizeMul = 0.8 + Math.random() * 0.6;
  heart.style.width = 56 * sizeMul + 'px';
  heart.style.height = 48 * sizeMul + 'px';
  heart.style.transform = `rotate(${Math.random() * 8 - 4}deg)`;

  // Append to container
  heartsContainer.appendChild(heart);

  // 💗 Cleanup after animation ends
  setTimeout(() => heart.remove(), 9000);
}

// 💗 Keep hearts appearing continuously
setInterval(createHeart, 400);
