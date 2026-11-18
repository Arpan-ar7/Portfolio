import { twoDigits } from "@/lib/format";

/**
 * "Scroll ↓ to orbit · 03 / 08" and a bar that fills up as you go through the projects.
 * Only one copy gets barRef (the one that's moved while you scroll); the phone copy follows
 * the current project instead.
 */
export default function OrbitProgress({
  active,
  count,
  color,
  barRef,
}: {
  active: number;
  count: number;
  color: string;
  barRef: React.RefObject<HTMLDivElement | null> | null;
}) {
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        <span>Scroll ↓ to orbit</span>
        <span>
          <span className="text-fg">{twoDigits(active + 1)}</span> / {twoDigits(count)}
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div
          ref={barRef}
          // (the copy moved while you scroll only animates its color; the other one also slides)
          className={`h-full origin-left rounded-full duration-500 ${barRef ? "transition-colors" : "transition-[background,transform]"}`}
          style={{ background: color, transform: barRef ? undefined : `scaleX(${(active + 1) / count})` }}
        />
      </div>
    </div>
  );
}
