import { profile } from "@/data/site";
import EmailButton from "./EmailButton";

/**
 * The contact content, laid out like a film poster:
 *  - top-left: a huge "Let's talk", a short line, and three buttons (Gmail me, LinkedIn, GitHub)
 *    that wobble on hover
 *  - bottom-left: copyright
 * The rest of the space is for the scene behind it (the hand reaching into the light,
 * and the waving photo on the right; see LightBeamBackdrop).
 * Used in two places: the full-screen panel and the section at the bottom of the page.
 * `startDelay` (ms) lets the panel wait for its fade-in before the words rise.
 * The words animate when a parent has the class "rise-in" or "is-visible" (see globals.css).
 */
export default function ContactContent({ startDelay = 0 }: { startDelay?: number }) {
  // LinkedIn + GitHub buttons (the "Gmail me" button is its own component, with a hover menu).
  // If there's no email, LinkedIn becomes the highlighted one.
  const buttons = [
    { label: "LinkedIn", href: profile.linkedin, icon: <LinkedInIcon />, main: !profile.email },
    { label: "GitHub", href: profile.github, icon: <GitHubIcon />, main: false },
  ];

  const delay = (ms: number) => ({ "--d": `${startDelay + ms}ms` }) as React.CSSProperties;

  return (
    <div className="flex flex-1 flex-col justify-between gap-16">
      {/* Top-left: heading, short line, buttons */}
      <div className="mt-8 max-w-2xl sm:mt-14">
        <h2 className="overflow-hidden pb-1 font-display text-6xl leading-[0.9] font-bold tracking-tighter uppercase sm:text-7xl lg:text-8xl">
          <span className="rise block" style={delay(0)}>
            Let&apos;s talk
          </span>
        </h2>
        <p className="rise mt-4 text-base text-white/60 sm:text-lg" style={delay(150)}>
          Got an idea, a role, or just want to say hello? I&apos;d love to hear from you.
        </p>

        {/* Gmail me (warm, solid, with a hover menu) + LinkedIn + GitHub (outlined).
            The outer span does the rise-in animation, the link itself wobbles on hover
            (they're on separate elements so the two animations don't fight). */}
        <div className="mt-8 flex flex-wrap gap-3">
          {profile.email && (
            <span className="rise inline-block" style={delay(250)}>
              <EmailButton email={profile.email} />
            </span>
          )}
          {buttons.map((b, i) => (
            <span key={b.label} className="rise inline-block" style={delay(330 + i * 80)}>
              <a
                href={b.href}
                target={b.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className={`wobble group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  b.main
                    ? "bg-[#ffe2b8] text-black shadow-[0_0_30px_rgba(255,210,150,0.25)] hover:bg-white"
                    : "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:border-[#ffe2b8]/60 hover:bg-white/10"
                }`}
              >
                {b.icon}
                {b.label}
                <span className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom-left: copyright */}
      <p className="rise font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase" style={delay(400)}>
        © 2026 {profile.name}
      </p>
    </div>
  );
}

/** The small "Available" status: a pulsing green dot, like the reference site */
export function AvailablePill() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-wide uppercase">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available
      <span className="hidden font-mono text-[11px] font-normal tracking-[0.15em] text-white/50 sm:inline">
        · AI/ML &amp; software roles
      </span>
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
