"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContactContent, { AvailablePill } from "./ContactContent";
import LightBeamBackdrop from "./LightBeamBackdrop";
import { lockScroll } from "@/lib/smoothScroll";

// How the contact screen opens and closes:
//  "closed"   → nothing on screen
//  "sucking"  → the page gets pulled into the clicked button, and a burst of warm light
//               grows from there until it fills the screen
//  "open"     → the contact screen is shown (a beam of light in the dark)
//  "closing"  → the contact screen fades and the page comes back out
type Phase = "closed" | "sucking" | "open" | "closing";

const SUCK_MS = 850; // keep in sync with the "burst-grow" animation in globals.css (0.15s delay + 0.7s)
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
      // Tell the CSS where the button is (screen position, and position on the whole page)
      html.style.setProperty("--bh-x", `${x}px`);
      html.style.setProperty("--bh-y", `${y}px`);
      html.style.setProperty("--bh-py", `${y + window.scrollY}px`);

      // Reduced motion: skip the effect and show the contact screen straight away
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase("open");

      setOrigin({ x, y });
      html.classList.add("is-sucking"); // page swirls into the button (globals.css)
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
    // Page comes back out
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
      {/* The burst of light: a warm glow grows from the button, its bright center
          fading to black at the edge, until the whole screen is covered */}
      <div
        aria-hidden
        className={`pointer-events-none fixed z-[89] rounded-full ${phase === "closing" ? "burst-shrink" : "burst-grow"}`}
        style={{
          left: origin.x,
          top: origin.y,
          width: size,
          height: size,
          background:
            "radial-gradient(circle, rgba(255,247,232,1) 0%, rgba(255,214,160,0.95) 12%, rgba(170,105,50,0.85) 30%, #000 55%)",
        }}
      />

      {/* The contact screen, shown once the light has filled the screen */}
      {(phase === "open" || phase === "closing") && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contact"
          className={`rise-in fixed inset-0 z-[90] overflow-hidden bg-black text-white ${phase === "open" ? "panel-in" : "panel-out"}`}
        >
          <LightBeamBackdrop className="beam-in" />
          <div className="relative flex h-full flex-col p-6 sm:p-10">
            {/* Top row: logo, availability, close button */}
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-xl font-bold">AR7</span>
              <span className="ml-auto">
                <AvailablePill />
              </span>
              <button
                onClick={close}
                className="wobble rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#ffe2b8]"
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
