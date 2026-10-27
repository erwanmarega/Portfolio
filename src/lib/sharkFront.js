import { CELL, KIND } from './sharkEngine';

export const FRONT = {
  headW: 1,
  headDown: 0.72,
  headUp: 0.64,
  power: 2.4,
  mouthY: 0.22,
  mouthW: 0.62,
  mouthMin: 0.04,
  mouthOpen: 0.4,
  teeth: 9,
};

function hash(i, j, k) {
  let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(k, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function inTri(px, py, ax, ay, bx, by, cx, cy) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy);
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
}

export function dissolve(world, box, keep) {
  if (!box || keep >= 1) return;
  const { cols, kind } = world;
  for (let r = box.r0; r <= box.r1; r++) {
    for (let c = box.c0; c <= box.c1; c++) {
      const idx = r * cols + c;
      if (kind[idx] !== KIND.empty && hash(c, r, 7) >= keep) kind[idx] = KIND.empty;
    }
  }
}

export function rasterizeFront(world, o) {
  const { cols, rows, kind, value, alpha } = world;
  const { cx, cy, R, sx, m, keep } = o;
  const rx = Math.max(R * sx, 1);
  const c0 = Math.max(0, Math.floor((cx - rx * 1.5) / CELL));
  const c1 = Math.min(cols - 1, Math.ceil((cx + rx * 1.5) / CELL));
  const r0 = Math.max(0, Math.floor((cy - R * 1.12) / CELL));
  const r1 = Math.min(rows - 1, Math.ceil((cy + R * 0.85) / CELL));
  const box = { c0, c1, r0, r1 };
  if (c1 < c0 || r1 < r0) return box;

  const { power: P, mouthY: MY, mouthW: MW, teeth: TEETH } = FRONT;
  const hh = FRONT.mouthMin + FRONT.mouthOpen * m;
  const minAxis = Math.max(1, Math.min(MW * rx, hh * R));
  const rimR = Math.min(1.6, 1 + (CELL * 1.6) / minAxis);
  const toothLen = Math.max(CELL * 1.5, Math.min(0.13 * R, hh * R * 0.95));
  const throatLen = toothLen + Math.min(toothLen * 0.8, 60);
  const eyeR = Math.max(CELL * 0.6, Math.min(0.05 * R, 40));
  const nostrilR = Math.max(CELL * 0.5, Math.min(0.02 * R, 14));

  for (let r = r0; r <= r1; r++) {
    const py = r * CELL + CELL / 2;
    const v = (py - cy) / R;
    const vs = v < 0 ? v / FRONT.headUp : v / FRONT.headDown;
    const vp = Math.pow(Math.abs(vs), P);
    const dv = v - MY;
    for (let c = c0; c <= c1; c++) {
      if (keep < 1 && hash(c, r, 13) >= keep) continue;
      const px = c * CELL + CELL / 2;
      const u = (px - cx) / rx;
      const au = Math.abs(u);
      const idx = r * cols + c;

      if (Math.pow(au, P) + vp >= 1) {
        const fin = (v < -0.6 && v > -1.05 && au < (0.12 * (v + 1.05)) / 0.4)
          || (au > 0.7 && inTri(au, v, 0.82, 0.2, 1.4, 0.65, 0.8, 0.6));
        if (fin) { kind[idx] = KIND.fin; value[idx] = 0; alpha[idx] = 1; }
        continue;
      }

      const ux = u / MW;
      const e = ux * ux + (dv * dv) / (hh * hh);
      if (e < 1) {
        if (Math.abs(ux) < 0.94) {
          const bottom = dv > 0;
          const ph = (ux * 0.5 + 0.5) * TEETH + (bottom ? 0.5 : 0);
          const fr = ph - Math.floor(ph);
          const depth = (hh * Math.sqrt(1 - ux * ux) - Math.abs(dv)) * R;
          if (depth < toothLen * (1 - Math.abs(2 * fr - 1))) {
            kind[idx] = KIND.tooth;
            value[idx] = bottom ? 1 : 0;
            alpha[idx] = 1;
            continue;
          }
        }
        const depth = (hh * Math.sqrt(Math.max(0, 1 - ux * ux)) - Math.abs(dv)) * R;
        if (depth < throatLen) { kind[idx] = KIND.throat; alpha[idx] = 1 - depth / throatLen; }
        continue;
      }
      if (e < rimR * rimR) { kind[idx] = KIND.gum; alpha[idx] = 1; continue; }

      if (Math.hypot((au - 0.72) * rx, (v + 0.12) * R) < eyeR) {
        kind[idx] = KIND.eye; alpha[idx] = 1;
      } else if (Math.hypot((au - 0.22) * rx, (v + 0.38) * R) < nostrilR) {
        kind[idx] = KIND.gum; alpha[idx] = 1;
      } else {
        kind[idx] = KIND.body;
        value[idx] = Math.max(0.05, Math.min(1, 0.55 - v * 0.78));
        alpha[idx] = 1;
      }
    }
  }
  return box;
}
