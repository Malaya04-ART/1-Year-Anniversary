// === ELEMENTS ===
const photos = document.querySelectorAll('.photo');
const trinkets = document.querySelectorAll('.trinket');
const viewer = document.getElementById('photo-viewer');
const viewerImg = document.getElementById('viewer-img');
const viewerCaption = document.getElementById('viewer-caption');
const closeBtn = document.getElementById('close-viewer');
let typeInterval = null;

// === TYPEWRITER EFFECT ===
function typeWriter(text, element, speed = 30) {
  if (typeInterval) clearInterval(typeInterval);
  element.textContent = '';
  let i = 0;
  typeInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      typeInterval = null;
    }
  }, speed);
}

// === OPEN VIEWER (photos + trinkets) ===
function openViewer(imgSrc, caption) {
  viewer.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  viewerImg.src = imgSrc;

  // restart animation
  viewerImg.classList.remove('pop-in');
  void viewerImg.offsetWidth; // reflow
  viewerImg.classList.add('pop-in');

  viewerCaption.textContent = '';
  typeWriter(caption, viewerCaption, 28);
  closeBtn.focus();
}

// === CLOSE VIEWER ===
function closeViewer() {
  viewer.style.display = 'none';
  document.body.style.overflow = '';
  viewerImg.src = '';
  viewerCaption.textContent = '';
  if (typeInterval) clearInterval(typeInterval);
}

// === PHOTO CLICK HANDLERS ===
photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const imgEl = photo.querySelector('img');
    const src = imgEl ? imgEl.src : null;
    const caption = photo.getAttribute('data-caption') || '';
    if (src) openViewer(src, caption);
  });
});

// === TRINKET CLICK HANDLERS ===
trinkets.forEach(trinket => {
  trinket.addEventListener('click', (e) => {
    e.preventDefault();
    const imgEl = trinket.querySelector('img');
    const src = imgEl ? imgEl.src : trinket.getAttribute('data-img');
    const caption = trinket.getAttribute('data-caption') || '';
    if (src) openViewer(src, caption);
  });
});

// === CLOSE HANDLERS ===
closeBtn.addEventListener('click', closeViewer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && viewer.style.display === 'flex') closeViewer();
});
viewer.addEventListener('click', (e) => {
  if (e.target === viewer) closeViewer();
});
