// A small blue label with a line in front, used above a group of things
// (e.g. "Highlights", "All projects", "More projects").
export default function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
      <span className="h-px w-8 bg-accent" />
      {children}
    </h3>
  );
}
