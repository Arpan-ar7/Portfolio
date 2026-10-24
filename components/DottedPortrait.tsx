"use client";

import { useEffect, useRef } from "react";

/**
 * Draws a photo as a halftone dot portrait (like a magazine print) that fades softly into the page.
 *  - Dark mode: light dots — brighter parts of the photo get bigger dots.
 *  - Light mode: dark blue "ink" dots — darker parts get bigger dots.
 *
 *  - On load: the dots fly in from all directions and assemble into the photo.
 *  - Scrolling down: the dots scatter out into space.
 *  - Scrolling back up: they come back together.
 *  - Hovering: dots near the mouse get pushed away and float back.
 *
 * Performance: same-colored dots are drawn together in one go, and nothing is
 * redrawn unless something is actually moving.
 */
export default function DottedPortrait({ src, alt }: { src: string; alt: string }) {
  const boxRef = useRef<HTMLDivElement>(null); // the portrait area
  const canvasRef = useRef<HTMLCanvasElement>(null); // bigger than the box, so dots can fly out

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 3.5; // distance between dots (smaller = sharper photo)
    const SCATTER = 1.6; // how far the dots fly out (relative to the portrait size)

    type Dot = {
      ox: number; oy: number; // home position (in the photo)
      sx: number; sy: number; // where it flies to when scattered
      hx: number; hy: number; // extra push from the mouse
      r: number;
    };
    let groups: { color: string; dots: Dot[] }[] = []; // dots grouped by color
    let allDots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    const mouse = { x: -9999, y: -9999, inside: false };

    // Assemble-on-load animation: goes from 1 (scattered) to 0 (assembled)
    let introStart: number | null = null;
    let introP = reduceMotion ? 0 : 1;

    const img = new Image();
    img.src = src;

    // Turn the photo into dots
    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = box.clientWidth; // the portrait circle's size
      const offX = (width - size) / 2; // where the circle starts inside the big canvas
      const offY = (height - size) / 2;
      const cols = Math.floor(size / GAP);

      // Shrink the photo to one pixel per dot and read the colors
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = cols;
      const sctx = sample.getContext("2d")!;
      sctx.imageSmoothingQuality = "high";
      // The photo is a square cut-out (background removed), so it just fills the grid
      sctx.drawImage(img, 0, 0, cols, cols);
      const pixels = sctx.getImageData(0, 0, cols, cols).data;
      // How solid the photo is at a grid cell (0 = background was removed there)
      const alphaAt = (c: number, r: number) =>
        c < 0 || r < 0 || c >= cols || r >= cols ? 0 : pixels[(r * cols + c) * 4 + 3] / 255;

      const dark = document.documentElement.classList.contains("dark");
      const body: Dot[] = []; // normal dots
      const rim: Dot[] = []; // dots along the outline, colored like a rim light
      const center = size / 2;
      for (let row = 0; row < cols; row++) {
        for (let col = 0; col < cols; col++) {
          // Skip where the background was removed
          if (alphaAt(col, row) < 0.5) continue;
          const x = col * GAP + GAP / 2;
          const y = row * GAP + GAP / 2;

          // Fade out toward the bottom, so the shoulders melt into the page
          const fade = Math.min(1, Math.max(0, (size * 0.97 - y) / (size * 0.42)));
          if (fade <= 0) continue;

          // How bright this spot of the photo is (0 = black, 1 = white), slightly brightened
          const i = (row * cols + col) * 4;
          const light = Math.min(1, ((pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11) / 255) * 1.25);
          // Dark mode: bright = big dot. Light mode: dark = big dot (like ink on paper).
          // Stretch the contrast so the face stands out from the shirt
          const raw = Math.min(1, Math.max(0, ((dark ? light : 1 - light) - 0.15) / 0.7));
          const tone = Math.pow(raw, 0.85) * fade;
          if (tone < 0.05) continue;

          // Is this dot on the outline of the person? (a removed-background cell is close by)
          const onEdge =
            alphaAt(col - 2, row) < 0.5 || alphaAt(col + 2, row) < 0.5 || alphaAt(col, row - 2) < 0.5;

          // Scatter direction: outward from the center, with some randomness
          const angle = Math.atan2(y - center, x - center) + (Math.random() - 0.5) * 1.2;
          const flyDist = size * SCATTER * (0.3 + Math.random() * 0.7);
          const dot: Dot = {
            ox: offX + x,
            oy: offY + y,
            sx: Math.cos(angle) * flyDist,
            sy: Math.sin(angle) * flyDist - size * 0.3 * Math.random(), // drift a bit upward
            hx: 0,
            hy: 0,
            r: (GAP / 2) * Math.min(1, onEdge ? 0.75 * fade : 0.3 + tone * 0.75),
          };
          (onEdge ? rim : body).push(dot);
        }
      }
      // Body dots: ice blue-white in dark mode, deep blue ink in light mode. Outline: the accent blue.
      groups = [
        { color: dark ? "#e3eaff" : "#16224f", dots: body },
        { color: dark ? "#5b8cff" : "#2a4fd6", dots: rim },
      ];
      allDots = [...body, ...rim];
      request();
    }

    // How scattered the portrait should be from scrolling: 0 = whole, 1 = fully scattered
    function scrollProgress() {
      const rect = box.getBoundingClientRect();
      // starts once the portrait's top nears the top of the screen
      const p = (20 - rect.top) / rect.height;
      return Math.min(1, Math.max(0, p));
    }

    function render(now: number) {
      frame = 0;
      let keepGoing = false;

      // Intro: assemble over 1.8s
      if (introStart !== null) {
        const t = Math.min(1, (now - introStart) / 1800);
        introP = 1 - (1 - Math.pow(1 - t, 3)); // ease-out
        if (t < 1) keepGoing = true;
        else introStart = null;
      }

      const p = Math.max(introP, reduceMotion ? 0 : scrollProgress());
      const e = p * p * (3 - 2 * p); // smooth in/out curve

      // Mouse push (only while the portrait is mostly assembled)
      if (e < 0.2) {
        for (const d of allDots) {
          if (mouse.inside) {
            const dx = d.ox + d.hx - mouse.x;
            const dy = d.oy + d.hy - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 50) {
              const force = (50 - dist) / 50;
              d.hx += (dx / (dist || 1)) * force * 3;
              d.hy += (dy / (dist || 1)) * force * 3;
            }
          }
          d.hx *= 0.9; // spring back home
          d.hy *= 0.9;
          if (Math.abs(d.hx) > 0.05 || Math.abs(d.hy) > 0.05) keepGoing = true;
        }
      }

      // Draw: one path per color group
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1 - e * 0.8;
      for (const group of groups) {
        ctx.fillStyle = group.color;
        ctx.beginPath();
        for (const d of group.dots) {
          const x = d.ox + d.hx + d.sx * e;
          const y = d.oy + d.hy + d.sy * e;
          const r = d.r * (1 - e * 0.5);
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (keepGoing || mouse.inside) request();
    }

    // Ask for one redraw on the next frame (never more than one queued)
    function request() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      // only react when the mouse is over the portrait circle
      mouse.inside = Math.hypot(e.clientX - (boxRect.left + boxRect.width / 2), e.clientY - (boxRect.top + boxRect.height / 2)) < boxRect.width / 2;
      if (mouse.inside) request();
    }
    function startIntro() {
      if (introStart === null && introP > 0) {
        introStart = performance.now();
        request();
      }
    }
    function onResize() {
      if (img.complete) build();
    }

    // Rebuild the dots when the theme changes (light and dark use different dots)
    const themeWatcher = new MutationObserver(() => {
      if (img.complete) build();
    });
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    img.onload = () => {
      build();
      // Assemble shortly after the photo loads
      setTimeout(startIntro, 200);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      img.onload = null;
      themeWatcher.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [src]);

  return (
    <div ref={boxRef} className="relative h-full w-full">
      {/* Soft patch of page color behind the head, so the background network doesn't run through the face */}
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,var(--bg)_35%,transparent_70%)]" />
      {/* The canvas is bigger than the circle (80% extra on each side) so dots can fly out */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="pointer-events-none absolute -inset-[80%] h-[260%] w-[260%]"
      />
    </div>
  );
}
