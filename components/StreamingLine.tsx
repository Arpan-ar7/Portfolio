"use client";

import { Fragment, useEffect, useState } from "react";

/**
 * Shows a line of text the way an AI chatbot streams its answer:
 * word by word ("token by token"), with a blinking cursor.
 *
 * The full text is always in the page (unshown words are just invisible), so the
 * layout never jumps and search engines / screen readers still read the whole line.
 */
export default function StreamingLine({
  text,
  startDelay = 1400,
  className = "",
}: {
  text: string;
  startDelay?: number; // ms to wait before "generating" starts
  className?: string;
}) {
  const words = text.split(" ");
  const [count, setCount] = useState(0); // how many words are shown so far

  useEffect(() => {
    // People who turned on "reduce motion" just get the whole line
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => {
        setCount(words.length);
      }, 0);
      return () => clearTimeout(t);
    }

    let timer: ReturnType<typeof setTimeout>;
    let shown = 0;

    // Show the next word after a slightly random wait, like real model output
    function next() {
      shown++;
      setCount(shown);
      if (shown < words.length) timer = setTimeout(next, 55 + Math.random() * 110);
    }

    timer = setTimeout(next, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay, words.length]);

  return (
    <div className={className}>
      {/* Every word is always in place (so the centered line never shifts);
          words not "generated" yet are just invisible. */}
      <p>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={`relative transition-opacity duration-150 ${i < count ? "opacity-100" : "opacity-0"}`}>
              {word}
              {/* Blinking cursor right after the newest word */}
              {i === count - 1 && (
                <span aria-hidden className="caret absolute top-[0.2em] left-full ml-1 h-[1em] w-[0.45em] bg-accent" />
              )}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
