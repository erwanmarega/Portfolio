const SPRITE = [
  '..............##..............',
  '.............###..............',
  '............####..............',
  '...........#####..............',
  '##......###############.......',
  '###...###################.....',
  '.############################.',
  '..#####################o######',
  '.#############################',
  '###...#######################.',
  '##......######..#########.....',
  '.........###.....##...........',
  '..........#...................',
];

export default function createPixelShark({ loop = true, speed = 9, bubbles = true } = {}) {
  return {
    px: (g) => Math.min(10, Math.max(4, Math.round(g.H / 30))),
    init() {
      return {
        bubbles: Array.from({ length: 10 }, () => ({ x: Math.random(), y: Math.random(), s: 0.3 + Math.random() * 0.7 })),
      };
    },
    draw(g, t, s) {
      const sw = SPRITE[0].length, sh = SPRITE.length;
      const span = g.cols + sw + 8;
      if (!loop && g.reduced) { g.finish(); return; }
      const travel = loop ? (t * speed) % span : t * speed;
      const ox = Math.floor(travel - sw - 4);
      const oy = Math.floor(g.rows / 2 - sh / 2 + Math.sin(t * 1.4) * 2);
      if (bubbles) {
        for (const b of s.bubbles) {
          const by = ((b.y - t * 0.06 * b.s) % 1 + 1) % 1;
          const bx = Math.floor(b.x * g.cols + Math.sin(t * 2 + b.x * 9) * 1.5);
          g.rect(bx, Math.floor(by * g.rows), g.ink, 0.25, b.s > 0.6 ? 0 : g.cw * 0.4);
        }
      }
      for (let r = 0; r < sh; r++) for (let c = 0; c < sw; c++) {
        const ch = SPRITE[r][c];
        if (ch === '.') continue;
        const wob = c < 8 ? Math.round(Math.sin(t * 7 - c * 0.5) * (8 - c) / 5) : 0;
        g.rect(ox + c, oy + r + wob, ch === 'o' ? g.bg : g.ink, 1, 1);
      }
      if (!loop && ox > g.cols + 2) g.finish();
    },
  };
}
