import { clamp } from '../engine.js';

export default function createCube({ scale = 1 } = {}) {
  return {
    fs: 13,
    draw(g, t) {
      for (let y = 1; y < g.rows; y += 3) for (let x = 1; x < g.cols; x += 4) g.put(x, y, '.', g.ink, 0.15);
      const mx = g.mouse.x / g.W - 0.5, my = g.mouse.y / g.H - 0.5;
      const ay = t * 0.6 + mx * 2, ax = t * 0.4 + my * 2;
      const S = Math.min(g.W, g.H) * 0.62 * scale;
      const V = [];
      for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) {
        const X = x * Math.cos(ay) + z * Math.sin(ay);
        let Z = -x * Math.sin(ay) + z * Math.cos(ay);
        const Y = y * Math.cos(ax) - Z * Math.sin(ax);
        Z = y * Math.sin(ax) + Z * Math.cos(ax);
        const f = 2.6 / (Z + 4.2);
        V.push({ x: g.W / 2 + X * S * f * 0.5, y: g.H / 2 + Y * S * f * 0.5, z: Z });
      }
      const E = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
      for (const [a, b] of E) {
        const A = V[a], B = V[b];
        let ang = Math.atan2(B.y - A.y, B.x - A.x);
        if (ang < 0) ang += Math.PI;
        const c = ang < Math.PI / 8 || ang > 7 * Math.PI / 8 ? '-' : ang < 3 * Math.PI / 8 ? '\\' : ang < 5 * Math.PI / 8 ? '|' : '/';
        const n = Math.ceil(Math.max(Math.abs(B.x - A.x) / g.cw, Math.abs(B.y - A.y) / g.ch)) * 1.2;
        const alpha = clamp(0.95 - (A.z + B.z) * 0.18, 0.35, 1);
        for (let k = 0; k <= n; k++) {
          const px = A.x + (B.x - A.x) * k / n, py = A.y + (B.y - A.y) * k / n;
          g.put(Math.floor(px / g.cw), Math.floor(py / g.ch), c, g.ink, alpha);
        }
      }
      for (const v of V) g.put(Math.floor(v.x / g.cw), Math.floor(v.y / g.ch), '@', g.accent);
    },
  };
}
