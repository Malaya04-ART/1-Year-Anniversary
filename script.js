const COLS = 50, ROWS = 50;
const grid = document.getElementById('grid');

function makePixel(cls) {
  const d = document.createElement('div');
  d.className = 'pixel ' + cls;
  return d;
}

function buildHeartGrid() {
  grid.innerHTML = '';
  const map = [];
  const scaleX = 1.15, scaleY = 1.12, xRange = 1.6, yRange = 1.6;

  for (let r = 0; r < ROWS; r++) {
    map[r] = [];
    for (let c = 0; c < COLS; c++) {
      const nx = ((c - COLS / 2) / (COLS / 2)) * xRange / scaleX;
      const ny = -((r - ROWS / 2) / (ROWS / 2)) * yRange / scaleY;
      const val = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * ny * ny * ny;
      map[r][c] = val <= 0 ? 'p' : 't';
    }
  }

  const handleW = Math.floor(COLS * 0.32);
  const handleH = 4;
  const handleLeft = Math.floor((COLS - handleW) / 2);
  const handleTop = 2;

  for (let c = handleLeft + 2; c < handleLeft + handleW - 2; c++) map[handleTop][c] = 'y2';
  for (let c = handleLeft + 1; c < handleLeft + handleW - 1; c++) map[handleTop + 1][c] = 'y1';
  for (let r = handleTop + 2; r < handleTop + handleH; r++)
    for (let c = handleLeft; c < handleLeft + handleW; c++) map[r][c] = 'y1';

  const keyR = Math.floor(ROWS * 0.58);
  const keyC = Math.floor(COLS / 2);
  const keyCoords = [
    [keyR, keyC - 1], [keyR, keyC], [keyR, keyC + 1],
    [keyR + 1, keyC], [keyR + 2, keyC], [keyR + 3, keyC], [keyR + 4, keyC]
  ];
  keyCoords.forEach(([r, c]) => {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) map[r][c] = 'k';
  });

  const neighborOffsets = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (map[r][c] === 'p') {
        let isEdge = false;
        for (const [dr, dc] of neighborOffsets) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || map[nr][nc] === 't' || map[nr][nc] === 'y1' || map[nr][nc] === 'y2') {
            isEdge = true; break;
          }
        }
        if (isEdge) map[r][c] = 'o';
      }
    }
  }

  const connRow = handleTop + handleH;
  const connCol = Math.floor(COLS / 2);
  for (let c = handleLeft; c < handleLeft + handleW; c++) {
    if (map[connRow] && map[connRow][c] === 'o' && Math.abs(c - connCol) > 1) {
      map[connRow][c] = 'p1';
    }
  }

  const pinkShades = ['p1', 'p2', 'p3', 'p4', 'p5'];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (map[r][c] === 'p') {
        const idx = Math.abs((r - Math.floor(ROWS / 2)) + (c % pinkShades.length)) % pinkShades.length;
        map[r][c] = pinkShades[idx];
      }
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      grid.appendChild(makePixel(map[r][c] || 't'));
    }
  }
}

buildHeartGrid();

/* Dials and interaction logic */
const PASSWORD = '110924';
const dials = Array.from(document.querySelectorAll('.dial'));
const page = document.getElementById('page');
const handleBtn = document.getElementById('handleBtn');
const handleVisual = document.getElementById('handleVisual');
let clickedOnce = new Array(dials.length).fill(false);

dials.forEach((dial, i) => {
  dial.addEventListener('click', () => {
    const cur = parseInt(dial.textContent, 10) || 0;
    dial.textContent = String((cur + 1) % 10);
    clickedOnce[i] = true;
  });
  dial.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dial.click(); }
  });
});

function resetDials() {
  dials.forEach((d, idx) => { d.textContent = '0'; clickedOnce[idx] = false; });
  page.classList.remove('enabled', 'shake', 'lose', 'unlock');
  handleVisual.classList.remove('open', 'wrong');
}

function getEntered() { return dials.map(d => d.textContent).join(''); }

handleBtn.addEventListener('click', () => {
  const entered = getEntered();
  if (!clickedOnce.some(Boolean)) return;

  if (entered === PASSWORD) {
    handleVisual.classList.remove('wrong');
    handleVisual.classList.add('open');
    page.classList.remove('shake', 'lose');
    page.classList.add('enabled', 'unlock');
    setTimeout(() => window.location.href = '/pageone/index.html', 900);
  } else {
    handleVisual.classList.remove('open');
    handleVisual.classList.remove('wrong');
    void handleVisual.offsetWidth;
    handleVisual.classList.add('wrong');
    page.classList.remove('unlock');
    page.classList.add('enabled', 'shake', 'lose');
    setTimeout(() => { handleVisual.classList.remove('wrong'); resetDials(); }, 750);
  }
});

handleBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBtn.click(); }
});

dials.forEach(d => d.addEventListener('focus', () => d.style.outline = 'none'));
