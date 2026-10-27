import { onMounted, onUnmounted } from "vue";

const targets = new Set();
const lastClip = new WeakMap();
const rects = [];

const HIDDEN = "inset(0 0 100% 0)";

const round = (v) => Math.round(v * 10) / 10;

export function useSharkMaskTarget(elRef) {
  let registered = null;
  onMounted(() => {
    registered = elRef.value;
    if (registered) targets.add(registered);
  });
  onUnmounted(() => {
    if (registered) targets.delete(registered);
    registered = null;
  });
}

function buildClip(rect, canvasRect, cell, cols, rows, isSolid) {
  if (rect.width === 0 || rect.height === 0) return HIDDEN;
  const ox = canvasRect.left - rect.left;
  const oy = canvasRect.top - rect.top;
  const c0 = Math.max(0, Math.floor(-ox / cell));
  const c1 = Math.min(cols - 1, Math.floor((rect.width - ox) / cell));
  const r0 = Math.max(0, Math.floor(-oy / cell));
  const r1 = Math.min(rows - 1, Math.floor((rect.height - oy) / cell));

  let d = "";
  for (let r = r0; r <= r1; r++) {
    const base = r * cols;
    const y = round(oy + r * cell);
    const h = cell;
    let c = c0;
    while (c <= c1) {
      if (!isSolid(base + c)) {
        c++;
        continue;
      }
      const start = c;
      while (c <= c1 && isSolid(base + c)) c++;
      const x = round(ox + start * cell);
      const w = round((c - start) * cell);
      d += `M${x} ${y}h${w}v${h}h${-w}Z`;
    }
  }
  return d ? `path('${d}')` : HIDDEN;
}

export function applySharkMask({ canvasRect, cell, cols, rows, isSolid }) {
  if (!targets.size) return;
  rects.length = 0;
  for (const el of targets) rects.push(el.getBoundingClientRect());
  let i = 0;
  for (const el of targets) {
    const clip = buildClip(rects[i++], canvasRect, cell, cols, rows, isSolid);
    if (lastClip.get(el) !== clip) {
      el.style.clipPath = clip;
      lastClip.set(el, clip);
    }
  }
}

export function clearSharkMask() {
  for (const el of targets) {
    el.style.clipPath = HIDDEN;
    lastClip.delete(el);
  }
}
