import sharp from "sharp";

const path = "public/brand/accufab-wordmark.png";
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
          const on = mask[idx(xx, yy, w)] > 127;
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

function removeSmallIslands(mask, w, h, minArea) {
  const seen = new Uint8Array(w * h);
  const out = new Uint8Array(mask);
  const q = [];
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || seen[i]) continue;
    q.length = 0;
    q.push(i);
    seen[i] = 1;
    for (let qi = 0; qi < q.length; qi++) {
      const p = q[qi];
      const x = p % w;
      const y = (p / w) | 0;
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
    if (q.length < minArea) {
      for (const p of q) out[p] = 0;
    }
  }
  return out;
}

const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

let alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  alpha[i] = data[i * 4 + 3];
}

alpha = morph(alpha, width, height, 1, "erode");
alpha = morph(alpha, width, height, 1, "dilate");
alpha = removeSmallIslands(alpha, width, height, 18);

const smoothAlpha = await sharp(Buffer.from(alpha), { raw: { width, height, channels: 1 } })
  .blur(0.4)
  .raw()
  .toBuffer();

const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const oi = i * 4;
  rgba[oi] = data[oi];
  rgba[oi + 1] = data[oi + 1];
  rgba[oi + 2] = data[oi + 2];
  const a = smoothAlpha[i];
  rgba[oi + 3] = a < 24 ? 0 : a;
}

const trimmed = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 10 })
  .png()
  .toBuffer();

await sharp(trimmed).toFile(path);
const meta = await sharp(path).metadata();
console.log(path, `${meta.width}x${meta.height}`);
