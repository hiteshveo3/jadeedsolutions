/** Small brand artworks from the design lab: territory rings (ideas 008/064),
 *  faint contour lines (idea 007) and a dark street map (ideas 028/064). */

const PIN = "M0-20c-7 0-12.6 5.4-12.6 12.2C-12.6 1.6 0 13 0 13S12.6 1.6 12.6-7.8C12.6-14.6 7-20 0-20Z";

function Pin({ x, y, fill, dot }: { x: number; y: number; fill: string; dot: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={PIN} fill={fill} />
      <circle cy={-8} r={4.4} fill={dot} />
    </g>
  );
}

export function TerritoryRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={`block w-full max-w-[300px] ${className}`} aria-hidden="true">
      <g fill="none" stroke="#BEF70A" strokeWidth={1.8} className="origin-center motion-safe:animate-[ring_3.4s_ease-in-out_infinite]" style={{ transformOrigin: "130px 110px" }}>
        <circle cx={130} cy={110} r={36} fill="rgba(190,247,10,0.14)" />
        <circle cx={130} cy={110} r={64} />
        <circle cx={130} cy={110} r={94} strokeDasharray="3 7" />
      </g>
      <Pin x={130} y={116} fill="#BEF70A" dot="#06301D" />
    </svg>
  );
}

/** Very faint contour lines for one corner of a band. */
export function Topo({ className = "", stroke = "rgba(190,247,10,0.16)" }: { className?: string; stroke?: string }) {
  const paths: string[] = [];
  for (let k = 1; k <= 9; k++) {
    const r = k * 21;
    let d = "";
    for (let a = 0; a <= 360; a += 10) {
      const t = (a * Math.PI) / 180;
      const rr = r * (1 + 0.13 * Math.sin(3 * t + k * 0.6) + 0.07 * Math.cos(5 * t - k));
      d += `${a ? "L" : "M"}${(200 + rr * Math.cos(t)).toFixed(1)} ${(200 + rr * Math.sin(t) * 0.82).toFixed(1)}`;
    }
    paths.push(`${d}Z`);
  }
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke={stroke} strokeWidth={1.2} className={`pointer-events-none absolute h-[380px] w-[380px] ${className}`} aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** An ultra-minimal dark map (owner, 5 Oct 2026: the blocky map looked basic):
 *  hairline streets, one soft river, small dots for nearby businesses and a
 *  glowing lime dot — with optional territory rings — for yours. */
const OTHERS = [
  [168, 0.42],
  [452, 0.62],
  [236, 0.84],
  [524, 0.22],
  [96, 0.7],
] as const;

export function StreetMap({ me = false, rings = false, pins = true, h = 240, cx = 300, cy, className = "" }: { me?: boolean; rings?: boolean; pins?: boolean; h?: number; cx?: number; cy?: number; className?: string }) {
  const y = cy ?? Math.round(h * 0.47);
  const id = `map-${h}-${cx}`;
  const line = "rgba(238,242,231,0.075)";
  const main = "rgba(238,242,231,0.12)";
  return (
    <svg viewBox={`0 0 600 ${h}`} preserveAspectRatio="xMidYMid slice" className={`block h-auto w-full ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-bg`} cx={cx / 600} cy={y / h} r="0.85">
          <stop offset="0" stopColor="#0C3B26" />
          <stop offset="0.55" stopColor="#082A1C" />
          <stop offset="1" stopColor="#061E18" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#BEF70A" stopOpacity="0.32" />
          <stop offset="1" stopColor="#BEF70A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={600} height={h} fill={`url(#${id}-bg)`} />
      {/* River: one soft band. */}
      <path d={`M-20 ${h * 0.78}C140 ${h * 0.62} 250 ${h * 0.98} 410 ${h * 0.8}S560 ${h * 0.58} 620 ${h * 0.66}`} fill="none" stroke="rgba(190,247,10,0.05)" strokeWidth={22} strokeLinecap="round" />
      {/* Hairline streets. */}
      <g fill="none" stroke={line} strokeWidth={1}>
        {[0.16, 0.33, 0.52, 0.7, 0.9].map((k) => (
          <path key={`h${k}`} d={`M-10 ${h * k}C150 ${h * k - 10} 330 ${h * k + 12} 610 ${h * k - 6}`} />
        ))}
        {[60, 150, 250, 350, 455, 545].map((x, i) => (
          <path key={`v${x}`} d={`M${x} -10C${x + (i % 2 ? 14 : -12)} ${h * 0.4} ${x + (i % 2 ? -10 : 16)} ${h * 0.7} ${x + 6} ${h + 10}`} />
        ))}
      </g>
      <g fill="none" stroke={main} strokeWidth={2} strokeLinecap="round">
        <path d={`M-10 ${h * 0.6}C180 ${h * 0.44} 420 ${h * 0.66} 610 ${h * 0.38}`} />
        <path d={`M${cx - 120} -10C${cx - 60} ${h * 0.35} ${cx + 40} ${h * 0.55} ${cx + 110} ${h + 10}`} />
      </g>
      {pins &&
        OTHERS.map(([x, k]) => (
          <g key={x}>
            <circle cx={x} cy={h * k} r={9} fill="rgba(238,242,231,0.05)" />
            <circle cx={x} cy={h * k} r={3.5} fill="rgba(238,242,231,0.42)" />
          </g>
        ))}
      {rings && (
        <g fill="none" stroke="#BEF70A" className="motion-safe:animate-[ring_3.4s_ease-in-out_infinite]" style={{ transformOrigin: `${cx}px ${y}px` }}>
          <circle cx={cx} cy={y} r={44} strokeOpacity={0.45} strokeWidth={1.2} />
          <circle cx={cx} cy={y} r={78} strokeOpacity={0.22} strokeWidth={1} strokeDasharray="2 6" />
        </g>
      )}
      {me && (
        <g>
          <circle cx={cx} cy={y} r={34} fill={`url(#${id}-glow)`} />
          <circle cx={cx} cy={y} r={11} fill="#BEF70A" fillOpacity={0.18} />
          <circle cx={cx} cy={y} r={6} fill="#BEF70A" stroke="#06301D" strokeWidth={2} />
        </g>
      )}
    </svg>
  );
}
