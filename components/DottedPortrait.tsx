"use client";

import { useEffect, useRef } from "react";

/**
 * Draws a photo as a halftone dot portrait (like a magazine print) that fades softly into the page.
 *  - Dark mode: light dots — brighter parts of the photo get bigger dots.
 *  - Light mode: dark blue "ink" dots — darker parts get bigger dots.
 *
 *  - On load: the dots start as tiny specks spread out like stars, then gather
 *    in a wave and assemble into the photo.
 *  - Scrolling down: the dots scatter out into space.
 *  - Scrolling back up: they come back together.
 *  - Hovering: dots near the mouse get gently pushed aside and float back. The push fades
 *    off smoothly with distance, so it ripples the portrait without leaving an empty ring.
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
      ix: number; iy: number; // where it starts before the intro (its "star" position)
      delay: number; // 0-0.45: when this dot starts gathering in the intro (makes a wave)
      hx: number; hy: number; // extra offset from the mouse push
      r: number;
    };
    let groups: { color: string; dots: Dot[] }[] = []; // dots grouped by color
    let allDots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };
    let width = 0;
    let height = 0;
    let frame = 0;

    // Assemble-on-load animation: introT goes from 0 (stars spread out) to 1 (assembled)
    const INTRO_MS = 2600;
    let introStart: number | null = null;
    let introT = reduceMotion ? 1 : 0;

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
            // intro start: a random spot anywhere in the big canvas, like a star in the sky
            ix: Math.random() * width - (offX + x),
            iy: Math.random() * height - (offY + y),
            // dots near the face gather first, the edges a little later
            delay: Math.min(0.45, (Math.hypot(x - center, y - center * 0.8) / size) * 0.5 + Math.random() * 0.15),
            hx: 0,
            hy: 0,
            r: (GAP / 2) * Math.min(1, onEdge ? 0.75 * fade : 0.3 + tone * 0.75),
          };
          (onEdge ? rim : body).push(dot);
        }
      }
      // Body dots: warm white. Outline: the gold accent, like a rim light from the star.
      groups = [
        { color: dark ? "#f3ece0" : "#16224f", dots: body },
        { color: dark ? "#f5c451" : "#a8741a", dots: rim },
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

      // Intro: gather over INTRO_MS
      if (introStart !== null) {
        introT = Math.min(1, (now - introStart) / INTRO_MS);
        if (introT < 1) keepGoing = true;
        else introStart = null;
      }
      const intro = introT < 1;

      const p = reduceMotion ? 0 : scrollProgress();
      const e = p * p * (3 - 2 * p); // smooth in/out curve

      // Mouse push (once the portrait is assembled and on screen)
      if (!intro && e < 0.2) {
        const R = 70; // how far the push reaches, in pixels
        for (const d of allDots) {
          if (mouse.inside) {
            const dx = d.ox + d.hx - mouse.x;
            const dy = d.oy + d.hy - mouse.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < R) {
              const f = (1 - dist / R) ** 2; // strongest near the mouse, fading smoothly to 0
              d.hx += (dx / dist) * f * 2;
              d.hy += (dy / dist) * f * 2;
            }
          }
          d.hx *= 0.9; // spring back home
          d.hy *= 0.9;
          if (Math.abs(d.hx) > 0.05 || Math.abs(d.hy) > 0.05) keepGoing = true;
        }
      }

      // Draw: one path per color group
      ctx.clearRect(0, 0, width, height);
      // during the intro everything brightens as the stars gather
      ctx.globalAlpha = (1 - e * 0.8) * (intro ? 0.45 + 0.55 * introT : 1);
      for (const group of groups) {
        ctx.fillStyle = group.color;
        ctx.beginPath();
        for (const d of group.dots) {
          // how far along this dot's own trip is (0 = still a star, 1 = home)
          const q = intro ? Math.min(1, Math.max(0, (introT - d.delay) / 0.55)) : 1;
          const k = Math.pow(1 - q, 3); // ease-out: fast at first, gentle landing
          const x = d.ox + d.hx + d.sx * e + d.ix * k;
          const y = d.oy + d.hy + d.sy * e + d.iy * k;
          const r = d.r * (1 - e * 0.5) * (1 - k * 0.7); // small like a star while flying
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
      // only react when the mouse is over the portrait
      mouse.inside =
        Math.hypot(e.clientX - (boxRect.left + boxRect.width / 2), e.clientY - (boxRect.top + boxRect.height / 2)) <
        boxRect.width / 2;
      if (mouse.inside) request();
    }
    function startIntro() {
      if (introStart === null && introT < 1) {
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
      {/* Soft patch of page color behind the head, so background stars don't show through the face */}
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
