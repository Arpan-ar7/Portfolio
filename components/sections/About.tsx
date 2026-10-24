import Image from "next/image";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { about, profile, stats } from "@/data/site";

// About me: photo, a few paragraphs, and small stat cards.
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" label="About" title="A student of code and the cosmos." />

      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        {/* Photo */}
        <Reveal className="relative aspect-square overflow-hidden rounded-3xl border border-line">
          <Image
            src="/me/arpan-formal.jpg"
            alt={profile.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
          />
        </Reveal>

        <div>
          {about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="mb-5 text-lg leading-relaxed text-muted">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={300} className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-card p-4">
                <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
