import Image from "next/image";
import type { Project } from "@/data/site";
import { shortLink, twoDigits } from "@/lib/format";
import MiniChart from "./MiniChart";

/**
 * One glowing project screen on the orbit (see ProjectOrbit): a window bar with the repo
 * address, the project's type, its big name (with a slight red/blue edge, like a monitor),
 * the project's first photo (or a small chart if it has none), and its stack and result.
 * Scan lines run across it like an old display.
 * It's smaller on phones and tablets (the classes without "xl:"), and full size on big screens.
 */
export default function OrbitScreen({
  project,
  index,
  color,
  isActive,
  onClick,
  style,
}: {
  project: Project;
  index: number;
  color: string;
  isActive: boolean; // is it the screen at the front?
  onClick: () => void;
  style: React.CSSProperties; // its place on the orbit (set by ProjectOrbit)
}) {
  const photo = project.images?.[0];

  return (
    <button
      onClick={onClick}
      aria-label={isActive ? `Open details: ${project.title}` : `Show project ${index + 1}: ${project.title}`}
      // Only the front screen can be reached with the Tab key (the others are mostly hidden)
      tabIndex={isActive ? 0 : -1}
      className="group/screen absolute top-1/2 left-1/2 -mt-[6.5rem] -ml-[9.5rem] flex h-[13rem] w-[19rem] [@media(max-height:700px)]:-mt-[5.25rem] [@media(max-height:700px)]:h-[10.5rem] cursor-pointer flex-col overflow-hidden rounded-2xl border-2 md:-mt-[8.75rem] md:-ml-[14rem] md:h-[17.5rem] md:w-[28rem] xl:top-[48%] xl:-mt-[10.5rem] xl:-ml-[17rem] xl:h-[21rem] xl:w-[34rem] xl:rounded-[1.4rem] bg-[#0a0f18] text-left [backface-visibility:hidden] focus-visible:outline-none"
      style={{ ...style, borderColor: color, boxShadow: `0 0 70px -12px ${color}aa, inset 0 0 60px -20px ${color}66` }}
    >
      {/* Background: the type's color as a strong glow in one corner, over a faint grid */}
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:26px_26px]" />
      <span aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 70% at 100% 0%, ${color}55, transparent 70%)` }} />

      {/* Window bar: the repo address (or "code coming soon") and three dots */}
      <span className="relative flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-4 py-2 font-mono text-[9px] text-fg/70 md:px-5 md:py-2.5 md:text-[10px]">
        <span className="truncate">{project.link ? shortLink(project.link) : "code coming soon"}</span>
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        </span>
      </span>

      <span className="relative flex min-h-0 flex-1 gap-3 px-4 py-3.5 md:gap-5 md:px-6 md:py-5">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase md:text-[10px]" style={{ color }}>
            [ {twoDigits(index + 1)} · {project.category} ]
          </span>
          {/* The name, with a thin red and blue edge, like text on a real screen */}
          <span className="mt-2 font-display text-lg leading-[1.05] md:mt-3 md:text-[1.8rem] xl:text-[2.2rem] xl:leading-[1.02] font-bold tracking-tight text-balance uppercase [text-shadow:-1.5px_0_rgba(255,70,70,0.55),1.5px_0_rgba(70,160,255,0.55)]">
            {project.title}
          </span>
          <span className="mt-auto flex items-end justify-between gap-3 font-mono text-[10px] text-fg/70 md:text-[11px]">
            <span className="truncate">{project.tags.slice(0, 3).join(" · ")}</span>
            {project.metric && (
              <span className="shrink-0 text-base leading-none font-bold tabular-nums md:text-xl" style={{ color }}>
                {project.metric.value}
              </span>
            )}
          </span>
        </span>

        {/* Right side: the project's photo, or a small chart if it has none */}
        <span aria-hidden className="flex w-20 shrink-0 items-center md:w-32 xl:w-40">
          {photo ? (
            <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg border" style={{ borderColor: `${color}88` }}>
              <Image src={photo.src} alt="" fill sizes="160px" className="object-cover object-top" />
            </span>
          ) : (
            <MiniChart seed={project.title} kind={index % 3} color={color} />
          )}
        </span>
      </span>

      {/* Scan lines across the screen, like an old display */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_3px)]" />

      {/* "Open details" bar: slides up from the bottom when you hover the front screen */}
      {isActive && (
        <span
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between px-6 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em] text-bg uppercase transition-transform duration-300 group-hover/screen:translate-y-0 group-focus-visible/screen:translate-y-0"
          style={{ background: color }}
        >
          Open details <span aria-hidden>→</span>
        </span>
      )}

      {/* A dark cover: none on the front screen, darker the further a screen is from the front */}
      <span data-shade className="pointer-events-none absolute inset-0 bg-[#05070b] opacity-0" />
    </button>
  );
}
