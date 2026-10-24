import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { profile, projects } from "@/data/site";

// Project cards. Each card links to the GitHub repo.
export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="03" label="Projects" title="Things I've built." />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 100}>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-3xl border border-line bg-card p-6 transition hover:-translate-y-1 hover:border-accent"
            >
              {/* Card number, like a mission log */}
              <p className="font-mono text-xs text-muted">LOG_{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {project.title}
                <span className="ml-1 inline-block transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
          See all my repos on GitHub →
        </a>
      </Reveal>
    </section>
  );
}
