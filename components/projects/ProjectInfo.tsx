import type { Project } from "@/data/site";
import { twoDigits } from "@/lib/format";
import { GitHubIcon } from "@/components/ui/icons";

/**
 * The text next to the orbit (ProjectOrbit) about the project at the front: its number,
 * type, name and a short description, then the "Open details" and "GitHub" buttons.
 * On big screens it also shows the stack and the result. `color` is the type's bold color.
 */
export default function ProjectInfo({
  project,
  index,
  count,
  color,
  onOpen,
}: {
  project: Project;
  index: number; // its position in the list (0 = first)
  count: number; // how many projects there are
  color: string;
  onOpen: () => void; // opens the details window
}) {
  return (
    <>
      <p className="flex items-baseline gap-3 font-display">
        <span className="text-4xl leading-none font-bold tabular-nums md:text-5xl xl:text-7xl 2xl:text-8xl">{twoDigits(index + 1)}</span>
        <span className="font-mono text-xs text-muted">/ {twoDigits(count)}</span>
        {/* Phones and tablets: the type sits next to the number, to save space */}
        <span className="ml-auto font-mono text-[11px] font-bold tracking-[0.18em] uppercase xl:hidden" style={{ color }}>
          {project.category}
        </span>
      </p>
      <p className="mt-5 hidden font-mono text-xs font-bold tracking-[0.22em] uppercase transition-colors duration-500 xl:block" style={{ color }}>
        {project.category}
        {project.status && <span className="ml-3 text-emerald-300">● {project.status}</span>}
      </p>
      <h3 className="mt-2 font-display text-xl leading-[1.1] font-bold tracking-tight md:text-2xl xl:text-[clamp(1.6rem,2.2vw,2.6rem)] xl:leading-[1.05]">
        <button onClick={onOpen} className="text-left transition-colors hover:text-accent-2">
          {project.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted [@media(max-height:700px)]:hidden md:line-clamp-3 xl:mt-4 xl:line-clamp-4 xl:text-[15px]">{project.description}</p>

      {/* Stack and result (big screens only; phones see them in the details window) */}
      <dl className="mt-6 hidden grid-cols-2 gap-5 border-t border-line pt-5 xl:grid">
        <div>
          <dt className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">Stack</dt>
          <dd className="mt-1.5 text-sm font-semibold text-fg">{project.tags.slice(0, 3).join(" · ")}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
            {project.metric ? project.metric.label : "Result"}
          </dt>
          <dd className="mt-1 font-mono text-2xl leading-none font-bold tabular-nums transition-colors duration-500" style={{ color }}>
            {project.metric ? project.metric.value : "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-3 xl:mt-7">
        <button
          onClick={onOpen}
          className="wobble inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-bold tracking-[0.15em] text-bg uppercase transition-[background,filter] duration-500 hover:brightness-110"
          style={{ background: color }}
        >
          Open details <span aria-hidden>→</span>
        </button>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="wobble inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-mono text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-500 hover:bg-fg hover:text-bg"
            style={{ borderColor: color, color }}
          >
            <GitHubIcon /> GitHub <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </>
  );
}
