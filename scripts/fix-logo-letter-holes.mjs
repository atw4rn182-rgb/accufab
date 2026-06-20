/**
 * Fill unintended transparent holes inside letter shapes (e.g. A, C).
 * Preserves exterior background and does not alter fully opaque letter pixels.
 */
import sharp from "sharp";

const path = process.argv[2] ?? "public/brand/accufab-wordmark.png";
const EXTERIOR_ALPHA = 8;
const SOLID_ALPHA = 200;
const SEMI_ALPHA = 185;
const LEFT_LETTER_MAX_X = Math.floor(1024 * 0.45);

const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;
const n = w * h;
const alpha = new Uint8Array(n);
for (let i = 0; i < n; i++) alpha[i] = data[i * c + 3];

function floodExterior(threshold) {
  const exterior = new Uint8Array(n);
  const queue = [];
  const mark = (x, y) => {
    const p = y * w + x;
    if (alpha[p] >= threshold || exterior[p]) return;
    exterior[p] = 1;
    queue.push(p);
  };
  for (let x = 0; x < w; x++) {
    mark(x, 0);
    mark(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    mark(0, y);
    mark(w - 1, y);
  }
  while (queue.length) {
    const p = queue.shift();
    const x = p % w;
    const y = (p / w) | 0;
    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const ni = ny * w + nx;
      if (!exterior[ni] && alpha[ni] < threshold) {
        exterior[ni] = 1;
        queue.push(ni);
      }
    }
  }
  return exterior;
}

function nearestSolid(x, y, maxR = 36) {
  let best = null;
  let bestDist = Infinity;
  for (let dy = -maxR; dy <= maxR; dy++) {
    for (let dx = -maxR; dx <= maxR; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const ni = ny * w + nx;
      if (alpha[ni] < SOLID_ALPHA) continue;
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) {
        bestDist = dist;
        best = ni;
      }
    }
  }
  return best;
}

function solidNeighbors8(x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (alpha[ny * w + nx] >= SOLID_ALPHA) count++;
    }
  }
  return count;
}

function fillFromSolid(out, p, best) {
  const si = best * c;
  const oi = p * c;
  out[oi] = data[si];
  out[oi + 1] = data[si + 1];
  out[oi + 2] = data[si + 2];
  out[oi + 3] = 255;
}

const exterior = floodExterior(EXTERIOR_ALPHA);
const out = Buffer.from(data);
let filledTransparent = 0;
let filledSemi = 0;

for (let p = 0; p < n; p++) {
  if (exterior[p]) continue;
  const a = alpha[p];
  if (a >= EXTERIOR_ALPHA) continue;

  const best = nearestSolid(p % w, (p / w) | 0);
  if (best === null) continue;
  fillFromSolid(out, p, best);
  filledTransparent++;
}

for (let y = 0; y < h; y++) {
  for (let x = 0; x <= LEFT_LETTER_MAX_X; x++) {
    const p = y * w + x;
    const a = alpha[p];
    if (a >= SEMI_ALPHA) continue;
    if (solidNeighbors8(x, y) < 6) continue;

    const best = nearestSolid(x, y);
    if (best === null) continue;

    fillFromSolid(out, p, best);
    filledSemi++;
  }
}

await sharp(out, { raw: { width: w, height: h, channels: c } }).png().toFile(path);

console.log(path, `filled ${filledTransparent} transparent + ${filledSemi} semi-transparent gaps`);
