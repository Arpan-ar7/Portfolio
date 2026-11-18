import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollRise from "@/components/ui/ScrollRise";
import { about, aboutQuote, profile, stats } from "@/data/site";

// About me: a framed photo with your degree under it, a few paragraphs,
// your stats, and your quote written like a code comment.
// (All the text lives in data/site.ts.)
//
// How it's laid out, by screen width:
//  - phones:            one column (photo, text, stats)
//  - tablets / laptops: two columns (photo | text, with the stats under the text)
//  - wide screens (xl): three columns across the full width (photo | text | stats)
//
// The whole section sits on a solid panel that rises up and fills the screen as you scroll
// to it (see ScrollRise).
export default function About() {
  return (
    <section id="about" className="relative">
      <ScrollRise>
      <div className="page-width w-full py-20 sm:py-24" suppressHydrationWarning data-parallax="8">
      <SectionHeading index="01" label="About" title="About me." />

      {/* (On very wide screens, 3xl, the photo is the tallest column, so the text and stats
          are centered next to it instead of hanging from the top.) */}
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:gap-14 xl:grid-cols-[0.85fr_1.5fr_0.8fr] 3xl:items-center">
        {/* Photo in a solid frame, with a caption bar: degree on top, university and year below */}
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-line bg-card">
            <div className="relative aspect-square">
              <Image
                src="/me/arpan-formal.jpg"
                alt={profile.name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top brightness-[0.92]"
              />
            </div>
            <figcaption className="border-t border-line px-5 py-4 font-mono text-[11px] leading-relaxed tracking-[0.12em] uppercase">
              <span className="block text-fg/90">{profile.degree}</span>
              <span className="block text-muted">
                {profile.university} · {profile.year}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* On wide screens this wrapper "steps aside" (xl:contents), so the text and the stats
            below each become their own column. On smaller screens it's a normal box that
            keeps them stacked next to the photo. */}
        <div className="xl:contents">
          <div>
            {about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 100}>
                {/* The text gets a little bigger on wider screens, so lines never get too long to read */}
                <p className="mb-5 text-lg leading-relaxed text-muted 2xl:text-xl 2xl:leading-relaxed 3xl:text-[1.375rem] 3xl:leading-relaxed">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div>
            {/* Stats: one panel split by thin lines. Side by side on smaller screens,
                stacked on top of each other when they have their own column (xl). */}
            <Reveal delay={300}>
              <dl className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-card xl:mt-0 xl:grid-cols-1 xl:divide-x-0 xl:divide-y">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 p-4 sm:p-5 xl:gap-1.5 xl:p-6">
                    <dt className="text-xs text-muted xl:text-sm">{stat.label}</dt>
                    <dd className="font-mono text-2xl font-medium text-accent xl:text-3xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Your quote, written like a comment in code */}
            <Reveal delay={400}>
              <p className="mt-8 font-mono text-sm text-muted">
                <span className="text-accent">{"//"}</span> &ldquo;{aboutQuote.text}&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </div>
      </div>
      </ScrollRise>
    </section>
  );
}
