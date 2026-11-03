const GLITCH = '!<>-_\\/[]{}=+*^?#%&$';

export default function createDecode({
  text = 'ERWAN',
  font = '800 {size}px system-ui, sans-serif',
  loop = true,
  duration = 7,
  fs = 12,
} = {}) {
  const fontFor = (size) =>
    font.includes('{size}') ? font.replace('{size}', size) : `800 ${size}px ${font}`;

  return {
    fs,
    init(g) {
      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.floor(g.W));
      off.height = Math.max(1, Math.floor(g.H));
      const o = off.getContext('2d');
      o.textAlign = 'center';
      o.textBaseline = 'alphabetic';
      o.font = fontFor(100);
      const m = o.measureText(text);
      const w = Math.max(1, m.width);
      const h = Math.max(1, m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
      const size = Math.max(4, Math.min((100 * g.W * 0.94) / w, (100 * g.H * 0.82) / h));
      o.font = fontFor(size);
      const k = size / 100;
      const asc = m.actualBoundingBoxAscent * k;
      const desc = m.actualBoundingBoxDescent * k;
      o.fillText(text, g.W / 2, g.H / 2 + (asc - desc) / 2);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const mask = new Uint8Array(g.cols * g.rows);
      const seed = new Float32Array(g.cols * g.rows);
      for (let y = 0; y < g.rows; y++) for (let x = 0; x < g.cols; x++) {
        const px = Math.min(off.width - 1, Math.floor((x + 0.5) * g.cw));
        const py = Math.min(off.height - 1, Math.floor((y + 0.5) * g.ch));
        mask[y * g.cols + x] = data[(py * off.width + px) * 4 + 3] > 128 ? 1 : 0;
        seed[y * g.cols + x] = Math.random();
      }
      return { mask, seed };
    },
    draw(g, t, s) {
      let p;
      if (loop) p = (t % duration) / duration;
      else p = Math.min(g.reduced ? 1 : t / duration, 1) * 0.8;
      for (let y = 0; y < g.rows; y++) for (let x = 0; x < g.cols; x++) {
        const i = y * g.cols + x, r = s.seed[i];
        const near = loop && g.mouse.active
          && Math.hypot((x + 0.5) * g.cw - g.mouse.x, (y + 0.5) * g.ch - g.mouse.y) < 60;
        if (s.mask[i]) {
          const settled = p * 1.7 > r && p < 0.82 + r * 0.16 && !near;
          const shown = p * 1.7 > r * 0.6 && p < 0.9 + r * 0.1;
          if (settled) g.put(x, y, (x + y) % 3 ? '@' : '#', g.ink);
          else if (shown) g.put(x, y, GLITCH[Math.floor(t * 18 + r * 50) % GLITCH.length], g.accent);
        } else if (((x * 7 + y * 13) % 11) === 0) {
          g.put(x, y, '.', g.ink, 0.18 + 0.12 * Math.sin(t * 2 + r * 6));
        }
      }
      if (!loop && (g.reduced || t >= duration)) g.finish();
    },
  };
}
