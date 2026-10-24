import DottedPortrait from "../DottedPortrait";
import Reveal from "../Reveal";
import LetsTalkButton from "../LetsTalkButton";
import LocalTime from "../LocalTime";
import { profile } from "@/data/site";

/**
 * The first screen, laid out like an editorial magazine cover:
 *  - your dotted portrait in the middle, fading softly into the page
 *  - your name huge underneath, in an elegant serif
 *  - small mono labels in the corners and a bar along the bottom
 *  - faint vertical lines dividing the page into columns
 */
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col px-6 pt-24 sm:px-10">
      {/* Faint vertical column lines (desktop only) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute inset-y-0 left-[18%] w-px bg-line" />
        <span className="absolute inset-y-0 right-[18%] w-px bg-line" />
      </div>

      {/* Top corner labels */}
      <div className="relative z-10 flex items-start justify-between font-mono text-[10px] tracking-[0.25em] uppercase sm:text-[11px]">
        <Reveal>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="bg-accent px-1.5 py-0.5 text-bg">AI/ML. Software. Space.</span>
          </span>
        </Reveal>
        <Reveal delay={100} className="hidden text-muted sm:block">
          Based in India · Looking up
        </Reveal>
      </div>

      {/* Left rail: a small index, like a magazine (desktop only) */}
      <Reveal delay={200} className="absolute top-[38%] left-10 z-10 hidden font-mono text-[10px] tracking-[0.25em] text-muted uppercase lg:block">
        <p className="text-accent">01 / Origin</p>
        <p className="mt-8 text-lg leading-none text-accent">+</p>
        <ul className="mt-3 space-y-2">
          <li>Machine learning</li>
          <li>Software</li>
          <li>The cosmos</li>
        </ul>
      </Reveal>

      {/* Center: portrait, then the big name, then a line and the buttons */}
      <div className="relative flex flex-1 flex-col items-center justify-end pb-28 text-center">
        {/* The portrait sits behind the top of the name */}
        <div className="depth-2 relative -mb-16 aspect-square w-[min(80vw,26rem)] sm:-mb-20">
          <DottedPortrait src="/me/arpan-cutout.png" alt={`Dotted portrait of ${profile.name}`} />
        </div>

        <Reveal delay={150} className="relative z-10">
          <p className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase sm:text-xs">
            A curious mind in AI &amp; the universe
          </p>
        </Reveal>

        {/* The name: one word upright, one in italics */}
        <Reveal delay={250} className="depth-1 relative z-10">
          <h1 className="mt-3 font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-tight">
            Arpan <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pr-2 text-transparent italic">Panda</span>
          </h1>
        </Reveal>

        <Reveal delay={400} className="relative z-10">
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">{profile.heroLine}</p>
        </Reveal>

        <Reveal delay={500} className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="wobble flex items-center gap-3 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
          >
            Explore my work <span aria-hidden>↓</span>
          </a>
          {/* Black hole appears inside on hover; click = get sucked into the contact screen */}
          <LetsTalkButton variant="outline">Let&apos;s connect</LetsTalkButton>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-6 bottom-6 z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted uppercase sm:inset-x-10">
        <span className="flex items-center gap-3">
          <span className="scroll-line block h-6 w-px bg-accent" /> Scroll to explore
        </span>
        <span className="hidden md:block">B.Tech CSE · {profile.university}</span>
        <span className="hidden sm:block">
          <LocalTime />
        </span>
      </div>
    </section>
  );
}
