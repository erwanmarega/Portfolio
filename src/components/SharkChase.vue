<template>
  <canvas
    ref="canvasEl"
    class="pointer-events-none fixed inset-0 z-40 h-full w-full"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CELL, MAX_DT, reducedMotion, createWorld, resizeWorld, clearBox, rasterize,
  buildAtlas, drawCells, moveShark, translateShark, buildSpine,
} from "../lib/sharkEngine";
import { rasterizeFront, dissolve } from "../lib/sharkFront";
import { chase, setChaseController } from "../lib/sharkChase";

const canvasEl = ref(null);
let canvas = null;
let ctx = null;
let rafId = null;
let last = performance.now();
let pageVisible = true;

const world = createWorld();
world.sharks = [];
const frame = { W: 0, H: 0, mouse: world.mouse, scrollVelocity: 0, mobile: false };

const HANDOFF_OUT = 0.85;
const HANDOFF_BACK = 0.95;
const VEL_EASE = 6;
const ANCHOR_EASE = 5;
const CHASE_VEL = 500;
const SPEED_EASE = 5;
const TILT_IDLE = 0.45;
const TILT_DIVE = 1.25;
const TURN_RADIUS = 160;
const HOLD_EASE = 5;

const ease = (dt, rate) => 1 - Math.exp(-dt * rate);

let prevBox = null;
let orbitDir = 0;
const follow = { x: 0, y: 0, vs: 0, w: 0, speed: 1, turn: 1.3, scrollY: 0 };

const TURN_END = 0.1;
const JAWS_START = 0.1;
const JAWS_END = 0.65;
const MOUTH_OPEN_END = 0.3;
const EATEN = 0.65;
const stage = { a: 0, p: 0 };
let att = null;

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (x) => x * x * (3 - 2 * x);

function isMobile() {
  return window.innerWidth < 640;
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  resizeWorld(world, canvas.width, canvas.height);
  prevBox = null;
  frame.W = world.W;
  frame.H = world.H;
  frame.mobile = isMobile();
  const s = chase.shark;
  if (s && chase.owner === "chase") applyMobile(s);
}

function applyMobile(s) {
  s.Lgoal = frame.mobile ? s.L0 * 0.5 : s.L0;
  s.gaGoal = frame.mobile ? 0.5 : 1;
}

function anchor() {
  const { W, H, mouse } = world;
  const has = mouse.x > -999 && mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
  return has ? { x: mouse.x, y: mouse.y } : { x: W / 2, y: H / 2 };
}

function resetFollow(s) {
  const P = anchor();
  follow.x = P.x;
  follow.y = P.y;
  follow.vs = 0;
  follow.w = 0;
  follow.speed = 1;
  follow.turn = 1.3;
  follow.scrollY = window.scrollY;
  orbitDir = 0;
  if (s) applyMobile(s);
}

function huntShark(s, dt) {
  const y = window.scrollY;
  const delta = y - follow.scrollY;
  follow.scrollY = y;
  follow.vs += (delta / Math.max(dt, 0.001) - follow.vs) * ease(dt, VEL_EASE);
  const v = Math.abs(follow.vs);
  frame.scrollVelocity = v;
  if (delta) translateShark(s, 0, -delta);

  const P = anchor();
  follow.x += (P.x - follow.x) * ease(dt, ANCHOR_EASE);
  follow.y += (P.y - follow.y) * ease(dt, ANCHOR_EASE);
  const ax = follow.x, ay = follow.y;

  const rx = Math.max(170, s.L * 0.75);
  const ry = rx * 0.45;
  const th = Math.atan2((s.y - ay) / ry, (s.x - ax) / rx);
  if (!orbitDir) {
    const cross = (s.x - ax) * Math.sin(s.angle) - (s.y - ay) * Math.cos(s.angle);
    orbitDir = cross >= 0 ? 1 : -1;
  }
  const ta = th + orbitDir * 0.8;
  const ox = ax + rx * Math.cos(ta), oy = ay + ry * Math.sin(ta);

  const wGoal = Math.min(1, v / CHASE_VEL);
  const wTarget = wGoal * wGoal * (3 - 2 * wGoal);
  follow.w += (wTarget - follow.w) * ease(dt, wTarget > follow.w ? 4 : 0.8);
  const tx = ox + (ax - ox) * follow.w;
  const ty = oy + (ay - oy) * follow.w;
  s.tx = ax; s.ty = ay;

  const vertical = Math.max(0, Math.min(1, (Math.abs(ay - s.y) - ry) / 300));
  const tilt = TILT_IDLE + (TILT_DIVE - TILT_IDLE) * Math.max(follow.w, vertical);

  const dist = Math.hypot(ax - s.x, ay - s.y);
  const far = Math.hypot((s.x - ax) / rx, (s.y - ay) / ry);
  const wanted = s.speed * (1 + Math.min(2, Math.max(0, far - 1.2) * 0.8))
    + Math.min(v * 1.3, 2000) + Math.min(400, Math.max(0, dist - ry) * 1.6);
  follow.speed += (wanted / s.speed - follow.speed) * ease(dt, SPEED_EASE);
  const turnGoal = Math.max(1.3, (s.speed * follow.speed) / TURN_RADIUS);
  follow.turn += (turnGoal - follow.turn) * ease(dt, SPEED_EASE);

  const hx = s.x, hy = s.y;
  moveShark(s, dt, Math.atan2(ty - s.y, tx - s.x), follow.turn, follow.speed, tilt);

  if (follow.w > 0.01) {
    const pull = follow.w * ease(dt, HOLD_EASE);
    s.x += (ax - s.x) * pull;
    s.y += (ay - s.y) * pull;
    s.trail[0].x = s.x;
    s.trail[0].y = s.y;
    buildSpine(s);
    const wx = s.x - hx, wy = s.y - hy + delta;
    if (Math.hypot(wx, wy) > 0.5) {
      const a = Math.atan2(wy, wx);
      s.angle += Math.atan2(Math.sin(a - s.angle), Math.cos(a - s.angle)) * follow.w;
    }
  }
}

function readStage() {
  const term = chase.portal;
  stage.a = 0;
  stage.p = 0;
  if (!term || !term.el) return;
  const top = term.el.getBoundingClientRect().top;
  stage.a = clamp01(1 - top / world.H);
  const p = term.trigger ? clamp01(term.trigger.progress) : 0;
  if (p > 0) {
    stage.a = 1;
    stage.p = p;
  }
}

function applyStage() {
  const s = chase.shark;
  if (!s) return;
  readStage();
  if (stage.a > 0 && !chase.controller) {
    att = { x0: s.x, y0: s.y, Ls: s.L };
    follow.scrollY = window.scrollY;
    s.Lgoal = undefined;
    setChaseController(attackController);
  } else if (stage.a === 0 && chase.controller === attackController) {
    setChaseController(null);
    chase.owner = "chase";
    att = null;
    resetFollow(s);
  }
  if (chase.controller === attackController) chase.owner = stage.p > EATEN ? "eaten" : "attack";
}

function attackController(s, dt) {
  const { W, H } = world;
  const e = smooth(stage.a);
  const Le = Math.min(s.L0 * 1.3, Math.min(W, H) * 0.8);
  s.L = att.Ls + (Le - att.Ls) * e;
  s.maxW = s.L * 0.13;
  if (s.ga !== 1) s.gaGoal = 1;

  const y = window.scrollY;
  const delta = y - follow.scrollY;
  follow.scrollY = y;
  if (stage.p > 0) return;

  if (delta) translateShark(s, 0, -delta);
  const hx = att.x0 + (W / 2 - att.x0) * e;
  const hy = att.y0 + (H * 0.55 - att.y0) * e;
  const px = s.x, py = s.y;
  const speedMul = Math.max(0.4, Math.min(6, Math.hypot(hx - px, hy - py) / dt / s.speed));
  moveShark(s, dt, Math.atan2(hy - py, hx - px), 3, speedMul, TILT_DIVE);
  s.x = hx;
  s.y = hy;
  s.trail[0].x = hx;
  s.trail[0].y = hy;
  buildSpine(s);
  const wx = hx - px, wy = hy - py + delta;
  if (Math.hypot(wx, wy) > 2) {
    const a = Math.atan2(wy, wx);
    s.angle += Math.atan2(Math.sin(a - s.angle), Math.cos(a - s.angle)) * ease(dt, 3);
  }
}

function unionBox(a, b) {
  if (!a || a.c1 < a.c0 || a.r1 < a.r0) return b;
  if (!b || b.c1 < b.c0 || b.r1 < b.r0) return a;
  return { c0: Math.min(a.c0, b.c0), c1: Math.max(a.c1, b.c1), r0: Math.min(a.r0, b.r0), r1: Math.max(a.r1, b.r1) };
}

function rasterizeAttack(s) {
  const { W, H } = world;
  const p = stage.p;
  const t1 = smooth(clamp01(p / TURN_END));
  let box = null;
  if (t1 < 1) {
    box = rasterize(s, world);
    dissolve(world, box, 1 - t1);
  }
  if (t1 > 0) {
    const g = clamp01((p - JAWS_START) / (JAWS_END - JAWS_START));
    const R0 = 0.28 * Math.min(W, H);
    const R = R0 + (3 * Math.max(W, H) - R0) * g * g * g;
    const mo = clamp01((p - JAWS_START) / (MOUTH_OPEN_END - JAWS_START));
    const front = rasterizeFront(world, {
      cx: W / 2, cy: H * 0.45, R, sx: 0.15 + 0.85 * t1, m: 1 - (1 - mo) * (1 - mo), keep: t1,
    });
    box = unionBox(box, front);
  }
  return box;
}

function loop(now) {
  rafId = requestAnimationFrame(loop);
  const dt = Math.min((now - last) / 1000, MAX_DT);
  last = now;

  const s = chase.shark;
  if (!s) { clearLayer(); stop(); return; }
  applyStage();
  if (chase.owner === "eaten") { clearLayer(); stop(); return; }

  if (chase.controller) {
    chase.controller(s, dt, frame);
  } else {
    huntShark(s, dt);
  }

  if (prevBox) {
    ctx.clearRect(prevBox.c0 * CELL - 2, prevBox.r0 * CELL - 2, (prevBox.c1 - prevBox.c0 + 1) * CELL + 4, (prevBox.r1 - prevBox.r0 + 1) * CELL + 4);
    clearBox(world, prevBox);
  }
  world.sharks[0] = s;
  prevBox = chase.controller === attackController ? rasterizeAttack(s) : rasterize(s, world);
  if (prevBox) drawCells(ctx, world, now / 1000, prevBox, false);
}

function clearLayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (prevBox) clearBox(world, prevBox);
  prevBox = null;
  world.sharks.length = 0;
}

function start() {
  if (rafId !== null || !pageVisible || !chase.shark) return;
  last = performance.now();
  follow.scrollY = window.scrollY;
  rafId = requestAnimationFrame(loop);
}

function stop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}

function evaluate() {
  const home = document.getElementById("home");
  if (!home || !chase.hero) return;
  const bottom = home.getBoundingClientRect().bottom / window.innerHeight;

  if (chase.owner === "hero" && !chase.shark && bottom < HANDOFF_OUT) {
    const s = chase.hero.detach();
    if (!s) return;
    chase.shark = s;
    chase.owner = "chase";
    resetFollow(s);
    start();
  } else if (chase.owner === "chase" && !chase.controller && chase.shark && bottom > HANDOFF_BACK) {
    const s = chase.shark;
    chase.shark = null;
    chase.owner = "hero";
    s.Lgoal = s.L0;
    s.gaGoal = 1;
    clearLayer();
    chase.hero.attach(s);
    stop();
  }
}

function onScroll() {
  evaluate();
  applyStage();
  if (chase.shark && chase.owner !== "eaten") start();
}

function onRefresh() {
  evaluate();
  applyStage();
  if (chase.shark && chase.owner !== "eaten") start();
}

function onVisibility() {
  pageVisible = !document.hidden;
  if (pageVisible) { follow.scrollY = window.scrollY; start(); } else stop();
}

function onResize() {
  resize();
  evaluate();
}

function onPointerMove(e) {
  world.mouse.x = e.clientX;
  world.mouse.y = e.clientY;
}

function onPointerLeave() {
  world.mouse.x = world.mouse.y = -9999;
}

onMounted(() => {
  if (reducedMotion) return;
  canvas = canvasEl.value;
  ctx = canvas.getContext("2d");
  buildAtlas();
  resize();
  chase.layer = { canvas, ctx, world };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
  ScrollTrigger.addEventListener("refresh", onRefresh);
  evaluate();
});

onUnmounted(() => {
  stop();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerleave", onPointerLeave);
  document.removeEventListener("visibilitychange", onVisibility);
  ScrollTrigger.removeEventListener("refresh", onRefresh);
  att = null;
  chase.shark = null;
  chase.owner = "hero";
  chase.controller = null;
  chase.layer = null;
  world.sharks.length = 0;
});
</script>
