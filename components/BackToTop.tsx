"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/smoothScroll";

// Round "up" button in the bottom-right corner.
// It appears once you've scrolled down a bit and glides you back to the top.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`suck-fixed group fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-card backdrop-blur-md transition-all duration-500 hover:border-accent sm:right-10 sm:bottom-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {/* The arrow lifts off on hover, like a rocket */}
      <span className="text-lg transition duration-300 group-hover:-translate-y-1 group-hover:text-accent">↑</span>
    </button>
  );
}
