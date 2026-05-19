import sharp from "sharp";

const src = process.argv[2];
const out = "public/brand/accufab-wordmark.png";

const idx = (x, y, w) => y * w + x;

function morph(mask, w, h, r, mode) {
  const o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = mode === "dilate" ? 0 : 255;
      outer: for (let dy = -r; dy <= r; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) {
          if (mode === "erode") v = 0;
          continue;
        }
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) {
            if (mode === "erode") v = 0;
            continue;
          }
          const on = mask[idx(xx, yy, w)] > 0;
          if (mode === "dilate" && on) {
            v = 255;
            break outer;
          }
          if (mode === "erode" && !on) {
            v = 0;
            break outer;
          }
        }
      }
      o[idx(x, y, w)] = v;
    }
  }
  return o;
}

function largest(mask, w, h, minArea) {
  const seen = new Uint8Array(w * h);
  const o = new Uint8Array(w * h);
  const q = [];
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || seen[i]) continue;
    q.length = 0;
    q.push(i);
    seen[i] = 1;
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    for (let qi = 0; qi < q.length; qi++) {
      const p = q[qi];
      const x = p % w;
      const y = (p / w) | 0;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      for (const [nx, ny] of [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]) {
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const ni = idx(nx, ny, w);
        if (mask[ni] && !seen[ni]) {
          seen[ni] = 1;
          q.push(ni);
        }
      }
    }
    const area = q.length;
    const bw = maxX - minX + 1;
    const bh = maxY - minY + 1;
    if (area >= minArea && bw > 120 && bh > 20 && bw / bh > 2.2) {
      for (const p of q) o[p] = 255;
    }
  }
  return o;
}

function sampleWall(data, width, height, channels) {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = 0; y < height; y += Math.floor(height / 8)) {
    for (let x = 0; x < width; x += Math.floor(width / 8)) {
      if (x > width * 0.12 && x < width * 0.88) continue;
      if (y < height * 0.2 || y > height * 0.8) {
        const i = (y * width + x) * channels;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n++;
      }
    }
  }
  return [r / n, g / n, b / n];
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const [wallR, wallG, wallB] = sampleWall(data, width, height, channels);

let mask = new Uint8Array(width * height);
const alpha = new Uint8Array(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (y < height * 0.34 || y > height * 0.66) continue;
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    const wallDist = Math.hypot(r - wallR, g - wallG, b - wallB);
    const blue = b > r + 10 && b > g && spread > 14 && lum < 150;
    const metal = lum > 98 && spread < 88;
    const edgeMetal = lum > 72 && wallDist > 28 && spread > 6;

    if (wallDist < 22 && lum < 78 && !blue) continue;
    if (blue || metal || edgeMetal) {
      mask[idx(x, y, width)] = 255;
      alpha[idx(x, y, width)] = blue ? 255 : lum > 130 ? 255 : 210;
    }
  }
}

mask = morph(mask, width, height, 2, "dilate");
mask = largest(mask, width, height, 800);
mask = morph(mask, width, height, 3, "dilate");
mask = morph(mask, width, height, 2, "erode");

for (let i = 0; i < alpha.length; i++) {
  if (!mask[i]) alpha[i] = 0;
}

const rowFill = new Float32Array(height);
for (let y = 0; y < height; y++) {
  let c = 0;
  for (let x = 0; x < width; x++) if (mask[idx(x, y, width)]) c++;
  rowFill[y] = c / width;
}
let y0 = 0;
let y1 = height - 1;
for (let y = 0; y < height; y++) {
  if (rowFill[y] > 0.01) {
    y0 = y;
    break;
  }
}
for (let y = height - 1; y >= 0; y--) {
  if (rowFill[y] > 0.01) {
    y1 = y;
    break;
  }
}
y0 = Math.max(0, y0 - 6);
y1 = Math.min(height - 1, y1 + 6);

let minX = width;
let maxX = 0;
for (let y = y0; y <= y1; y++) {
  for (let x = 0; x < width; x++) {
    if (mask[idx(x, y, width)]) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }
}
minX = Math.max(0, minX - 16);
maxX = Math.min(width - 1, maxX + 20);

const ow = maxX - minX + 1;
const oh = y1 - y0 + 1;
const rgba = Buffer.alloc(ow * oh * 4);

for (let y = 0; y < oh; y++) {
  for (let x = 0; x < ow; x++) {
    const sx = minX + x;
    const sy = y0 + y;
    const si = (sy * width + sx) * channels;
    const oi = (y * ow + x) * 4;
    const r = data[si];
    const g = data[si + 1];
    const b = data[si + 2];
    let a = alpha[idx(sx, sy, width)];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const wallDist = Math.hypot(r - wallR, g - wallG, b - wallB);
    if (a < 28 || (wallDist < 24 && lum < 70)) a = 0;
    else if (a < 200 && wallDist < 32 && lum < 88) a = Math.round(a * 0.35);
    rgba[oi] = r;
    rgba[oi + 1] = g;
    rgba[oi + 2] = b;
    rgba[oi + 3] = a;
  }
}

await sharp(rgba, { raw: { width: ow, height: oh, channels: 4 } })
  .trim({ threshold: 12 })
  .resize({ width: 1600, withoutEnlargement: false })
  .png()
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(out, `${meta.width}x${meta.height}`);
