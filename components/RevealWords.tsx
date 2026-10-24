import Reveal from "./Reveal";

/**
 * A heading whose words slide up into view one after another
 * when it scrolls onto the screen (inspired by emotion-agency.com).
 *
 * `highlight` = index of a word to color with the accent gradient (e.g. your name).
 */
export default function RevealWords({
  text,
  as: Tag = "h2",
  className = "",
  highlight,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  highlight?: number;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Reveal>
      <Tag className={className}>
        {words.map((word, i) => (
          // The outer span clips the word, the inner one slides up (see .word in globals.css)
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              className={`word ${i === highlight ? "bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent" : ""}`}
              style={{ "--d": `${delay + i * 70}ms` } as React.CSSProperties}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </Tag>
    </Reveal>
  );
}
