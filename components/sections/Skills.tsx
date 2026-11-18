import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/site";

// Skills, laid out like a spec sheet: one panel per area.
// Each panel has a header (icon, title, short line) and then rows:
// the group name on the left, its skills as small code-style chips on the right.
export default function Skills() {
  return (
    <section id="skills" className="page-width py-20 sm:py-28">
      <SectionHeading index="02" label="Skills" title="My toolkit." />

      {/* The first panel has more in it, so it gets a bit more room on wide screens */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]" suppressHydrationWarning data-parallax="8">
        {skills.map((card, i) => (
          <Reveal key={card.title} delay={i * 120}>
            {/* Solid panel (the dots of the background show around it, not through it).
                The border turns a little blue when you hover. */}
            <div className="h-full overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-accent/50">
              {/* Header: icon, title + short line, and the panel's number.
                  It's one shade lighter than the rows, so it reads as the panel's title bar. */}
              <div className="flex items-start gap-4 border-b border-line bg-[#0f151e] p-6 sm:p-7">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-card-2 text-accent">
                  {card.icon === "ai" ? <NetworkIcon /> : <CodeIcon />}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-semibold">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.blurb}</p>
                </div>
                <span className="font-mono text-xs tracking-[0.2em] text-muted">0{i + 1}</span>
              </div>

              {/* One row per group */}
              <dl className="divide-y divide-line">
                {card.groups.map((group) => (
                  <div key={group.label} className="grid gap-3 px-6 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-4 sm:px-7 2xl:grid-cols-[12rem_1fr] 2xl:py-6">
                    <dt className="font-mono text-[11px] leading-[1.9] tracking-[0.16em] text-accent-2/80 uppercase 2xl:text-xs 2xl:leading-[2.2]">{group.label}</dt>
                    <dd>
                      {/* The chips are a little bigger on wide screens (2xl), where the panels have more room */}
                      <ul className="flex flex-wrap gap-2 2xl:gap-2.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-md border border-line bg-card-2 px-2.5 py-1 font-mono text-[13px] text-fg/85 transition-colors hover:border-accent/70 hover:text-fg 2xl:px-3 2xl:py-1.5 2xl:text-sm"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// A small "neural network" icon: connected nodes
function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M6.7 7.1 10.3 10.9M6.7 16.9l3.6-3.8M13.7 10.9l3.6-3.8M13.7 13.1l3.6 3.8" />
    </svg>
  );
}

// A "</>" code icon
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}
