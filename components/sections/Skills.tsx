import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { skills } from "@/data/site";

// Skills: one big card per area. Each card has an icon, a short line,
// and its skills sorted into small labelled groups of "chips".
export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" label="Skills" title="My toolkit." />

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((card, i) => (
          <Reveal key={card.title} delay={i * 120}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition-colors duration-500 hover:border-accent/40 sm:p-9">
              {/* Soft blue glow in the corner that brightens on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
              />

              {/* Top: icon + number */}
              <div className="relative flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  {card.icon === "ai" ? <BrainIcon /> : <CodeIcon />}
                </span>
                <span className="font-mono text-xs tracking-[0.25em] text-muted">0{i + 1}</span>
              </div>

              <h3 className="relative mt-6 font-display text-2xl font-semibold">{card.title}</h3>
              <p className="relative mt-2 text-muted">{card.blurb}</p>

              {/* The skills, in small labelled groups */}
              <div className="relative mt-8 space-y-6">
                {card.groups.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-[11px] tracking-[0.2em] text-accent-2/80 uppercase">{group.label}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-fg/85 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10 hover:text-fg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// A small "neural network" icon: connected nodes
function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}
