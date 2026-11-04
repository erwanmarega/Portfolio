import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BufferGeometry,
  BufferAttribute,
  Points,
  LineSegments,
  LineBasicMaterial,
  ShaderMaterial,
  Vector3,
  AdditiveBlending,
} from "three";
import { createEiffelPositions, createEiffelLines, halfWidthAt } from "./geometry.js";

const PARTICLES_DESKTOP = 12000;
const PARTICLES_MOBILE = 6000;
const OPACITY = 0.7;
const LINE_OPACITY = 0.28;
const POINT_SIZE = 1.5;
const POINT_SIZE_MOBILE = 1.8;
const REF_DIST = 6;
const POINT_MIN_PX = 1.0;
const POINT_MAX_PX = 2.6;
const FAR_DIM = 0.3;
const MAX_PIXEL_RATIO = 2;
const DAMPING = 4;
const EPSILON = 1e-4;
const HL_DAMPING = 9;
const TOP_LEVEL = 9.7;
const BOTTOM_LEVEL = 0.4;
const DIST_TOP = 3.2;
const DIST_BOTTOM = 6.5;
const ORBIT_TOP = 15;
const ORBIT_BOTTOM = 40;
const CAMERA_LIFT = 0.25;
const GROUND_BIAS = 1.1;
const DEFAULT_STOPS = [
  { p: 0, y: TOP_LEVEL },
  { p: 1, y: BOTTOM_LEVEL },
];

const POINT_VERT = `
attribute vec3 color;
uniform float uSize;
uniform float uPixelRatio;
uniform float uRefDist;
uniform float uMinPx;
uniform float uMaxPx;
uniform float uCamDist;
uniform float uFarDim;
uniform float uHlY;
uniform float uHl;
varying vec3 vColor;
varying float vFade;
varying float vGlow;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float z = -mv.z;
  gl_PointSize = clamp(uSize * uPixelRatio * (uRefDist / z), uMinPx * uPixelRatio, uMaxPx * uPixelRatio);
  vFade = mix(1.0, uFarDim, smoothstep(uCamDist - 2.0, uCamDist + 3.5, z));
  vColor = color;
  vGlow = uHl * (1.0 - smoothstep(0.08, 0.5, abs(position.y - uHlY)));
  gl_Position = projectionMatrix * mv;
}
`;

const POINT_FRAG = `
uniform float uOpacity;
varying vec3 vColor;
varying float vFade;
varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float a = 1.0 - smoothstep(0.7, 1.0, d);
  float fade = mix(vFade, 1.0, vGlow);
  gl_FragColor = vec4(vColor * fade * (1.0 + vGlow * 1.6), min(1.0, a * uOpacity * (1.0 + vGlow * 0.6)));
}
`;

export function createEiffelScene(canvas, { reducedMotion = false, isMobile = false } = {}) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);

  const { positions, colors } = createEiffelPositions(isMobile ? PARTICLES_MOBILE : PARTICLES_DESKTOP);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  const material = new ShaderMaterial({
    uniforms: {
      uSize: { value: isMobile ? POINT_SIZE_MOBILE : POINT_SIZE },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uRefDist: { value: REF_DIST },
      uMinPx: { value: POINT_MIN_PX },
      uMaxPx: { value: POINT_MAX_PX },
      uCamDist: { value: 10 },
      uFarDim: { value: FAR_DIM },
      uOpacity: { value: OPACITY },
      uHlY: { value: -100 },
      uHl: { value: 0 },
    },
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  scene.add(new Points(geometry, material));

  const lines = createEiffelLines();
  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new BufferAttribute(lines.positions, 3));
  lineGeometry.setAttribute("color", new BufferAttribute(lines.colors, 3));
  const lineMaterial = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: LINE_OPACITY,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new LineSegments(lineGeometry, lineMaterial));

  const tmpLook = new Vector3();
  const tmpProj = new Vector3();

  let stops = DEFAULT_STOPS;

  function levelAt(p) {
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

  function placeCamera(p) {
    const level = levelAt(p);
    const k = Math.min(1, Math.max(0, (TOP_LEVEL - level) / (TOP_LEVEL - BOTTOM_LEVEL)));
    const dist = DIST_TOP + (DIST_BOTTOM - DIST_TOP) * k;
    const a = ((ORBIT_TOP + (ORBIT_BOTTOM - ORBIT_TOP) * k) * Math.PI) / 180;
    const bias = GROUND_BIAS * k * k;
    tmpLook.set(0, level + bias, 0);
    camera.position.set(Math.sin(a) * dist, level + bias + CAMERA_LIFT, Math.cos(a) * dist);
    camera.lookAt(tmpLook);
    camera.updateMatrixWorld();
  }

  let target = 0;
  let current = 0;
  let raf = 0;
  let last = 0;
  let running = true;
  let disposed = false;
  let hlTarget = 0;
  let hlCurrent = 0;

  function render() {
    placeCamera(current);
    material.uniforms.uHl.value = hlCurrent;
    material.uniforms.uCamDist.value = camera.position.distanceTo(tmpLook);
    renderer.render(scene, camera);
    for (const cb of renderCallbacks) cb();
  }

  const renderCallbacks = new Set();
  function onRender(cb) {
    renderCallbacks.add(cb);
    return () => renderCallbacks.delete(cb);
  }

  function projectLevel(y, side) {
    const w = halfWidthAt(y);
    const W = canvas.clientWidth || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;
    let best = null;
    let cy = 0;
    let behind = false;
    for (const [sx, sz] of [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ]) {
      tmpProj.set(sx * w, y, sz * w).project(camera);
      if (tmpProj.z > 1) behind = true;
      const px = ((tmpProj.x + 1) / 2) * W;
      if (best === null || (side < 0 ? px < best : px > best)) {
        best = px;
        cy = ((1 - tmpProj.y) / 2) * H;
      }
    }
    const edge = Math.min(best, W - best, cy, H - cy);
    const visible = behind ? 0 : Math.min(1, Math.max(0, edge / 60));
    return { x: best, y: cy, visible };
  }

  function projectPoint(x, y, z) {
    const W = canvas.clientWidth || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;
    tmpProj.set(x, y, z).project(camera);
    const px = ((tmpProj.x + 1) / 2) * W;
    const py = ((1 - tmpProj.y) / 2) * H;
    const edge = Math.min(px, W - px, py, H - py);
    const visible = tmpProj.z > 1 ? 0 : Math.min(1, Math.max(0, edge / 60));
    return { x: px, y: py, visible };
  }

  function tick(now) {
    raf = 0;
    if (disposed || !running) return;
    const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    current += (target - current) * (1 - Math.exp(-DAMPING * dt));
    current = Math.min(1, Math.max(0, current));
    if (Math.abs(target - current) < EPSILON) current = target;
    hlCurrent += (hlTarget - hlCurrent) * (1 - Math.exp(-HL_DAMPING * dt));
    if (Math.abs(hlTarget - hlCurrent) < 1e-3) hlCurrent = hlTarget;
    render();
    if (current !== target || hlCurrent !== hlTarget) raf = requestAnimationFrame(tick);
  }

  function schedule() {
    if (disposed || !running || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function setProgress(p) {
    target = Math.min(1, Math.max(0, p));
    if (reducedMotion) {
      current = target;
      if (running) render();
      return;
    }
    schedule();
  }

  function resize() {
    if (disposed) return;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  }

  function start() {
    if (disposed || running) return;
    running = true;
    render();
    schedule();
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function dispose() {
    disposed = true;
    stop();
    geometry.dispose();
    material.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  resize();

  function setStops(next) {
    const clean = (next || [])
      .filter((s) => Number.isFinite(s.p) && Number.isFinite(s.y))
      .map((s) => ({ p: Math.min(1, Math.max(0, s.p)), y: s.y }))
      .sort((a, b) => a.p - b.p);
    if (!clean.length) clean.push(...DEFAULT_STOPS);
    if (clean[0].p > 0) clean.unshift({ p: 0, y: clean[0].y });
    if (clean[clean.length - 1].p < 1) clean.push({ p: 1, y: BOTTOM_LEVEL });
    stops = clean;
    if (!disposed && running) render();
  }

  // Brightens the particles around one floor (tower units); null fades it out.
  function setHighlight(y) {
    if (y === null || y === undefined) {
      hlTarget = 0;
    } else {
      material.uniforms.uHlY.value = y;
      hlTarget = 1;
    }
    if (reducedMotion) {
      hlCurrent = hlTarget;
      if (running && !disposed) render();
      return;
    }
    schedule();
  }

  return { setProgress, setStops, setHighlight, resize, start, stop, dispose, onRender, projectLevel, projectPoint };
}
