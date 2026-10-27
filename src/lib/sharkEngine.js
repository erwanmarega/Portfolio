export const FONT = '"SF Mono", Menlo, Consolas, monospace';
export const CELL = 11;
export const SPINE_POINTS = 24;
export const RAMP = ['.', ':', 't', 'S', '%', 'X', '8', '#', '@'];
export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const MAX_TILT = 0.45;
export const KIND = { empty: 0, body: 1, halo: 2, eye: 3, gill: 4, fin: 5, tooth: 6, gum: 7, throat: 8 };
export const COLORS = {
  back: [219, 39, 119],
  belly: [249, 168, 212],
  fin: [190, 24, 93],
  eye: [60, 7, 30],
};

export const FRAME_MS = 1000 / (reducedMotion ? 15 : 30);
export const MAX_DT = reducedMotion ? 0.1 : 0.05;

export function createWorld() {
  return {
    W: 0, H: 0, cols: 0, rows: 0,
    value: null, kind: null, alpha: null,
    sharks: [],
    mouse: { x: -9999, y: -9999 },
  };
}

export function resizeWorld(world, w, h) {
  world.W = w;
  world.H = h;
  world.cols = Math.ceil(w / CELL);
  world.rows = Math.ceil(h / CELL);
  world.value = new Float32Array(world.cols * world.rows);
  world.kind = new Uint8Array(world.cols * world.rows);
  world.alpha = new Float32Array(world.cols * world.rows);
}

export function clearWorld(world) {
  world.value.fill(0);
  world.kind.fill(0);
}

export function clearBox(world, box) {
  if (!box || box.c1 < box.c0 || box.r1 < box.r0) return;
  for (let r = box.r0; r <= box.r1; r++) {
    const a = r * world.cols + box.c0, b = r * world.cols + box.c1 + 1;
    world.value.fill(0, a, b);
    world.kind.fill(0, a, b);
  }
}

export function mix(from, to, t) {
  return from.map((v, i) => Math.round(v + (to[i] - v) * t));
}

export function rgba([r, g, b], a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function rand(min, max) {
  return min + Math.random() * (max - min);
}

function hash(i, j, k) {
  let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(k, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function backHeight(u) {
  if (u < 0 || u > 0.9) return 0;
  if (u < 0.3) return 0.95 * Math.pow(u / 0.3, 0.55);
  return 0.95 - 0.83 * Math.pow((u - 0.3) / 0.6, 0.8);
}

function bellyDepth(u) {
  if (u < 0.02 || u > 0.9) return 0;
  if (u < 0.32) return 0.8 * Math.pow((u - 0.02) / 0.3, 0.75);
  return 0.8 - 0.68 * Math.pow((u - 0.32) / 0.58, 0.8);
}

const FINS = [
  [[0.31, 0.8], [0.5, 2.4], [0.53, 2.25], [0.47, 0.62]],
  [[0.72, 0.32], [0.79, 0.85], [0.81, 0.28]],
  [[0.27, -0.55], [0.47, -1.95], [0.43, -0.5]],
  [[0.63, -0.33], [0.7, -0.85], [0.71, -0.3]],
  [[0.76, -0.22], [0.81, -0.62], [0.82, -0.18]],
  [[0.82, 0.04], [1.08, 2.0], [0.95, -0.06]],
  [[0.86, -0.02], [1.02, -1.35], [0.96, 0.06]],
];

function inPolygon(px, py, poly) {
  let neg = false, pos = false;
  for (let i = 0; i < poly.length; i++) {
    const [ax, ay] = poly[i], [bx, by] = poly[(i + 1) % poly.length];
    const cross = (bx - ax) * (py - ay) - (by - ay) * (px - ax);
    if (cross < 0) neg = true; else if (cross > 0) pos = true;
    if (neg && pos) return false;
  }
  return true;
}

function shade(u, y, roll, haloA) {
  const top = backHeight(u), bot = bellyDepth(u);
  if (y < top && y > -bot) {
    if (Math.hypot((u - 0.09) / 0.018, (y - 0.3) / 0.22) < 1) return 2;
    if (u > 0.2 && u < 0.235 && Math.abs(y + 0.05) < 0.45) return 3;
    return Math.max(0.05, (y + bot) / (top + bot));
  }
  const r = Math.max(Math.abs(roll), 0.05);
  for (const fin of FINS) if (inPolygon(u, y / r, fin)) return 4;
  if (u > -0.04 && u < 0.9 && y < top + haloA && y > -bot - haloA) return -1;
  return 0;
}

export function createShark(world, slot, count) {
  const { W, H } = world;
  const depth = Math.random();
  const L = 220 + depth * 200;
  const s = {
    L,
    L0: L,
    maxW: L * 0.13,
    depth,
    ga: 1,
    speed: (45 + depth * 45) * (reducedMotion ? 0.3 : 1),
    angle: (Math.random() < 0.5 ? 0 : Math.PI) + rand(-0.4, 0.4),
    tx: 0,
    ty: 0,
    timer: 0,
    phase: rand(0, Math.PI * 2),
    x: rand((W * slot) / count, (W * (slot + 1)) / count),
    y: rand(H * 0.2, H * 0.8),
    trail: [],
    spine: [],
    roll: 1,
  };
  s.roll = Math.cos(s.angle) >= 0 ? 1 : -1;
  for (let d = 0; d <= L * 1.3; d += 4) {
    s.trail.push({ x: s.x - Math.cos(s.angle) * d, y: s.y - Math.sin(s.angle) * d });
  }
  return s;
}

export function translateShark(s, dx, dy) {
  s.x += dx; s.y += dy; s.tx += dx; s.ty += dy;
  for (const p of s.trail) { p.x += dx; p.y += dy; }
  for (const p of s.spine) { p.x += dx; p.y += dy; }
}

function pickTarget(s, world) {
  const { W, H, sharks } = world;
  const right = Math.cos(s.angle) >= 0;
  const goRight = right ? s.x < W + s.L * 0.8 : s.x < -s.L * 0.8;
  const [minX, maxX] = goRight ? [W + s.L, W + s.L * 1.5] : [-s.L * 1.5, -s.L];
  let best = -1;
  for (let i = 0; i < 6; i++) {
    const tx = rand(minX, maxX), ty = rand(H * 0.15, H * 0.85);
    let gap = Infinity;
    for (const o of sharks) {
      if (o !== s) gap = Math.min(gap, Math.hypot(tx - o.x, ty - o.y), Math.hypot(tx - o.tx, ty - o.ty));
    }
    if (gap > best) { best = gap; s.tx = tx; s.ty = ty; }
  }
  s.timer = rand(6, 12);
}

export function angleDiff(a, b) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}

export function updateShark(s, dt, world) {
  const { sharks, mouse } = world;
  s.timer -= dt;
  if (s.timer <= 0 || Math.hypot(s.tx - s.x, s.ty - s.y) < s.L * 0.5) pickTarget(s, world);
  let desired = Math.atan2(s.ty - s.y, s.tx - s.x);

  let avoiding = false;
  for (const o of sharks) {
    if (o === s) continue;
    let gap = Infinity, nx = 0, ny = 0;
    for (const p of o.spine) {
      const g = Math.hypot(s.x - p.x, s.y - p.y);
      if (g < gap) { gap = g; nx = p.x; ny = p.y; }
    }
    if (gap < o.maxW * 4 + s.L * 0.5) {
      desired = Math.atan2(s.y - ny, s.x - nx);
      avoiding = true;
      if (s.timer > 1) s.timer = 1;
    }
  }

  let boost = 0;
  const dist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
  if (dist < 220) {
    desired = Math.atan2(s.y - mouse.y, s.x - mouse.x);
    boost = 1.5 * (1 - dist / 220);
  }

  moveShark(s, dt, desired, 0.6 + boost + (avoiding ? 0.8 : 0), 1 + boost);
}

export function moveShark(s, dt, desired, turnRate, speedMul, maxTilt = MAX_TILT) {
  easeShark(s, dt);

  const c = Math.cos(desired);
  const heading = c > 0.2 ? 0 : c < -0.2 ? Math.PI : Math.cos(s.angle) >= 0 ? 0 : Math.PI;
  desired = heading + Math.max(-maxTilt, Math.min(maxTilt, angleDiff(heading, desired)));

  const maxTurn = turnRate * dt;
  s.angle += Math.max(-maxTurn, Math.min(maxTurn, angleDiff(s.angle, desired)));

  const speed = s.speed * speedMul;
  s.x += Math.cos(s.angle) * speed * dt;
  s.y += Math.sin(s.angle) * speed * dt;
  s.phase += dt * speed / s.L * 7;

  const facing = Math.cos(s.angle);
  const rollTarget = facing > 0.15 ? 1 : facing < -0.15 ? -1 : Math.sign(s.roll);
  s.roll += (rollTarget - s.roll) * Math.min(1, dt * 4);

  s.trail.unshift({ x: s.x, y: s.y });
  let len = 0;
  for (let i = 1; i < s.trail.length; i++) {
    len += Math.hypot(s.trail[i].x - s.trail[i - 1].x, s.trail[i].y - s.trail[i - 1].y);
    if (len > s.L * 1.3) { s.trail.length = i + 1; break; }
  }

  buildSpine(s);
}

function easeShark(s, dt) {
  const k = Math.min(1, dt * 1.5);
  if (s.Lgoal !== undefined) {
    s.L += (s.Lgoal - s.L) * k;
    if (Math.abs(s.Lgoal - s.L) < 0.5) { s.L = s.Lgoal; s.Lgoal = undefined; }
    s.maxW = s.L * 0.13;
  }
  if (s.gaGoal !== undefined) {
    s.ga += (s.gaGoal - s.ga) * k;
    if (Math.abs(s.gaGoal - s.ga) < 0.01) { s.ga = s.gaGoal; s.gaGoal = undefined; }
  }
}

export function buildSpine(s) {
  const pts = [];
  const step = s.L / (SPINE_POINTS - 1);
  let target = 0, acc = 0, i = 0;
  while (pts.length < SPINE_POINTS) {
    const a = s.trail[i], b = s.trail[i + 1];
    if (!b) { pts.push({ x: a.x, y: a.y }); continue; }
    const seg = Math.hypot(b.x - a.x, b.y - a.y);
    if (acc + seg >= target) {
      const t = seg ? (target - acc) / seg : 0;
      pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      target += step;
    } else {
      acc += seg;
      i++;
    }
  }

  s.spine = pts.map((p, k) => {
    const u = k / (SPINE_POINTS - 1);
    const q = pts[Math.min(k + 1, SPINE_POINTS - 1)], r = pts[Math.max(k - 1, 0)];
    const dx = q.x - r.x, dy = q.y - r.y;
    const len = Math.hypot(dx, dy) || 1;
    const wave = Math.sin(s.phase - u * Math.PI * 1.8) * s.L * 0.025 * Math.pow(u, 1.5);
    return { x: p.x - (dy / len) * wave, y: p.y + (dx / len) * wave };
  });
}

export function rasterize(s, world) {
  const { cols, rows, kind, value, alpha } = world;
  const sp = s.spine;
  const pad = s.maxW * 2.8;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of sp) {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }
  const c0 = Math.max(0, Math.floor((minX - pad) / CELL));
  const c1 = Math.min(cols - 1, Math.ceil((maxX + pad) / CELL));
  const r0 = Math.max(0, Math.floor((minY - pad) / CELL));
  const r1 = Math.min(rows - 1, Math.ceil((maxY + pad) / CELL));
  const last = SPINE_POINTS - 2;
  const haloA = (CELL * 1.1) / s.maxW;
  const dim = (0.45 + s.depth * 0.55) * s.ga;

  for (let r = r0; r <= r1; r++) {
    const py = r * CELL + CELL / 2;
    for (let c = c0; c <= c1; c++) {
      const px = c * CELL + CELL / 2;

      let best = Infinity, u = 0, d = 0;
      for (let i = 0; i <= last; i++) {
        const a = sp[i], b = sp[i + 1];
        const ex = b.x - a.x, ey = b.y - a.y;
        const len2 = ex * ex + ey * ey || 1;
        const t = ((px - a.x) * ex + (py - a.y) * ey) / len2;
        const tc = Math.max(0, Math.min(1, t));
        const qx = a.x + ex * tc - px, qy = a.y + ey * tc - py;
        const dist2 = qx * qx + qy * qy;
        if (dist2 < best) {
          best = dist2;
          const tu = (i === 0 && t < 0) || (i === last && t > 1) ? t : tc;
          u = (i + tu) / (SPINE_POINTS - 1);
          d = ((px - a.x) * ey - (py - a.y) * ex) / Math.sqrt(len2);
        }
      }

      const y = (-d * Math.sign(s.roll)) / s.maxW;
      const v = shade(u, y, s.roll, haloA);
      if (v === 0) continue;
      const idx = r * cols + c;
      if (v === -1) {
        if (kind[idx] === 0) {
          kind[idx] = KIND.halo;
          alpha[idx] = dim;
        }
        continue;
      }
      kind[idx] = v === 2 ? KIND.eye : v === 3 ? KIND.gill : v === 4 ? KIND.fin : KIND.body;
      value[idx] = v < 1 ? v : 0.5;
      alpha[idx] = dim;
    }
  }
  return { c0, c1, r0, r1 };
}

const GLYPH_COLORS = {
  light: { rgb: [255, 240, 248], chars: RAMP },
  fin: { rgb: COLORS.fin, chars: RAMP },
  eye: { rgb: COLORS.eye, chars: [')'] },
  finGlyph: { rgb: [255, 228, 240], chars: ['#', '%'] },
  white: { rgb: [255, 255, 255], chars: ['o'] },
  back: { rgb: COLORS.back, chars: ['.', "'"] },
  dash: { rgb: [30, 40, 55], chars: ['-'] },
  toothGlyph: { rgb: COLORS.fin, chars: ['^', 'v'] },
};
const GLYPH_PAD = 1;
export const atlas = {};

export function buildAtlas() {
  if (atlas.light) return;
  const size = CELL + GLYPH_PAD * 2;
  for (const [name, { rgb, chars }] of Object.entries(GLYPH_COLORS)) {
    atlas[name] = {};
    for (const ch of chars) {
      const g = document.createElement('canvas');
      g.width = g.height = size;
      const gc = g.getContext('2d');
      gc.font = `${Math.round(CELL * 0.78)}px ${FONT}`;
      gc.textAlign = 'center';
      gc.textBaseline = 'middle';
      gc.fillStyle = rgba(rgb, 1);
      gc.fillText(ch, size / 2, size / 2);
      atlas[name][ch] = g;
    }
  }
}

const BODY_STEPS = 32;
const BODY_LUT = Array.from({ length: BODY_STEPS + 1 }, (_, i) => {
  const [r, g, b] = mix(COLORS.belly, COLORS.back, Math.pow(i / BODY_STEPS, 0.8));
  return `rgb(${r}, ${g}, ${b})`;
});
const FIN_FILL = rgba(COLORS.fin, 1);
const EYE_FILL = rgba(COLORS.eye, 1);
const TOOTH_FILL = 'rgb(255, 250, 252)';
const GUM_FILL = rgba(mix(COLORS.fin, COLORS.eye, 0.5), 1);

let colSin, rowSin, diagSin;

export function isSolid(world, idx) {
  const k = world.kind[idx];
  return k !== KIND.empty && k !== KIND.halo;
}

export function drawCells(ctx, world, t, box, wave) {
  const { cols, rows, kind, value, alpha } = world;
  const c0 = box ? box.c0 : 0, c1 = box ? box.c1 : cols - 1;
  const r0 = box ? box.r0 : 0, r1 = box ? box.r1 : rows - 1;

  ctx.globalAlpha = 1;
  const tick = Math.floor(t * 4);
  let fill = null;
  const setFill = (f) => { if (f !== fill) { ctx.fillStyle = f; fill = f; } };
  const glyph = (g, x, y, a) => {
    ctx.globalAlpha = a;
    ctx.drawImage(g, x - GLYPH_PAD, y - GLYPH_PAD);
  };

  if (wave) {
    if (!colSin || colSin.length < cols) colSin = new Float32Array(cols);
    if (!rowSin || rowSin.length < rows) rowSin = new Float32Array(rows);
    if (!diagSin || diagSin.length < cols + rows) diagSin = new Float32Array(cols + rows);
    for (let c = 0; c < cols; c++) colSin[c] = Math.sin(c * 0.31 + t * 0.6);
    for (let r = 0; r < rows; r++) rowSin[r] = Math.sin(r * 0.43 - t * 0.4);
    for (let i = 0; i < cols + rows; i++) diagSin[i] = Math.sin(i * 0.17 + t * 0.8);
  }

  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const idx = r * cols + c;
      const x = c * CELL, y = r * CELL;
      const k = kind[idx];

      const a = alpha[idx];

      if (k === KIND.body || k === KIND.gill) {
        const n = hash(c, r, tick);
        const v = Math.max(0, Math.min(1, value[idx] + (n - 0.5) * 0.12));
        setFill(BODY_LUT[Math.round(v * BODY_STEPS)]);
        ctx.globalAlpha = 0.35 + a * 0.6;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
        if (k === KIND.gill) {
          glyph(atlas.eye[')'], x, y, 0.55 * a);
        } else {
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
          if (v > 0.55) glyph(atlas.light[ch], x, y, 0.35 + v * 0.3);
          else glyph(atlas.fin[ch], x, y, 0.3 + v * 0.3);
        }
      } else if (k === KIND.fin) {
        setFill(FIN_FILL);
        ctx.globalAlpha = 0.3 + a * 0.6;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
        glyph(atlas.finGlyph[hash(c, r, 5) < 0.5 ? '#' : '%'], x, y, 0.4 * a);
      } else if (k === KIND.eye) {
        setFill(EYE_FILL);
        ctx.globalAlpha = 0.5 + a * 0.5;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
        glyph(atlas.white.o, x, y, 0.9);
      } else if (k === KIND.tooth) {
        setFill(TOOTH_FILL);
        ctx.globalAlpha = 0.95 * a;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
        glyph(atlas.toothGlyph[value[idx] > 0.5 ? '^' : 'v'], x, y, 0.55 * a);
      } else if (k === KIND.throat) {
        setFill(EYE_FILL);
        ctx.globalAlpha = 0.9 * a;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
      } else if (k === KIND.gum) {
        setFill(GUM_FILL);
        ctx.globalAlpha = 0.9 * a;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
      } else if (k === KIND.halo) {
        if (hash(c, r, tick >> 1) < 0.45) {
          glyph(atlas.back[hash(c, r, 3) < 0.7 ? '.' : "'"], x, y, 0.3 * a);
        }
      } else if (wave) {
        const w = colSin[c] * rowSin[r] + diagSin[c + r];
        if (w > 1.55 && hash(c, r, 11) < 0.35) {
          glyph(atlas.dash['-'], x, y, (w - 1.55) * 0.6);
        }
      }
    }
  }
  ctx.globalAlpha = 1;
}
