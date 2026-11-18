import { Fragment } from "react";
import Reveal from "./Reveal";

/**
 * A heading whose words slide up into view one after another
 * when it scrolls onto the screen (inspired by emotion-agency.com).
 */
export default function RevealWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Reveal>
      <h2 className={className}>
        {words.map((word, i) => (
          // The outer span clips the word, the inner one slides up (see .word in globals.css).
          // The space goes between the word boxes: inside a box, a trailing space would be dropped.
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="word" style={{ "--d": `${delay + i * 70}ms` } as React.CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </h2>
    </Reveal>
  );
}
