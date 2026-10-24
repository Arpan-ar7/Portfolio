import Reveal from "../Reveal";
import ContactContent, { AvailablePill } from "../contact/ContactContent";
import LightBeamBackdrop from "../contact/LightBeamBackdrop";

// The contact section at the bottom of the page.
// Same content as the "Let's talk" panel: a beam of light in the dark.
// Its edges fade softly into the page background, so it doesn't look like a separate box.
// The words rise into place when you scroll down to it.
export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-4 pt-24 pb-0 sm:px-6">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden bg-black text-white [mask-image:linear-gradient(to_right,transparent,black_110px,black_calc(100%-110px),transparent),linear-gradient(to_bottom,transparent,black_110px,black_calc(100%-110px),transparent)] [mask-composite:intersect]">
        <LightBeamBackdrop />
        <div className="relative flex min-h-[95vh] flex-col gap-10 p-12 sm:p-28">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.3em] text-[#ffe2b8] uppercase">{"// 04 — Contact"}</p>
            <AvailablePill />
          </div>
          <ContactContent startDelay={200} />
        </div>
      </Reveal>
    </section>
  );
}
