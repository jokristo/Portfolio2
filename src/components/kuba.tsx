import { useId, type ReactNode } from "react";

export const C = {
  bg: "#0F0C0A",
  surf: "#1A1512",
  line: "#2E2520",
  red: "#C2412D",
  ember: "#E0573F",
  raph: "#EADFC8",
  mute: "#A89A86",
  ochre: "#B98534",
  dim: "#5A4A3F",
};

const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "");

/* ── 64×64 tile: nested diamonds + broken right-angle corners ─────────── */
const TileKids = () => (
  <>
    <path d="M32 2 L62 32 L32 62 L2 32 Z" />
    <path d="M32 14 L50 32 L32 50 L14 32 Z" />
    <path d="M32 25 L39 32 L32 39 L25 32 Z" />
    <path d="M0 10 H5 V5 H10 V0" />
    <path d="M54 0 V5 H59 V10 H64" />
    <path d="M0 54 H5 V59 H10 V64" />
    <path d="M54 64 V59 H59 V54 H64" />
  </>
);

// The deliberate "ruptures" in the rule: tiles replaced by a square + solid diamond.
const RUPTURES: [number, number][] = [
  [704, 320],
  [1344, 832],
  [320, 1152],
  [1792, 256],
];

export function KubaBackground({ stroke, opacity, rupture, erase }: { stroke: string; opacity: number; rupture: string; erase: boolean }) {
  const id = safeId(useId());
  return (
    <svg width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={64} height={64} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth={1}>
            <TileKids />
          </g>
        </pattern>
      </defs>
      <g opacity={opacity}>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        {RUPTURES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            {erase && <rect x={x} y={y} width={64} height={64} fill={C.bg} />}
            <rect x={x + 10} y={y + 10} width={44} height={44} fill="none" stroke={rupture} strokeWidth={1.4} />
            <path d={`M${x + 32} ${y + 22} L${x + 42} ${y + 32} L${x + 32} ${y + 42} L${x + 22} ${y + 32}Z`} fill={rupture} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function PatternFill({ w, h, stroke, opacity, strokeWidth = 1, children }: { w: number; h: number; stroke: string; opacity: number; strokeWidth?: number; children: ReactNode }) {
  const id = safeId(useId());
  return (
    <svg width="100%" height="100%" aria-hidden="true" style={{ display: "block", position: "absolute", inset: 0 }}>
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth={strokeWidth}>
            {children}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}

export const CardFill = () => (
  <PatternFill w={64} h={64} stroke={C.raph} opacity={0.07}>
    <TileKids />
  </PatternFill>
);

const ColKids = () => (
  <>
    <path d="M12 2 L22 14 L12 26 L2 14 Z" />
    <path d="M12 9 L17 14 L12 19 L7 14 Z" />
  </>
);

export const ColumnBase = () => (
  <PatternFill w={24} h={28} stroke={C.dim} opacity={1} strokeWidth={1.2}>
    <ColKids />
  </PatternFill>
);
export const ColumnRed = () => (
  <PatternFill w={24} h={28} stroke={C.red} opacity={1} strokeWidth={1.6}>
    <ColKids />
  </PatternFill>
);

/* ── Horizontal zig-zag band (method line, footer strip) ──────────────── */
export function Band({ color, rupture }: { color: string; rupture?: boolean }) {
  const id = safeId(useId());
  return (
    <svg width="100%" height="100%" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={32} height={16} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth={1.2}>
            <path d="M0 14 L8 2 L16 14 L24 2 L32 14" />
            <path d="M8 10 L10 12 L8 14 L6 12 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {rupture && <rect x="61%" y={3} width={22} height={10} fill={C.red} />}
    </svg>
  );
}

export function BandVertical({ color }: { color: string }) {
  const id = safeId(useId());
  return (
    <svg width="100%" height="100%" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width={16} height={32} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth={1.2}>
            <path d="M14 0 L2 8 L14 16 L2 24 L14 32" />
            <path d="M6 8 L4 10 L6 12 L8 10 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Woven diamond portrait frame: drawn line by line on load ─────────── */
type Pt = [number, number];
export function WovenFrame() {
  const cx = 260;
  const pts = (r: number): Pt[] => [[cx, cx - r], [cx + r, cx], [cx, cx + r], [cx - r, cx]];
  const out: ReactNode[] = [];
  const line = (key: string, a: Pt, c: Pt, props: Record<string, unknown>, delay: number) =>
    out.push(
      <line
        key={key}
        x1={a[0]}
        y1={a[1]}
        x2={c[0]}
        y2={c[1]}
        pathLength={1}
        strokeDasharray={1}
        className="kweave"
        style={{ animationDelay: `${delay}s` }}
        {...props}
      />,
    );

  let d = 0.1;
  [252, 230, 208].forEach((r, ri) => {
    const p = pts(r);
    for (let e = 0; e < 4; e++) {
      line(`d${ri}${e}`, p[e], p[(e + 1) % 4], { stroke: ri === 2 ? C.raph : C.mute, strokeOpacity: ri === 2 ? 0.7 : 0.55, strokeWidth: ri === 0 ? 1.6 : 1 }, d);
      d += 0.08;
    }
  });

  let idx = 0;
  const n = 22;
  ([[252, 230], [230, 208]] as const).forEach(([ro, rin], bi) => {
    const po = pts(ro), pi = pts(rin);
    for (let e = 0; e < 4; e++)
      for (let k = 1; k < n; k++) {
        if ((k + bi) % 2) continue;
        if (bi === 0 && e === 1 && (k === 12 || k === 14)) continue; // the break in the rule
        const t = k / n, a0 = po[e], a1 = po[(e + 1) % 4], b0 = pi[e], b1 = pi[(e + 1) % 4];
        const A: Pt = [a0[0] + (a1[0] - a0[0]) * t, a0[1] + (a1[1] - a0[1]) * t];
        const B: Pt = [b0[0] + (b1[0] - b0[0]) * t, b0[1] + (b1[1] - b0[1]) * t];
        const red = bi === 0 && e === 1 && k === 10, oc = bi === 1 && e === 3 && k === 9;
        line(`t${bi}${e}${k}`, A, B, { stroke: red ? C.red : oc ? C.ochre : C.mute, strokeOpacity: red || oc ? 1 : 0.45, strokeWidth: red ? 2.4 : 1 }, 1.15 + idx * 0.009);
        idx++;
      }
  });

  pts(241).forEach((p, i) =>
    out.push(
      <path key={`o${i}`} d={`M${p[0]} ${p[1] - 6} L${p[0] + 6} ${p[1]} L${p[0]} ${p[1] + 6} L${p[0] - 6} ${p[1]}Z`} fill={C.ochre} className="kfade" style={{ animationDuration: ".6s", animationDelay: `${1.9 + i * 0.1}s` }} />,
    ),
  );

  return (
    <svg viewBox="0 0 520 520" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      {out}
    </svg>
  );
}

/* ── Small marks ──────────────────────────────────────────────────────── */
export const Corner = () => (
  <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true" style={{ display: "block" }}>
    <path d="M1 16 V1 H16" fill="none" stroke={C.ochre} strokeWidth={1.4} />
    <path d="M5 11 V5 H11" fill="none" stroke={C.ochre} strokeWidth={1} />
    <rect x={8} y={8} width={3} height={3} fill={C.red} />
  </svg>
);

/** Kuba corner ornaments. `all` puts one in each corner, otherwise top-left + bottom-right. */
export const Corners = ({ which = "diag" }: { which?: "all" | "diag" | "tl" }) => (
  <>
    <span className="corner tl"><Corner /></span>
    {which === "all" && <span className="corner tr"><Corner /></span>}
    {which !== "tl" && <span className="corner br"><Corner /></span>}
    {which === "all" && <span className="corner bl"><Corner /></span>}
  </>
);

const ECG_POINTS = (() => {
  let p = "";
  for (let i = 0; i < 6; i++) {
    const x = i * 100;
    p += `${x},30 ${x + 30},30 ${x + 38},24 ${x + 44},30 ${x + 52},30 ${x + 56},38 ${x + 60},6 ${x + 64},46 ${x + 68},30 `;
  }
  return p + "600,30";
})();

export const Ecg = () => (
  <svg viewBox="0 0 600 52" width="100%" height={52} preserveAspectRatio="none" style={{ display: "block" }}>
    <polyline points={ECG_POINTS} fill="none" stroke="#3A2E27" strokeWidth={1.5} />
    <polyline points={ECG_POINTS} fill="none" stroke={C.ember} strokeWidth={2} strokeDasharray="160 440" className="kecg" />
  </svg>
);
