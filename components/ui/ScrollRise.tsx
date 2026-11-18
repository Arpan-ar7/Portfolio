"use client";

import { useEffect, useRef } from "react";
import { pageTop } from "@/lib/dom";

/**
 * A panel that "rises up" as you scroll to it, then covers the whole screen.
 *
 *  - When it first comes into view, it's tilted back (like a laptop screen leaning away),
 *    much smaller, with rounded corners.
 *  - As you keep scrolling, it stands up straight and grows until it covers the screen
 *    from edge to edge (it's at least one full screen tall), with square corners.
 *
 * The movement follows your scrolling, and it glides a little behind it (GLIDE), so it feels
 * smooth rather than stiff. Scrolling back up plays it in reverse.
 * Only "transform" changes, which is cheap for the browser.
 *
 * NUMBERS YOU CAN CHANGE
 */
const TILT_DEG = 32; // how far back it leans at the start
const START_SCALE = 0.62; // how big it is at the start (1 = full size)
const RADIUS_PX = 48; // how round the corners are at the start
const DISTANCE = 1; // how much scrolling it takes to stand up fully (1 = one screen height)
const GLIDE = 0.1; // how quickly it catches up with your scrolling (smaller = smoother and floatier)

export default function ScrollRise({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current!;
    // "Reduce motion": just show it flat and full size
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let p = -1; // how far it has risen right now, 0 to 1 (glides after "target")

    function update() {
      frame = 0;
      // Where the panel's top is on the screen right now (see pageTop in lib/dom.ts)
      const top = pageTop(panel) - window.scrollY;

      // 0 = the panel's top is at the bottom of the screen, 1 = it has reached the top of the screen
      const vh = window.innerHeight;
      const raw = Math.min(1, Math.max(0, (vh - top) / (vh * DISTANCE)));
      const target = raw * raw * (3 - 2 * raw); // starts gently, speeds up, settles gently

      if (p < 0) p = target; // first time: start right there
      p += (target - p) * GLIDE;
      if (Math.abs(target - p) < 0.0005) p = target;

      panel.style.transform = `perspective(1600px) rotateX(${(1 - p) * TILT_DEG}deg) scale(${START_SCALE + (1 - START_SCALE) * p})`;
      panel.style.borderRadius = `${(1 - p) * RADIUS_PX}px`;

      if (p !== target) request(); // keep gliding until it has caught up
    }

    function request() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      // origin-top: it pivots on its top edge, like a screen being lifted up.
      // A solid panel, a shade lighter than the page, at least one screen tall, with a blue
      // top edge and a soft blue glow, so you can clearly see it rise.
      className={`flex min-h-screen origin-top flex-col justify-center overflow-hidden border-y border-t-accent/50 border-b-line bg-[#0d131c] shadow-[0_-40px_120px_-40px_rgba(91,155,255,0.5)] will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
