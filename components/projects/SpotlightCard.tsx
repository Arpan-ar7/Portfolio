import type { Spotlight } from "@/data/site";
import TeammateLink from "@/components/ui/TeammateLink";

/**
 * A big "showcase" card, used at the top of the Projects section for the two things that
 * matter most: your research and your live app. (The text lives in `spotlights` in data/site.ts.)
 *
 * Top to bottom: a label with a green status dot, the title, a short description,
 * three facts in a row, a few bullet points, then the tags and (if there is one) a button.
 * It's styled to stand out from the normal project cards (blue border, glow and tags).
 */
export default function SpotlightCard({ item }: { item: Spotlight }) {
  return (
    // What makes it stand out from a normal project card: a blue border, a soft blue glow
    // around it, a deep-blue (solid) background that fades to the normal card color,
    // and a thicker blue line across the top.
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/45 bg-[linear-gradient(165deg,#111d35_0%,#0c1118_60%)] p-6 shadow-[0_0_70px_-25px_rgba(91,155,255,0.55)] transition duration-300 hover:-translate-y-1 hover:border-accent sm:p-8 2xl:p-10">
      {/* The blue line across the top */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-accent-2" />

      {/* What kind of thing this is (a blue tag), and its status (a green tag) */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 font-mono text-[11px] tracking-[0.18em] uppercase">
        <p className="rounded-full bg-accent px-3 py-1 font-medium text-bg">{item.kind}</p>
        <p className="flex items-center gap-2 rounded-full border border-emerald-400/50 bg-[#0c1f1a] px-3 py-1 tracking-[0.12em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          {item.status}
        </p>
      </div>

      <h3 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance 2xl:text-4xl">{item.title}</h3>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{item.description}</p>

      {/* Three facts in a row, split by thin lines */}
      <dl className="mt-7 grid grid-cols-3 divide-x divide-accent/25 rounded-xl border border-accent/25 bg-card-2">
        {item.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse justify-end gap-1.5 p-4">
            <dt className="text-xs leading-snug text-muted">{stat.label}</dt>
            <dd className="font-mono text-xl font-medium text-accent-2 sm:text-2xl">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-7 space-y-3 leading-relaxed text-fg/85">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      {/* Bottom: tags and who it was done with on the left, the button on the right */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-5 pt-8">
        <div>
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-line bg-card-2 px-2.5 py-1 font-mono text-xs text-fg/80">
                {tag}
              </li>
            ))}
          </ul>
          {item.credit && <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-muted">{item.credit}</p>}
          <TeammateLink name={item.teammate} className="mt-2" />
        </div>
        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noreferrer"
            className="wobble inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-2"
          >
            {item.link.label} <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
