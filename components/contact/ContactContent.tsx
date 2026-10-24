import { profile } from "@/data/site";

// The big heading lines. Each line rises up into place one after another.
const lines = ["Let's build", "something", "together."];

/**
 * The contact content (inspired by two26.studio's "Let's talk" page).
 * Used in two places: the full-screen panel and the section at the bottom of the page.
 * `startDelay` (ms) lets the panel wait for its slide-in before the words rise.
 * The words animate when a parent has the class "rise-in" or "is-visible" (see globals.css).
 */
export default function ContactContent({ startDelay = 0 }: { startDelay?: number }) {
  const links = [
    ...(profile.email ? [{ label: "Email", value: profile.email, href: `mailto:${profile.email}` }] : []),
    { label: "LinkedIn", value: "in/arpankumarpanda", href: profile.linkedin },
    { label: "GitHub", value: "@Arpan-ar7", href: profile.github },
  ];

  return (
    <div className="grid flex-1 items-center gap-12 md:grid-cols-[1.5fr_1fr]">
      {/* Left: huge tilted words that rise into place */}
      <div>
        <h2 className="font-display text-5xl leading-[0.95] font-bold tracking-tighter uppercase sm:text-7xl lg:text-8xl">
          {lines.map((line, i) => (
            // overflow-hidden hides each word until it rises up from below
            <span key={line} className="block overflow-hidden pb-1">
              <span className="rise block" style={{ "--d": `${startDelay + i * 120}ms` } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h2>
        <span className="block overflow-hidden">
          <span
            className="rise mt-4 block font-display text-2xl font-semibold text-[#a8c2ff] sm:text-3xl"
            style={{ "--d": `${startDelay + lines.length * 120}ms` } as React.CSSProperties}
          >
            or just say hello ✦
          </span>
        </span>
      </div>

      {/* Right: where to reach me */}
      <ul className="space-y-6">
        {links.map((link, i) => (
          <li key={link.label} className="rise" style={{ "--d": `${startDelay + 300 + i * 100}ms` } as React.CSSProperties}>
            <p className="font-mono text-[11px] tracking-[0.25em] text-white/50 uppercase">{link.label}</p>
            <a
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group mt-1 inline-flex items-center gap-2 text-xl transition hover:text-[#a8c2ff] sm:text-2xl"
            >
              {link.value}
              <span className="transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </li>
        ))}
        <li className="rise pt-4 font-mono text-xs text-white/50" style={{ "--d": `${startDelay + 600}ms` } as React.CSSProperties}>
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Open to AI/ML &amp; software roles
        </li>
      </ul>
    </div>
  );
}
