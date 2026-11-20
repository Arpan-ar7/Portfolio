import { collaborators } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

/**
 * "Built together": a thank-you card for the people you've built things with, at the very end
 * of the page (just above the footer). One solid card per person (from data/collaborators.ts):
 * their initials, name and role, what you built together, and a button to their portfolio.
 */
export default function BuiltTogether() {
  if (collaborators.length === 0) return null;

  return (
    <section aria-label="Built together" className="page-width pt-20">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">Built together</p>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Some of my best work wasn&apos;t built alone. Here&apos;s who I build with.
        </p>
      </Reveal>

      {/* One person = one full-width card; two or more = two cards per row on big screens */}
      <div className={`mt-8 grid gap-6 ${collaborators.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {collaborators.map((person) => (
          <Reveal key={person.name} className="h-full">
            {/* A solid card (no glass) with a thin blue line along the left side */}
            <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60 sm:flex-row sm:items-center sm:p-8">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent-2" />

              {/* Their initials in a round badge */}
              <div
                aria-hidden
                className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-accent bg-card-2 font-display text-xl font-bold text-accent-2"
              >
                {initials(person.name)}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{person.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{person.role}</p>

                {/* What we built together */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {person.workedOn.map((thing) => (
                    <li key={thing} className="rounded-md border border-line bg-card-2 px-2.5 py-1 font-mono text-xs text-fg/85">
                      {thing}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={person.url}
                target="_blank"
                rel="noreferrer"
                className="wobble inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-2 sm:self-center"
              >
                See his portfolio <span aria-hidden>↗</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// "Adarsh Milan" -> "AM"
function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
