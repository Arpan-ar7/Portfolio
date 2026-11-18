/**
 * A small decorative chart, different for every project (it's made from the project's name,
 * so it always looks the same for the same project). Just decoration, not real results.
 * Shown on the orbit screens of projects that don't have a photo.
 *
 *  kind 0 = dots with a fitted line, 1 = bars, 2 = a curve falling and flattening out.
 */
export default function MiniChart({ seed, kind, color }: { seed: string; kind: number; color: string }) {
  // Every number is rounded to 2 decimals: the server and the browser can calculate the last few
  // decimals slightly differently, and React reports an error when the drawing doesn't match.
  const seq = seededRandom(seed);
  const rand = () => round(seq());
  const W = 120;
  const H = 120;

  if (kind === 1) {
    const bars = Array.from({ length: 7 }, (_, i) => 0.25 + 0.6 * rand() * (0.5 + i / 12));
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        {bars.map((v, i) => (
          <rect key={i} x={6 + i * 16} y={round(H - 8 - v * (H - 16))} width={11} height={round(v * (H - 16))} rx={2} fill={color} opacity={i === bars.length - 1 ? 1 : 0.45} />
        ))}
      </svg>
    );
  }

  if (kind === 2) {
    const points = Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      const y = 0.15 + 0.75 * Math.exp(-4 * t) + (rand() - 0.5) * 0.06;
      return `${round(6 + t * (W - 12))},${round(8 + (1 - y) * (H - 16))}`; // (1 - y): high values at the top
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
      </svg>
    );
  }

  const slope = 0.4 + rand() * 0.4;
  const dots = Array.from({ length: 26 }, () => {
    const x = rand();
    const y = Math.min(1, Math.max(0, 0.1 + slope * x + (rand() - 0.5) * 0.3));
    return { x: round(6 + x * (W - 12)), y: round(H - 8 - y * (H - 16)) };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2.4} fill={color} opacity={i % 4 === 0 ? 1 : 0.6} />
      ))}
      <line x1={6} y1={round(H - 8 - 0.1 * (H - 16))} x2={W - 6} y2={round(H - 8 - (0.1 + slope) * (H - 16))} stroke="#eef2f8" strokeWidth={1.5} strokeDasharray="4 4" />
    </svg>
  );
}

/** Rounds to 2 decimals */
const round = (n: number) => Math.round(n * 100) / 100;

/** A tiny random number maker (0 to 1) that always gives the same numbers for the same text */
function seededRandom(text: string) {
  const state = { h: 0 };
  for (const ch of text) state.h = (state.h * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    state.h = (state.h * 1664525 + 1013904223) >>> 0;
    return state.h / 4294967296;
  };
}
