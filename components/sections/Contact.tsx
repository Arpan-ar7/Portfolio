import Reveal from "../Reveal";
import ContactContent from "../contact/ContactContent";
import BlackHoleBackdrop from "../contact/BlackHoleBackdrop";

// The contact section at the bottom of the page.
// Same content as the "Let's talk" panel, shown on a black hole card.
// The words rise into place when you scroll down to it.
export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-4 pt-24 pb-0 sm:px-6">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-black text-white">
        <BlackHoleBackdrop />
        <div className="relative flex min-h-[80vh] flex-col gap-10 p-8 sm:p-14">
          <p className="font-mono text-xs tracking-[0.3em] text-[#a8c2ff] uppercase">{"// 04 — Contact"}</p>
          <ContactContent startDelay={200} />
        </div>
      </Reveal>
    </section>
  );
}
