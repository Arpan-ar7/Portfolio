import DottedPortrait from "@/components/hero/DottedPortrait";
import Reveal from "@/components/ui/Reveal";
import LetsTalkButton from "@/components/ui/LetsTalkButton";
import LocalTime from "@/components/hero/LocalTime";
import StreamingLine from "@/components/hero/StreamingLine";
import { profile } from "@/data/site";

/**
 * The first screen. In a few seconds it should answer: who is this, and what do they do?
 *
 *  Left:   your role and status, your name (huge), one line about you, and the main buttons.
 *  Right:  your portrait made of dots, fading softly into the page.
 *  Bottom: your motto typing itself out like an AI answer, and your local time.
 *
 * It uses the full width of the screen ("page-width" in globals.css): the text starts under the
 * navbar's logo and the portrait ends under the "Let's talk" button. Your name and the portrait
 * grow with the screen, so a wide screen doesn't leave them looking small.
 * On phones the two halves stack: text first, portrait below.
 * Behind it (and the whole site): a near-black night sky with slowly drifting stars
 * (NightSky + StarField, in layout.tsx).
 */
export default function Hero() {
  // The last word of your name gets the blue highlight: "Arpan Kumar" + "Panda"
  const nameWords = profile.name.split(" ");
  const lastName = nameWords.pop();
  const firstNames = nameWords.join(" ");

  // Small text links next to the buttons
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Résumé", href: profile.resume }, // hidden until you add it in data/site.ts
  ].filter((link) => link.href);

  return (
    <section id="top" className="page-width relative flex min-h-[max(100svh,40rem)] flex-col pt-28 pb-8">
      {/* Two columns from tablet size up (text a bit wider than the portrait), one column on phones.
          The numbers are shares of the width: on wide screens (xl) the text gets 1.1 parts and the
          portrait 0.9. Give the second number more to make room for a bigger portrait. */}
      <div className="grid flex-1 items-center gap-14 md:grid-cols-[1.2fr_0.8fr] md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Left: who you are */}
        <div className="relative z-10" suppressHydrationWarning data-parallax="8">
          {/* Role, and a green "available" dot with your status */}
          <Reveal>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase">
              <span className="flex items-center gap-3 tracking-[0.3em] text-accent">
                <span className="h-px w-8 bg-accent" />
                {profile.role}
              </span>
              <span className="flex items-center gap-2 tracking-[0.15em] text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {profile.status}
              </span>
            </p>
          </Reveal>

          {/* Your name: first names in white, surname in blue on its own line.
              From tablet size up, the letters are 7% of the screen's width (7vw), so the name
              gets bigger on bigger screens (never smaller than 52px or bigger than 136px). */}
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,12vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.035em] md:text-[clamp(3.25rem,7vw,8.5rem)]">
              {firstNames}
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pr-1 text-transparent">{lastName}</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted 2xl:max-w-2xl 2xl:text-xl">{profile.tagline}</p>
          </Reveal>

          <Reveal delay={360} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4">
            {/* The main button: solid and light, so it's the first thing you'd click */}
            <a
              href="#projects"
              className="wobble inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-2"
            >
              View my work <span aria-hidden>↓</span>
            </a>
            {/* Light sweeps across on hover; click = the page gets pulled into a burst of light (contact screen) */}
            <LetsTalkButton variant="outline">Let&apos;s connect</LetsTalkButton>

            <span className="flex items-center gap-5 pl-1 font-mono text-xs text-muted">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-2.5 underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </span>
          </Reveal>
        </div>

        {/* Right: the dotted portrait, pushed to the right edge.
            HOW BIG IT IS (from tablet size up): the smallest of these three
              - 100%              = as wide as its column
              - 72vh              = 72% of the screen's height (raise this number for a bigger photo)
              - 100svh - 15rem    = the screen's height minus the navbar and the bottom bar,
                                    so it always fits on the first screen */}
        <div suppressHydrationWarning data-parallax="16" className="relative mx-auto aspect-square w-[min(80%,19rem)] sm:w-[22rem] md:mx-0 md:w-[min(100%,72vh,calc(100svh-15rem))] md:justify-self-end">
          <DottedPortrait src="/me/arpan-cutout.png" alt={`Dotted portrait of ${profile.name}`} />
        </div>
      </div>

      {/* Bottom bar: your motto, and where you are */}
      <div className="relative z-10 mt-12 flex items-start justify-between gap-8 border-t border-line pt-5 font-mono text-xs leading-relaxed">
        {/* The motto "generates" word by word, like an AI answer, after a ">" prompt */}
        <div className="flex gap-3 text-fg/80">
          <span aria-hidden className="text-accent">
            &gt;
          </span>
          <StreamingLine text={profile.heroLine} />
        </div>
        {/* Hidden on phones, to keep the bar clean */}
        <p className="hidden shrink-0 tracking-[0.2em] text-muted uppercase sm:block">
          {profile.location} · <LocalTime />
        </p>
      </div>
    </section>
  );
}
