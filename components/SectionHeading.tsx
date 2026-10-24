import Reveal from "./Reveal";
import RevealWords from "./RevealWords";

/**
 * The heading at the top of each section.
 * The small mono label looks like a starship console readout, e.g. "// 01 — ABOUT",
 * and the title's words slide up one by one.
 */
export default function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="mb-12">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
          <span className="h-px w-8 bg-accent" />
          {index} — {label}
        </p>
      </Reveal>
      <RevealWords text={title} className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl" delay={100} />
    </div>
  );
}
