export default function createTorus({ scale = 1 } = {}) {
  return {
    fs: 12,
    draw(g, t) {
      const L = ".,-~:;=!*#$@";
      const A = t * 0.9,
        B = t * 0.45;
      const cA = Math.cos(A),
        sA = Math.sin(A),
        cB = Math.cos(B),
        sB = Math.sin(B);
      const n = g.cols * g.rows,
        zb = new Float32Array(n),
        out = new Int8Array(n).fill(-1);
      const R1 = 1,
        R2 = 2,
        K2 = 5;
      const K1 = ((Math.min(g.W, g.H) * K2 * 3) / (8 * (R1 + R2))) * 1.1 * scale;
      for (let th = 0; th < 6.283; th += 0.07) {
        const ct = Math.cos(th),
          st = Math.sin(th);
        for (let ph = 0; ph < 6.283; ph += 0.02) {
          const cp = Math.cos(ph),
            sp = Math.sin(ph);
          const cx = R2 + R1 * ct,
            cy = R1 * st;
          const x = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
          const y = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
          const z = K2 + cA * cx * sp + cy * sA;
          const ooz = 1 / z;
          const xi = Math.floor((g.W / 2 + K1 * ooz * x) / g.cw);
          const yi = Math.floor((g.H / 2 - K1 * ooz * y) / g.ch);
          if (xi < 0 || yi < 0 || xi >= g.cols || yi >= g.rows) continue;
          const lum = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
          const i = yi * g.cols + xi;
          if (ooz > zb[i]) {
            zb[i] = ooz;
            out[i] = Math.max(0, Math.floor(lum * 8));
          }
        }
      }
      for (let i = 0; i < n; i++)
        if (out[i] >= 0) {
          const k = Math.min(out[i], L.length - 1);
          g.put(
            i % g.cols,
            Math.floor(i / g.cols),
            L[k],
            k > 9 ? g.accent : g.ink,
            0.45 + k * 0.05,
          );
        }
    },
  };
}
