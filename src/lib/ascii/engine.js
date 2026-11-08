export const RAMP = " .:-=+*#%@";
export const FONT = '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace';
export const reducedMotion =
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const STATIC_T = 2.2;
const MAX_DT = 0.1;

export function createAsciiRenderer(canvas, effect, { onDone, params = {} } = {}) {
  const ctx = canvas.getContext("2d");
  const fs = effect.fs || 13;
  const g = {
    W: 0,
    H: 0,
    cols: 0,
    rows: 0,
    cw: 0,
    ch: 0,
    mouse: { x: 0, y: 0, active: false },
    ctx,
    params: { ...params },
    ink: "#F9A8D4",
    accent: "#EC4899",
    bg: "#0A0A0A",
    reduced: reducedMotion,
  };
  let visible = false;
  let pageVisible = !document.hidden;
  let raf = 0;
  let last = null;
  let time = 0;
  let state = {};
  let done = false;
  let destroyed = false;

  function readColors() {
    const cs = getComputedStyle(canvas);
    g.ink = cs.getPropertyValue("--ascii-ink").trim() || "#F9A8D4";
    g.accent = cs.getPropertyValue("--ascii-accent").trim() || "#EC4899";
    g.bg = cs.getPropertyValue("--ascii-bg").trim() || "#0A0A0A";
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) {
      g.W = g.H = 0;
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.W = r.width;
    g.H = r.height;
    readColors();
    if (effect.px) g.cw = g.ch = effect.px(g);
    else {
      g.cw = fs * 0.62;
      g.ch = fs * 1.15;
    }
    g.cols = Math.ceil(g.W / g.cw);
    g.rows = Math.ceil(g.H / g.ch);
    state = effect.init ? effect.init(g) : {};
  }

  g.put = (x, y, c, color = g.ink, alpha = 1) => {
    if (c === " " || x < 0 || y < 0 || x >= g.cols || y >= g.rows) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillText(c, x * g.cw + g.cw / 2, y * g.ch + g.ch / 2);
  };
  g.rect = (x, y, color = g.ink, alpha = 1, inset = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x * g.cw, y * g.ch, g.cw - inset, g.ch - inset);
  };
  g.finish = () => {
    if (done) return;
    done = true;
    cancelLoop();
    if (onDone) onDone();
  };

  const running = () => visible && pageVisible && !reducedMotion && !done && !destroyed;

  function frame(now) {
    raf = 0;
    if (destroyed || !g.W) return;
    const dt = last === null ? 0 : Math.min((now - last) / 1000, MAX_DT);
    last = now;
    if (!reducedMotion) time += dt;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, g.W, g.H);
    ctx.font = `600 ${fs}px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (!g.mouse.active) {
      g.mouse.x = g.W * (0.5 + 0.32 * Math.sin(time * 0.7));
      g.mouse.y = g.H * (0.5 + 0.3 * Math.sin(time * 1.1 + 1));
    }
    effect.draw(g, reducedMotion ? STATIC_T : time, state);
    ctx.globalAlpha = 1;
    if (running()) raf = requestAnimationFrame(frame);
  }

  function cancelLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function redraw() {
    if (destroyed) return;
    cancelLoop();
    last = null;
    raf = requestAnimationFrame(frame);
  }

  function onPointerMove(e) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    if (!inside && !g.mouse.active) return;
    g.mouse.active = inside;
    if (inside) {
      g.mouse.x = x;
      g.mouse.y = y;
    }
    if (reducedMotion) redraw();
  }
  function onPointerLeave() {
    if (!g.mouse.active) return;
    g.mouse.active = false;
    if (reducedMotion) redraw();
  }
  function onVisibility() {
    pageVisible = !document.hidden;
    if (pageVisible && visible) redraw();
    else if (!pageVisible) cancelLoop();
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    redraw();
  });
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) redraw();
    else cancelLoop();
  });

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  if (document.fonts) {
    document.fonts.ready.then(() => {
      if (!destroyed) {
        resize();
        redraw();
      }
    });
  }

  return {
    setParams(obj) {
      Object.assign(g.params, obj);
      if (reducedMotion) redraw();
    },
    restart() {
      done = false;
      time = 0;
      resize();
      redraw();
    },
    destroy() {
      destroyed = true;
      cancelLoop();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    },
  };
}
