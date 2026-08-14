/* Generowanie faviconów z ZNAKU (stylizowana litera "P") logo.png
   Znak: bbox x=[569..896], y=[4..220] (328x217) — oddzielny glif między "psycholog" a "lebaniak".
   Kompozycja: contain na kwadracie #FAF8F5, padding 8%.
   Render: 512 -> downscale 192/180/32.
   Użycie: node scripts/gen-favicons.cjs */
const sharp = require('sharp');
const fs = require('fs');

const CROP = { left: 569, top: 4, width: 328, height: 217 };
const BG = { r: 248, g: 245, b: 240 };      // tło logo.png
const CREAM = { r: 250, g: 248, b: 245 };   // #FAF8F5 (kolor strony)
const PAD = 0.08;                            // 8% paddingu

async function emblemWithAlpha() {
  const { data, info } = await sharp('public/logo.png')
    .extract(CROP).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const dist = Math.abs(r - BG.r) + Math.abs(g - BG.g) + Math.abs(b - BG.b);
    const alpha = Math.max(0, Math.min(255, Math.round((dist - 10) * 18)));
    out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = alpha;
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } });
}

async function render(size) {
  const inner = Math.round(size * (1 - 2 * PAD));
  const emblem = await emblemWithAlpha();
  // 1) przeskaluj znak z zachowaniem proporcji do inner x inner (tło przezroczyste)
  const scaled = await emblem
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toBuffer();
  // 2) wyśrodkuj na kanwie size x size i zalej kremem
  const off = Math.round((size - inner) / 2);
  const canvas = await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: scaled, left: off, top: off }])
    .flatten({ background: CREAM })
    .png().toBuffer();
  return canvas;
}

(async () => {
  const big = await render(512);
  fs.writeFileSync('public/favicon-512.png', big);
  for (const s of [192, 180, 32]) {
    const buf = await sharp(big).resize(s, s).png().toBuffer();
    const name = s === 180 ? 'public/apple-touch-icon.png' : `public/favicon-${s}.png`;
    fs.writeFileSync(name, buf);
  }
  // weryfikacja
  for (const f of ['favicon-32.png', 'favicon-192.png', 'favicon-512.png', 'apple-touch-icon.png']) {
    const m = await sharp('public/' + f).metadata();
    console.log(`${f}: ${m.width}x${m.height} ${m.channels}ch ${(fs.statSync('public/' + f).size / 1024).toFixed(1)}KB`);
  }
})();
