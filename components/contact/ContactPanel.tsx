"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContactContent from "./ContactContent";
import BlackHoleBackdrop from "./BlackHoleBackdrop";
import { lockScroll } from "@/lib/smoothScroll";

// How the contact screen opens and closes:
//  "closed"   → nothing on screen
//  "sucking"  → a black hole opens at the clicked button and swallows the page
//  "open"     → the contact screen is shown (you're "inside" the black hole)
//  "closing"  → the contact screen fades and the page comes back out
type Phase = "closed" | "sucking" | "open" | "closing";

const SUCK_MS = 1150; // keep in sync with the "bh-grow" animation in globals.css (0.3s delay + 0.85s)
const RETURN_MS = 900; // keep in sync with the "unsuck" animation

export default function ContactPanel() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Open when a Let's talk button sends the "open-contact" event
  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      const x = detail?.x ?? window.innerWidth / 2;
      const y = detail?.y ?? window.innerHeight / 2;
      const html = document.documentElement;

      lockScroll(true);
      // Tell the CSS where the black hole is (screen position, and position on the whole page)
      html.style.setProperty("--bh-x", `${x}px`);
      html.style.setProperty("--bh-y", `${y}px`);
      html.style.setProperty("--bh-py", `${y + window.scrollY}px`);

      // Reduced motion: skip the effect and show the contact screen straight away
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase("open");

      setOrigin({ x, y });
      html.classList.add("is-sucking"); // page swirls into the hole (globals.css)
      setPhase("sucking");
      timer.current = setTimeout(() => setPhase("open"), SUCK_MS);
    }
    window.addEventListener("open-contact", onOpen);
    return () => {
      window.removeEventListener("open-contact", onOpen);
      clearTimeout(timer.current);
    };
  }, []);

  const close = useCallback(() => {
    const html = document.documentElement;
    setPhase("closing");
    // Page comes back out of the black hole
    html.classList.remove("is-sucking");
    html.classList.add("is-unsucking");
    timer.current = setTimeout(() => {
      html.classList.remove("is-unsucking");
      lockScroll(false);
      setPhase("closed");
    }, RETURN_MS);
  }, []);

  // Escape closes the contact screen
  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, close]);

  if (phase === "closed") return null;

  // Big enough to cover the farthest corner of the screen from the button
  const size =
    Math.hypot(Math.max(origin.x, window.innerWidth - origin.x), Math.max(origin.y, window.innerHeight - origin.y)) * 2 + 100;

  return (
    <>
      {/* The black hole itself: grows from the button until it fills the screen */}
      <div
        aria-hidden
        className={`pointer-events-none fixed z-[89] rounded-full ${phase === "closing" ? "bh-shrink" : "bh-grow"}`}
        style={{
          left: origin.x,
          top: origin.y,
          width: size,
          height: size,
          background:
            "radial-gradient(circle, #000 0%, #000 64%, #ff8a2a 67%, #ffd9a0 68.5%, rgba(255,140,40,0.35) 70%, rgba(0,0,0,0) 72%)",
        }}
      />

      {/* The contact screen, shown once the page has been swallowed */}
      {(phase === "open" || phase === "closing") && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contact"
          className={`rise-in fixed inset-0 z-[90] overflow-hidden bg-black text-white ${phase === "open" ? "panel-in" : "panel-out"}`}
        >
          <BlackHoleBackdrop className="bh-pull" />
          <div className="relative flex h-full flex-col p-6 sm:p-10">
            {/* Top row: logo + close button */}
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold">AR7</span>
              <button
                onClick={close}
                className="wobble rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#a8c2ff]"
              >
                ✕ Close
              </button>
            </div>
            <ContactContent startDelay={250} />
          </div>
        </div>
      )}
    </>
  );
}
