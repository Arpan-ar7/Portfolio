"use client";

import { useIsDark } from "@/lib/useIsDark";

/**
 * The light / dark switch.
 *  - Light: a blue day sky with clouds, and a plain white knob on the left.
 *  - Dark:  a night sky with twinkling stars, and a spinning black hole on the right.
 * Clicking it switches the theme straight away (the page colors just fade smoothly).
 */
export default function ThemeToggle() {
  const dark = useIsDark();

  function toggle() {
    const toDark = !dark;
    document.documentElement.classList.toggle("dark", toDark);
    try {
      localStorage.setItem("theme", toDark ? "dark" : "light");
    } catch {}
  }

  // Positions of the little stars in the night sky (left side of the switch)
  const stars = [
    { left: "14%", top: "28%", size: 2, delay: "0s" },
    { left: "26%", top: "62%", size: 1.5, delay: "0.6s" },
    { left: "38%", top: "22%", size: 1.5, delay: "1.2s" },
    { left: "46%", top: "58%", size: 2, delay: "0.3s" },
    { left: "20%", top: "45%", size: 1, delay: "0.9s" },
  ];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="relative h-6 w-11 shrink-0 overflow-hidden rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-line"
    >
      {/* Day sky */}
      <span
        className={`absolute inset-0 bg-gradient-to-b from-[#7cc4ff] to-[#2f7bea] transition-opacity duration-500 ${dark ? "opacity-0" : "opacity-100"}`}
      />
      {/* Clouds (they sink out of view at night) */}
      <span className={`absolute inset-0 transition-transform duration-500 ${dark ? "translate-y-full" : "translate-y-0"}`}>
        <span className="absolute right-0.5 bottom-[-5px] h-4 w-4 rounded-full bg-white" />
        <span className="absolute right-3 bottom-[-6px] h-4 w-4 rounded-full bg-white/95" />
      </span>

      {/* Night sky */}
      <span
        className={`absolute inset-0 bg-gradient-to-b from-[#1c2033] to-[#05060c] transition-opacity duration-500 ${dark ? "opacity-100" : "opacity-0"}`}
      />
      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute animate-pulse rounded-full bg-white transition-opacity duration-500 ${dark ? "opacity-100" : "opacity-0"}`}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}

      {/* The knob: plain white on the left (day), black hole on the right (night) */}
      <span
        className={`absolute top-[3px] left-[3px] h-[18px] w-[18px] transition-transform duration-500 ease-[cubic-bezier(0.5,1.6,0.4,1)] ${dark ? "translate-x-5" : "translate-x-0"}`}
      >
        {/* Plain knob */}
        <span
          className={`absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all duration-500 ${dark ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
        />
        {/* Black hole: spinning glowing ring around a dark core */}
        <span className={`absolute inset-0 transition-all duration-500 ${dark ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <span className="bh-ring absolute -inset-1 rounded-full" />
          <span className="absolute inset-[22%] rounded-full bg-black shadow-[0_0_6px_2px_rgba(255,150,60,0.6)]" />
        </span>
      </span>
    </button>
  );
}
