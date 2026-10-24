import Image from "next/image";
import DottedPortrait from "../DottedPortrait";
import Reveal from "../Reveal";
import LetsTalkButton from "../LetsTalkButton";
import LocalTime from "../LocalTime";
import StreamingLine from "../StreamingLine";
import { profile, sky } from "@/data/site";

/**
 * The first screen, laid out like an editorial magazine cover:
 *  - your dotted portrait in the middle, fading softly into the page
 *  - your name huge underneath, in an elegant serif
 *  - a quote that types itself out like an AI answer, and two buttons
 *  - a small bar along the bottom (the live sky behind is NightSky, in layout.tsx)
 *  - Earth's glowing horizon just under the buttons (the start of the "leaving Earth" journey)
 *
 * The section is exactly one screen tall, and the portrait and name shrink on short
 * screens, so the horizon and buttons are always visible without scrolling.
 */
export default function Hero() {
  return (
    <section id="top" className="relative flex h-svh min-h-[36rem] flex-col px-6 pt-24 sm:px-10">
      {/* Earth's horizon. The picture is as wide as the screen, and moved so that
          its glowing curve (40% down the picture) lands just under the buttons. Faded on all sides. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
        <div
          className="horizon-rise absolute inset-x-0 mix-blend-screen top-[calc(100%-96px-23.8vw)] aspect-[588/350] [mask-image:linear-gradient(to_bottom,transparent_30%,black_39%,black_43%,transparent_49%),linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-composite:intersect]"
        >
          <Image src="/media/earth-horizon-gold.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      {/* Center: portrait, then the big name, then a line and the buttons */}
      <div className="relative flex flex-1 flex-col items-center justify-end pb-28 text-center">
        {/* The portrait sits behind the top of the name */}
        <div className="depth-2 relative -mb-16 aspect-square w-[min(85vw,32rem,54vh)] sm:-mb-24">
          <DottedPortrait src="/me/arpan-cutout.png" alt={`Dotted portrait of ${profile.name}`} />
        </div>

        {/* The full name: first two words upright, surname in italics */}
        <Reveal delay={250} className="depth-1 relative z-10">
          <h1 className="mt-3 font-serif text-[clamp(3rem,min(8.5vw,12vh),8rem)] leading-[0.9] tracking-tight">
            Arpan Kumar <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pr-2 text-transparent italic">Panda</span>
          </h1>
        </Reveal>

        {/* The quote "generates" word by word, like an AI answer */}
        <StreamingLine
          text={profile.heroLine}
          className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        />

        <Reveal delay={500} className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="wobble flex items-center gap-3 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium backdrop-blur-md transition-colors hover:border-accent dark:bg-black/55"
          >
            Explore my work <span aria-hidden>↓</span>
          </a>
          {/* Light sweeps across on hover; click = the page gets pulled into a burst of light (contact screen) */}
          <LetsTalkButton variant="outline">Let&apos;s connect</LetsTalkButton>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-6 bottom-6 z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted uppercase sm:inset-x-10 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.95)]">
        <span className="flex items-center gap-3">
          <span className="scroll-line block h-6 w-px bg-accent" /> Scroll to explore
        </span>
        {/* The background is the real sky over this place, right now */}
        <span className="hidden items-center gap-2 rounded-full px-3 py-1.5 md:dark:flex dark:bg-black/60 dark:backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Live sky over {sky.place} · hover a star
        </span>
        <span className="hidden sm:block">
          <LocalTime />
        </span>
      </div>
    </section>
  );
}
