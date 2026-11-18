import Reveal from "./Reveal";
import RevealWords from "./RevealWords";

/**
 * The heading at the top of each section.
 * A small code-style label with the section's number, e.g. "01 — ABOUT",
 * and under it the title, whose words slide up one by one.
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
      <RevealWords text={title} className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl 2xl:text-6xl" delay={100} />
    </div>
  );
}
