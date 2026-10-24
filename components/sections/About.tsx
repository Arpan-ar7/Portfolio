import Image from "next/image";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { about, aboutQuote, profile, stats } from "@/data/site";

// About me: photo, a few paragraphs, small stat cards, and a favourite quote at the end.
export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" label="About" title="About me." />

      <div className="relative grid gap-12 md:grid-cols-[1fr_1.4fr]">
        {/* Photo, blended softly into the page: edges fade into the background,
            the bottom fades a little more, and a light blue tint matches the site colors */}
        <Reveal className="relative aspect-square overflow-hidden rounded-3xl">
          <Image
            src="/me/arpan-formal.jpg"
            alt={profile.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top brightness-[0.92] saturate-[0.9]"
          />
          <div aria-hidden className="absolute inset-0 bg-accent/10 mix-blend-soft-light" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <div aria-hidden className="absolute inset-0 rounded-3xl shadow-[inset_0_0_70px_24px_var(--bg)]" />
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

      {/* A favourite quote to close the section (text and author live in data/site.ts) */}
      <Reveal className="mx-auto mt-24 max-w-3xl text-center">
        <figure>
          <blockquote className="font-serif text-3xl leading-snug italic sm:text-5xl">
            <span className="text-accent">&ldquo;</span>
            {aboutQuote.text}
            <span className="text-accent">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-accent" />
            {aboutQuote.author}
            <span className="h-px w-8 bg-accent" />
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
