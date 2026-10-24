import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { skills } from "@/data/site";

// Skills grouped into cards, each skill is a small "chip".
export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" label="Skills" title="My toolkit." />

      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 120}>
            <div className="h-full rounded-3xl border border-line bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-muted transition hover:border-accent hover:text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
