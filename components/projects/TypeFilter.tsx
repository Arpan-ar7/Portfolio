import { twoDigits } from "@/lib/format";
import type { ProjectType } from "./projectTypes";

// The project types ("RAG benchmark", "Web app", ...) next to the orbit (ProjectOrbit).
// Click one to jump to its first project. The current type is highlighted in its own color.
// Two looks: a list on big screens, and a row of chips on phones and tablets.

type Props = {
  types: ProjectType[];
  current: string; // the type of the project at the front of the orbit
  onPick: (firstIndex: number) => void; // called with the position of the type's first project
};

/** Big screens: a list, with a colored bar and how many projects each type has */
export function TypeList({ types, current, onPick }: Props) {
  return (
    <ul className="mt-4 space-y-0.5">
      {types.map((t) => {
        const isCurrent = t.name === current;
        return (
          <li key={t.name}>
            <button
              onClick={() => onPick(t.first)}
              className={`group flex w-full items-center gap-3 py-1.5 text-left font-mono text-xs tracking-[0.14em] uppercase transition-colors ${
                isCurrent ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {/* A bar in the type's color: long when it's the current type */}
              <span
                className={`h-1 shrink-0 rounded-full transition-all duration-300 ${isCurrent ? "w-6" : "w-2 group-hover:w-4"}`}
                style={{ background: t.color }}
              />
              {t.name}
              <span className="text-muted">{twoDigits(t.count)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Phones and tablets: a row of colored chips you can swipe sideways.
 * Hidden on short screens (under 700px tall), so the orbit above still has room.
 */
export function TypeChips({ types, current, onPick }: Props) {
  return (
    <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:-mx-10 sm:px-10 [@media(max-height:700px)]:hidden">
      {types.map((t) => {
        const isCurrent = t.name === current;
        return (
          <li key={t.name} className="shrink-0">
            <button
              onClick={() => onPick(t.first)}
              className="rounded-full border-2 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em] uppercase transition-colors"
              // The current type is filled with its color; the others only have a colored border
              style={isCurrent ? { background: t.color, borderColor: t.color, color: "#05070b" } : { borderColor: `${t.color}66`, color: t.color }}
            >
              {t.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
