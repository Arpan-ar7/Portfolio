import { findCollaborator } from "@/data/site";

/**
 * A small "Built together with Adarsh Milan ↗" line that links to that person's portfolio.
 * `name` must match someone in data/collaborators.ts; if it doesn't (or is empty), nothing shows.
 * `color` is the link's color (the project type's color, or the site's blue by default).
 */
export default function TeammateLink({ name, color, className = "" }: { name?: string; color?: string; className?: string }) {
  const person = findCollaborator(name);
  if (!person) return null;

  return (
    <p className={`font-mono text-[11px] tracking-[0.08em] text-muted ${className}`}>
      Built together with{" "}
      <a
        href={person.url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-accent-2 underline decoration-1 underline-offset-4 transition-colors hover:text-fg"
        style={color ? { color } : undefined}
      >
        {person.name} <span aria-hidden>↗</span>
      </a>
    </p>
  );
}
