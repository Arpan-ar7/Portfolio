import { profile } from "@/data/site";

// The end of the page: a simple row with how the site was made, a feedback button, and your links.
export default function Footer() {
  // Opens a new email in Gmail with the subject already filled in
  const feedbackLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent("Feedback on your portfolio")}`;

  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Résumé", href: profile.resume }, // hidden until you add it in data/site.ts
  ].filter((link) => link.href);

  return (
    <footer className="page-width pt-10">
      {/* Extra space at the bottom so the round "back to top" button never covers anything */}
      <div className="flex flex-col gap-8 border-t border-line pt-10 pb-28 md:flex-row md:items-start md:justify-between">
        <div className="max-w-lg">
          <p className="font-display text-xl font-bold tracking-tight">
            AR<span className="text-accent">7</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Designed &amp; built by {profile.name}. If anything here feels over-designed, confusing, or just not good,
            please tell me what to change.
          </p>
          {/* Stays pale gold on purpose, whatever the site's theme color is */}
          {profile.email && (
            <a
              href={feedbackLink}
              target="_blank"
              rel="noreferrer"
              className="wobble group mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffe2b8] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
            >
              Send me feedback
              <span className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-muted md:pt-1.5">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="inline-block py-2.5 underline-offset-4 transition-colors hover:text-fg hover:underline">
                {link.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
