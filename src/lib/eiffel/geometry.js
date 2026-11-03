
const TOP_Y = 10;
const P1_Y = 1.8;
const P2_Y = 3.8;
const CAMPANILE_Y = 8.9;
const JITTER = 0.003;
const BASE_HALF = 2.0;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function halfWidth(y) {
  return 0.2 + (BASE_HALF - 0.2) * Math.exp(-0.4 * y);
}

export function halfWidthAt(y) {
  return y > CAMPANILE_Y + 0.25 ? 0.03 : halfWidth(y);
}

function legThickness(y) {
  const w = halfWidth(y);
  if (y <= P2_Y) return w * 0.4;
  const t = Math.min(1, (y - P2_Y) / 1.4);
  return w * 0.4 * (1 - t * t * (3 - 2 * t));
}

const CORNERS = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

function buildSegments() {
  const segs = [];
  const add = (a, b, weight, accent = 0) => segs.push([...a, ...b, weight, accent]);

  const STEPS = 36;
  for (const [sx, sz] of CORNERS) {
    for (const ix of [0, 1]) {
      for (const iz of [0, 1]) {
        let prev = null;
        for (let i = 0; i <= STEPS; i++) {
          const y = (i / STEPS) * CAMPANILE_Y;
          const w = halfWidth(y);
          const t = legThickness(y);
          const p = [sx * (w - ix * t), y, sz * (w - iz * t)];
          if (prev) add(prev, p, ix === 0 && iz === 0 ? 3 : 2, ix === 0 && iz === 0 ? 1 : 0);
          prev = p;
        }
      }
    }
  }

  const faces = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ];
  let y0 = P1_Y;
  while (y0 < CAMPANILE_Y - 0.05) {
    const step = Math.max(0.22, 0.2 + 0.5 * halfWidth(y0));
    const y1 = Math.min(CAMPANILE_Y, y0 + step);
    const w0 = halfWidth(y0);
    const w1 = halfWidth(y1);
    for (const [ia, ib] of faces) {
      const [ax, az] = CORNERS[ia];
      const [bx, bz] = CORNERS[ib];
      const a0 = [ax * w0, y0, az * w0];
      const b0 = [bx * w0, y0, bz * w0];
      const a1 = [ax * w1, y1, az * w1];
      const b1 = [bx * w1, y1, bz * w1];
      add(a0, b1, 0.8);
      add(b0, a1, 0.8);
      add(a1, b1, 1);
    }
    y0 = y1;
  }

  const legBox = (sx, sz, y) => {
    const w = halfWidth(y);
    const t = legThickness(y);
    return [
      [sx * w, y, sz * w],
      [sx * (w - t), y, sz * w],
      [sx * (w - t), y, sz * (w - t)],
      [sx * w, y, sz * (w - t)],
    ];
  };
  for (const [sx, sz] of CORNERS) {
    let ly = 0;
    while (ly < P2_Y - 0.05) {
      const step = 0.28 + 0.35 * halfWidth(ly);
      const ly1 = Math.min(P2_Y, ly + step);
      const lo = legBox(sx, sz, ly);
      const hi = legBox(sx, sz, ly1);
      for (let k = 0; k < 4; k++) {
        const n = (k + 1) % 4;
        add(hi[k], hi[n], 0.9);
        add(lo[k], hi[n], 0.55);
        add(lo[n], hi[k], 0.55);
      }
      ly = ly1;
    }
  }

  const ARCH_STEPS = 24;
  const w0 = halfWidth(0);
  const archSpan = w0 * 0.82;
  const archH = P1_Y * 0.72;
  for (const [fx, fz] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    let prev = null;
    for (let i = 0; i <= ARCH_STEPS; i++) {
      const a = (i / ARCH_STEPS) * Math.PI;
      const u = Math.cos(a) * archSpan;
      const y = Math.sin(a) ** 0.8 * archH;
      const wy = halfWidth(y) * (w0 / halfWidth(0));
      const p = fx !== 0 ? [fx * wy, y, u] : [u, y, fz * wy];
      if (prev) add(prev, p, 2.2, 0);
      prev = p;
    }
  }

  const ring = (y, h, weight, accent) => {
    for (let i = 0; i < 4; i++) {
      const [ax, az] = CORNERS[i];
      const [bx, bz] = CORNERS[(i + 1) % 4];
      add([ax * h, y, az * h], [bx * h, y, bz * h], weight, accent);
    }
  };
  const railing = (y, h, height, posts) => {
    ring(y + height, h, 2, 0);
    for (let i = 0; i < 4; i++) {
      const [ax, az] = CORNERS[i];
      const [bx, bz] = CORNERS[(i + 1) % 4];
      for (let k = 0; k <= posts; k++) {
        const u = k / posts;
        const x = (ax + (bx - ax) * u) * h;
        const z = (az + (bz - az) * u) * h;
        add([x, y, z], [x, y + height, z], 0.8);
      }
    }
  };
  const deck = (y, outer, inner) => {
    for (let i = 0; i < 4; i++) {
      const [ax, az] = CORNERS[i];
      const [bx, bz] = CORNERS[(i + 1) % 4];
      for (const u of [0, 0.5]) {
        const fx = ax + (bx - ax) * u;
        const fz = az + (bz - az) * u;
        add([fx * outer, y, fz * outer], [fx * inner, y, fz * inner], 1.2);
      }
    }
    for (const [sx, sz] of [
      [1, 1],
      [1, -1],
    ]) {
      add([sx * inner, y, sz * inner], [-sx * inner, y, -sz * inner], 0.8);
    }
  };
  const p1 = halfWidth(P1_Y) + 0.18;
  ring(P1_Y, p1, 5, 1);
  ring(P1_Y, p1 * 0.82, 3, 0);
  ring(P1_Y - 0.12, p1, 2.5, 0);
  railing(P1_Y, p1, 0.1, 8);
  deck(P1_Y, p1, p1 * 0.82);
  const p2 = halfWidth(P2_Y) + 0.14;
  ring(P2_Y, p2, 5, 1);
  ring(P2_Y, p2 * 0.78, 3, 0);
  ring(P2_Y - 0.1, p2, 2, 0);
  railing(P2_Y, p2, 0.08, 6);
  deck(P2_Y, p2, p2 * 0.78);

  const c = 0.3;
  ring(CAMPANILE_Y, c, 6, 1);
  ring(CAMPANILE_Y - 0.25, c * 0.8, 4, 0);
  ring(CAMPANILE_Y + 0.25, c * 0.55, 4, 1);
  for (const [sx, sz] of CORNERS) {
    add([sx * c * 0.8, CAMPANILE_Y - 0.25, sz * c * 0.8], [sx * c, CAMPANILE_Y, sz * c], 3, 1);
    add([sx * c, CAMPANILE_Y, sz * c], [sx * c * 0.55, CAMPANILE_Y + 0.25, sz * c * 0.55], 3, 1);
  }
  add([0, CAMPANILE_Y + 0.25, 0], [0, TOP_Y, 0], 8, 1);

  return segs;
}

const C_SOFT = [0xf9 / 255, 0xa8 / 255, 0xd4 / 255];
const C_ACCENT = [0xec / 255, 0x48 / 255, 0x99 / 255];
const C_BRIGHT = [0xfb / 255, 0xcf / 255, 0xe8 / 255];

export function createEiffelPositions(count, { seed = 1337 } = {}) {
  const rand = mulberry32(seed);
  const segs = buildSegments();

  const cum = new Float64Array(segs.length);
  let total = 0;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const len = Math.hypot(s[3] - s[0], s[4] - s[1], s[5] - s[2]);
    s.push(len);
    total += len * s[6];
    cum[i] = total;
  }

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let n = 0; n < count; n++) {
    const r = rand() * total;
    let lo = 0;
    let hi = segs.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    const s = segs[lo];
    const t = rand();
    const y = s[1] + (s[4] - s[1]) * t;
    const j = JITTER;
    const x = s[0] + (s[3] - s[0]) * t + (rand() - 0.5) * j * 2;
    const yy = Math.min(TOP_Y, Math.max(0, y + (rand() - 0.5) * j * 2));
    const z = s[2] + (s[5] - s[2]) * t + (rand() - 0.5) * j * 2;
    positions[n * 3] = x;
    positions[n * 3 + 1] = yy;
    positions[n * 3 + 2] = z;

    const mix = rand();
    const base = s[7] ? C_BRIGHT : mix < 0.6 ? C_SOFT : C_ACCENT;
    const k = s[7] ? 1 : 0.75 + rand() * 0.25;
    const tip = yy > CAMPANILE_Y ? 1 : 0;
    colors[n * 3] = tip ? 1 : base[0] * k;
    colors[n * 3 + 1] = tip ? 0.82 : base[1] * k;
    colors[n * 3 + 2] = tip ? 0.92 : base[2] * k;
  }

  return { positions, colors };
}

export function createEiffelLines() {
  const segs = buildSegments();
  const positions = new Float32Array(segs.length * 6);
  const colors = new Float32Array(segs.length * 6);
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const c = s[7] ? C_BRIGHT : C_SOFT;
    for (let k = 0; k < 6; k++) {
      positions[i * 6 + k] = s[k];
      colors[i * 6 + k] = c[k % 3];
    }
  }
  return { positions, colors };
}
