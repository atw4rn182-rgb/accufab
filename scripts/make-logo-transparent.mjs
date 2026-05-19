import sharp from "sharp";

const src = process.argv[2];
const out = "public/brand/accufab-wordmark.png";

function isForeground(r, g, b) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const blue = b > r + 8 && b >= g - 6 && spread > 12;
  const metal = lum > 68 && spread < 100;
  return blue || metal;
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const rgba = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const si = (y * width + x) * channels;
    const oi = (y * width + x) * 4;
    const r = data[si];
    const g = data[si + 1];
    const b = data[si + 2];
    rgba[oi] = r;
    rgba[oi + 1] = g;
    rgba[oi + 2] = b;
    rgba[oi + 3] = isForeground(r, g, b) ? 255 : 0;
  }
}

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 1 })
  .png()
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(out, `${meta.width}x${meta.height}`, "alpha:", meta.hasAlpha);
