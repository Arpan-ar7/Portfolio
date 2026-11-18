import type { Project } from "@/data/site";

// Every project type ("RAG benchmark", "Web app", ...) gets its own bold color, given out in
// the order the types first appear in data/projects.ts. The orbit, the cards and the details
// window all use it, so a project always has the same color everywhere.
const TYPE_COLORS = ["#4d8dff", "#ff7a2f", "#b26bff", "#22e0a1", "#ff4f8b", "#ffd23f", "#2fd6ff", "#c6ff3d"];

export type ProjectType = {
  name: string;
  color: string;
  count: number; // how many projects have this type
  first: number; // the position of the first project with this type
};

/** The list of project types, in order, with their color and how many projects each has */
export function getProjectTypes(projects: Project[]): ProjectType[] {
  const types: ProjectType[] = [];
  projects.forEach((p, i) => {
    const type = types.find((t) => t.name === p.category);
    if (type) type.count++;
    else types.push({ name: p.category, color: TYPE_COLORS[types.length % TYPE_COLORS.length], count: 1, first: i });
  });
  return types;
}

/** The color of one project's type */
export function colorOf(project: Project, types: ProjectType[]) {
  return types.find((t) => t.name === project.category)?.color ?? TYPE_COLORS[0];
}
