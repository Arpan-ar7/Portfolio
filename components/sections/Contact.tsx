import Reveal from "@/components/ui/Reveal";
import ContactContent, { AvailablePill } from "@/components/contact/ContactContent";
import LightBeamBackdrop from "@/components/contact/LightBeamBackdrop";

// The contact section at the bottom of the page.
// Same content as the "Let's talk" panel: a beam of light in the dark.
// Its edges fade softly into the page background, so it doesn't look like a separate box.
// The fade is narrower on phones (24px instead of 110px) so it doesn't dim the text.
// The words rise into place when you scroll down to it.
// Only a small gap above it, so it follows the Projects section closely.
// It's as wide as the rest of the page (up to 1920px), like the full-screen "Let's talk" panel.
export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-2 pt-4 pb-0 sm:px-6 sm:pt-6">
      <Reveal className="relative mx-auto max-w-[1920px] overflow-hidden bg-black text-white [--fade:24px] sm:[--fade:110px] [mask-image:linear-gradient(to_right,transparent,black_var(--fade),black_calc(100%-var(--fade)),transparent),linear-gradient(to_bottom,transparent,black_var(--fade),black_calc(100%-var(--fade)),transparent)] [mask-composite:intersect]">
        <LightBeamBackdrop />
        <div className="relative flex min-h-[95vh] flex-col gap-10 px-7 py-16 sm:px-28 sm:pt-24 sm:pb-28">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.2em] whitespace-nowrap text-[#a9c9ff] uppercase sm:tracking-[0.3em]">{"// 04 — Contact"}</p>
            <AvailablePill />
          </div>
          <ContactContent startDelay={200} />
        </div>
      </Reveal>
    </section>
  );
}
