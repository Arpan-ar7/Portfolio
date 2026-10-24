import Image from "next/image";
import Reveal from "../Reveal";
import TripMeter from "../TripMeter";
import { profile } from "@/data/site";

// The end of the page: "Earthrise" — Earth rising over the Moon's horizon,
// the end of the "leaving Earth" journey that starts at the top of the page.
//  - A trip meter that counts the km "travelled" while scrolling (Earth → Moon).
//  - A few honest, slightly silly lines and a feedback button.
// The footer fades in from the page background (no hard edge), and overlaps the bottom
// of the contact section so the two blend together.
export default function Footer() {
  // Opens a new email in Gmail with the subject already filled in
  const feedbackLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent("Feedback on your portfolio")}`;

  return (
    <footer className="relative -mt-24 overflow-hidden bg-gradient-to-b from-transparent via-black/85 via-35% to-black pt-32 text-white">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <p className="font-display text-2xl font-semibold sm:text-3xl">Thanks for visiting my corner of the universe.</p>
        <TripMeter />
      </div>

      {/* The stage: Earth, the honest lines, then the Moon's surface */}
      <div className="relative">
        {/* The Earth, rising into view when you scroll down to it */}
        <Reveal className="relative mx-auto mt-14 aspect-[310/250] w-[min(70vw,20rem)]">
          <Image
            src="/media/earthrise-earth.jpg"
            alt="Earth rising over the Moon's horizon"
            fill
            sizes="320px"
            className="object-cover [mask-image:radial-gradient(circle,black_55%,transparent_72%)]"
          />
        </Reveal>

        {/* A few honest, slightly silly lines (plain text, no box) */}
        <Reveal delay={150} className="relative z-20 mx-auto mt-10 max-w-xl px-6 text-center">
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">
            (If you&apos;re here to hire, ignore this.)
          </p>
          <p className="mt-4 leading-relaxed text-white/80">
            Why is there a Moon at the bottom of my portfolio? Honestly, no real reason. I just thought it looked
            cool. My life, my rules{" "}
            <span role="img" aria-label="laughing">
              😂
            </span>
          </p>
          <p className="mt-4 leading-relaxed text-white/60">
            Truth is, I didn&apos;t know what to put here, so I&apos;m writing all this useless stuff. And if
            anyone from HR is reading this: it&apos;s alright, I&apos;ll understand why I didn&apos;t get a call or
            an email{" "}
            <span role="img" aria-label="smiling through tears">
              🥲
            </span>
          </p>
          <p className="mt-4 leading-relaxed text-white/60">
            Also, full honesty: I built this website with a lot of help from AI (obviously). If anything here feels
            over-designed, confusing, or just not good, please tell me what to change. I&apos;m open to every
            suggestion, and I&apos;d really appreciate it.
          </p>
          {profile.email && (
            <a
              href={feedbackLink}
              target="_blank"
              rel="noreferrer"
              className="wobble group mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffe2b8] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
            >
              Send me feedback
              <span className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
        </Reveal>

        {/* The Moon's surface across the full width, fading in from the black at its top */}
        <div className="relative z-10 -mt-10 aspect-[640/201] max-h-[45vh] w-full [mask-image:linear-gradient(to_bottom,transparent,black_35%)]">
          <Image src="/media/earthrise-moon.jpg" alt="" fill sizes="100vw" className="object-cover object-top" />
          {/* Copyright sits on the Moon, with a soft shadow behind it so it stays readable */}
          <p className="absolute inset-x-0 bottom-6 text-center font-mono text-xs text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
            © 2026 {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
