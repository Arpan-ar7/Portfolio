import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GroupLabel from "@/components/ui/GroupLabel";
import SpotlightCard from "@/components/projects/SpotlightCard";
import ProjectOrbit from "@/components/projects/ProjectOrbit";
import { GitHubIcon } from "@/components/ui/icons";
import { profile, projects, spotlights } from "@/data/site";

// The projects: the most important part of an AI/ML engineer's portfolio.
//  1. Highlights: two big cards for your research and your live app (SpotlightCard).
//  2. All the other projects (from data/projects.ts), on a 3D orbit you scroll through
//     (ProjectOrbit). It works on phones, tablets and big screens.
//     Clicking any project opens its details window with photos and the GitHub link.
export default function Projects() {
  return (
    <section id="projects" className="page-width pt-20 pb-8 sm:pt-28 sm:pb-12">
      <SectionHeading index="03" label="Projects" title="Things I've built." />

      {/* 1. Highlights: the research and the live app, side by side on laptops and wider */}
      <Reveal>
        <GroupLabel>Highlights · research &amp; live product</GroupLabel>
      </Reveal>
      <div className="mt-6 mb-16 grid gap-6 lg:grid-cols-2">
        {spotlights.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <SpotlightCard item={item} />
          </Reveal>
        ))}
      </div>

      {/* 2. All the other projects, on a 3D orbit you scroll through (on every screen size) */}
      <Reveal>
        <GroupLabel>All projects · scroll to orbit</GroupLabel>
      </Reveal>
      <ProjectOrbit projects={projects} />

      {/* 3. A highlighted button to see everything else on GitHub: small, centered, bright */}
      <Reveal className="mt-10 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="wobble group inline-flex items-center gap-2.5 rounded-full border-2 border-accent bg-[#10203f] px-8 py-2.5 sm:px-10 text-sm font-semibold text-fg shadow-[0_0_30px_-8px_rgba(91,155,255,0.8)] transition-colors hover:bg-accent hover:text-bg"
        >
          <GitHubIcon />
          See all my repos on GitHub
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
