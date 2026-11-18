"use client";

import { useEffect, useRef } from "react";
import { isContactOpen } from "@/lib/dom";

/**
 * Small stars that slowly drift to the left and twinkle. Used by the page background
 * (NightSky), so they're behind the whole site.
 *
 *  - A few stars are a bit bigger and bluer.
 *  - Some drift faster than others, which feels like depth.
 *  - The whole star layer shifts a little with the mouse (data-parallax, see lib/pointer.ts).
 *  - It pauses while the "Let's talk" contact screen is open (the stars are hidden then).
 *  - "Reduce motion": the stars stay still.
 *
 * To change it: STAR_DENSITY for how many stars, DRIFT for how fast they move.
 */
const STAR_DENSITY = 1 / 9000; // stars per pixel of screen (bigger number = more stars)
const DRIFT = 0.06; // how fast the stars drift left, in pixels per frame

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;

    type Star = { x: number; y: number; r: number; speed: number; phase: number; blue: boolean };
    let stars: Star[] = [];

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(width * height * STAR_DENSITY);
      stars = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.12; // a few bigger, bluer stars
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: bright ? 1 + Math.random() * 0.8 : 0.4 + Math.random() * 0.7,
          speed: 0.4 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          blue: bright,
        };
      });
      draw(performance.now());
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;
      for (const s of stars) {
        if (!reduceMotion) {
          s.x -= DRIFT * s.speed;
          if (s.x < -4) {
            // went off the left edge: come back in on the right, at a new height
            s.x = width + 4;
            s.y = Math.random() * height;
          }
        }
        // Twinkle: brightness gently goes up and down
        const twinkle = 0.55 + 0.45 * Math.sin(t * (0.6 + s.speed) + s.phase);
        ctx.globalAlpha = (s.blue ? 0.9 : 0.6) * twinkle;
        ctx.fillStyle = s.blue ? "#a9c9ff" : "#e6ecf5";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(now: number) {
      // Skip drawing while the contact screen is opening, open or closing
      if (!isContactOpen()) draw(now);
      frame = requestAnimationFrame(loop);
    }

    build();
    if (!reduceMotion) frame = requestAnimationFrame(loop);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
    };
  }, []);

  // A little bigger than the screen, so shifting with the mouse never shows an edge
  return <canvas ref={canvasRef} className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)]" suppressHydrationWarning data-parallax="-12" />;
}
