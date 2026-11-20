// People you've built things with.
// They're credited on the projects you did together (the "teammate" field in spotlights.ts and
// projects.ts) and get their own card at the very end of the page.

export type Collaborator = {
  name: string;
  role: string; // one short line under their name
  url: string; // their portfolio (or GitHub / LinkedIn)
  workedOn: string[]; // what you built together, shown as tags on their card
};

export const collaborators: Collaborator[] = [
  {
    name: "Adarsh Milan",
    role: "Software engineer & full-stack developer · my teammate at Marwadi University",
    url: "https://portfoliyo-zeta-indol.vercel.app/",
    workedOn: ["UniCart", "Unlearning research", "Splitter: AI clip auto-uploader"],
  },
];

/** Finds a collaborator by name (used by the project cards to link to them) */
export function findCollaborator(name?: string) {
  return collaborators.find((person) => person.name === name);
}
