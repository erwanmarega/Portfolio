import { CALLOUTS } from "./callouts.js";

const TOP_LEVEL = 9.7;
const BOTTOM_LEVEL = 0.4;

export function computeStops() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const stops = [];
  for (const c of CALLOUTS) {
    const el = document.querySelector(`[data-tower-anchor="${c.id}"]`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const centerY = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    stops.push({ id: c.id, p: centerY / max, y: c.y });
  }
  return stops;
}

export function normalizeStops(next) {
  const clean = (next || [])
    .filter((s) => Number.isFinite(s.p) && Number.isFinite(s.y))
    .map((s) => ({ p: Math.min(1, Math.max(0, s.p)), y: s.y }))
    .sort((a, b) => a.p - b.p);
  if (!clean.length) clean.push({ p: 0, y: TOP_LEVEL }, { p: 1, y: BOTTOM_LEVEL });
  if (clean[0].p > 0) clean.unshift({ p: 0, y: clean[0].y });
  if (clean[clean.length - 1].p < 1) clean.push({ p: 1, y: BOTTOM_LEVEL });
  return clean;
}

export function levelAt(stops, p) {
  if (!stops.length) return TOP_LEVEL;
  if (p <= stops[0].p) return stops[0].y;
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    if (p <= b.p) {
      const t = b.p > a.p ? (p - a.p) / (b.p - a.p) : 1;
      const e = t * t * (3 - 2 * t);
      return a.y + (b.y - a.y) * e;
    }
  }
  return stops[stops.length - 1].y;
}
