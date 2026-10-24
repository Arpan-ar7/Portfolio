"use client";

import { useEffect, useRef, useState } from "react";
import { STARS, LINES } from "@/lib/stars";
import { CONSTELLATIONS, STAR_FACTS, wikiLink, brightnessWords } from "@/lib/starInfo";
import { pointer } from "@/lib/pointer";
import { sky } from "@/data/site";

/**
 * The full-screen background: the REAL night sky above you, right now.
 *
 *  - Uses the current time and a place on Earth (sky.lat / sky.lon in data/site.ts)
 *    to work out where every star in lib/stars.ts is in the sky at this moment.
 *  - The middle of the screen is the point straight overhead.
 *  - The sky slowly turns with the real Earth's rotation.
 *  - Hover over a bright star to see its name, light up its constellation and show the
 *    constellation's name. Click it to open a small info card (facts, where it is right now,
 *    and a Wikipedia link).
 *  - Lots of faint filler stars are added for depth (those ones are not real).
 *
 * Pauses when the tab is hidden.
 */

const RAD = Math.PI / 180;

// Stars that look orange/red in real life (the rest are drawn blue-white)
const WARM = new Set(["Betelgeuse", "Antares", "Aldebaran", "Arcturus", "Pollux", "Mirfak", "Dubhe", "Alphard", "Hamal", "Schedar", "Kaus Australis", "Enif", "Ras Algethi", "Gacrux", "Tarazed", "Scheat"]);

type SkyStar = {
  ra: number; dec: number; mag: number;
  name?: string; con?: string;
  r: number; alpha: number; color: string; phase: number; speed: number;
  x: number; y: number; visible: boolean; // filled in every frame
  alt: number; az: number; // height above the horizon and compass direction, in degrees
};

// What the info card shows about a clicked star
type Picked = { name: string; con: string; mag: number; alt: number; az: number; x: number; y: number };

// Compass direction (0 = north, 90 = east) in words, e.g. "north-east"
function compass(az: number) {
  const names = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
  return names[Math.round((((az % 360) + 360) % 360) / 45) % 8];
}

// A small random number generator with a fixed seed, so the filler stars are the same every visit
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Make one star's look (size, brightness, twinkle) from its magnitude
function makeStar(ra: number, dec: number, mag: number, rand: () => number, name?: string, con?: string): SkyStar {
  return {
    ra, dec, mag, name, con,
    r: Math.max(0.45, 2.3 - mag * 0.33), // brighter star = bigger dot
    alpha: Math.min(1, Math.max(0.18, 1 - (mag + 1.5) / 8)),
    color: name && WARM.has(name) ? "255,205,160" : rand() < 0.15 ? "200,215,255" : "235,240,255",
    phase: rand() * Math.PI * 2,
    speed: 0.6 + rand() * 1.8,
    x: 0, y: 0, visible: false, alt: 0, az: 0,
  };
}

// Local sidereal time in degrees: which part of the sky is overhead at this moment and place
function siderealDegrees(ms: number) {
  const days = ms / 86400000 + 2440587.5 - 2451545; // days since 1 Jan 2000, noon
  const deg = 280.46061837 + 360.98564736629 * days + sky.lon;
  return ((deg % 360) + 360) % 360;
}

export default function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [picked, setPicked] = useState<Picked | null>(null);
  const pickedName = useRef<string | null>(null); // so the drawing loop can ring the picked star

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const monoFont = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono") || "monospace";

    // Build the star list: real named stars + faint filler stars spread over the whole sphere
    const rand = seeded(7);
    const named = STARS.map((s) => makeStar(s.ra, s.dec, s.mag, rand, s.name, s.con));
    const filler: SkyStar[] = [];
    for (let i = 0; i < 1100; i++) {
      const ra = rand() * 24;
      const dec = Math.asin(rand() * 2 - 1) / RAD; // even spread over a sphere
      const mag = 6.2 - 2.6 * rand() * rand(); // mostly faint
      filler.push(makeStar(ra, dec, mag, rand));
    }
    const byName = new Map(named.map((s) => [s.name!, s]));
    const lines = LINES.map(([a, b]) => [byName.get(a)!, byName.get(b)!] as const).filter(([a, b]) => a && b);

    const sinLat = Math.sin(sky.lat * RAD);
    const cosLat = Math.cos(sky.lat * RAD);
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    const mouse = { x: -9999, y: -9999 };
    let hovered: SkyStar | null = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Work out where every star is on screen right now
    function project() {
      const lst = siderealDegrees(Date.now());
      const cx = width / 2 - pointer.x * 12; // tiny shift with the mouse for depth
      const cy = height / 2 - pointer.y * 9;
      const R = Math.hypot(width, height) * 0.62; // distance from overhead to the horizon, in pixels
      for (const list of [named, filler]) {
        for (const s of list) {
          const ha = (lst - s.ra * 15) * RAD; // how far the star has turned past due south
          const sinDec = Math.sin(s.dec * RAD);
          const cosDec = Math.cos(s.dec * RAD);
          const sinAlt = sinDec * sinLat + cosDec * cosLat * Math.cos(ha);
          const alt = Math.asin(sinAlt); // height above the horizon
          s.visible = alt > 0;
          if (!s.visible) continue;
          const az = Math.atan2(-cosDec * Math.sin(ha), sinDec * cosLat - cosDec * sinLat * Math.cos(ha)); // compass direction
          // Lying on your back looking up: north at the top, east on the left
          const dist = R * Math.tan((Math.PI / 2 - alt) / 2);
          s.x = cx - dist * Math.sin(az);
          s.y = cy - dist * Math.cos(az);
          s.alt = alt / RAD;
          s.az = (az / RAD + 360) % 360;
        }
      }
    }

    function draw(now: number) {
      frame = 0;
      // About 30 frames a second is plenty for twinkling
      if (now - last < 33 && !reduceMotion) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = now;
      const t = now / 1000;
      project();
      ctx.clearRect(0, 0, width, height);

      // Find the named star under the mouse (if any)
      hovered = null;
      let best = 18; // pixels
      for (const s of named) {
        if (!s.visible) continue;
        const d = Math.hypot(s.x - mouse.x, s.y - mouse.y);
        if (d < best) {
          best = d;
          hovered = s;
        }
      }

      // The pointer turns into a hand over a star (but not over buttons, links or text)
      const wantPointer = hovered !== null && !overContent;
      if (wantPointer !== pointerOn) {
        pointerOn = wantPointer;
        document.documentElement.style.cursor = wantPointer ? "pointer" : "";
      }

      // The constellation to light up: the hovered star's, or else the picked star's
      const pickedStar = pickedName.current ? byName.get(pickedName.current) : undefined;
      const litCon = hovered?.con ?? pickedStar?.con ?? null;

      // Constellation lines: very faint, brighter for the lit constellation
      ctx.lineWidth = 0.7;
      for (const [a, b] of lines) {
        if (!a.visible || !b.visible) continue;
        const lit = litCon !== null && a.con === litCon;
        ctx.strokeStyle = lit ? "rgba(255,206,110,0.65)" : "rgba(255,220,160,0.1)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Stars
      for (const list of [filler, named]) {
        for (const s of list) {
          if (!s.visible || s.x < -10 || s.y < -10 || s.x > width + 10 || s.y > height + 10) continue;
          const twinkle = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(t * s.speed + s.phase);
          const a = s.alpha * twinkle;
          if (s.r < 0.9) {
            // tiny stars: a square is cheaper and looks the same
            ctx.fillStyle = `rgba(${s.color},${a})`;
            ctx.fillRect(s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
            continue;
          }
          // bright stars get a soft glow
          if (s.mag < 1.5) {
            const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
            glow.addColorStop(0, `rgba(${s.color},${a * 0.35})`);
            glow.addColorStop(1, `rgba(${s.color},0)`);
            ctx.fillStyle = glow;
            ctx.fillRect(s.x - s.r * 5, s.y - s.r * 5, s.r * 10, s.r * 10);
          }
          ctx.fillStyle = `rgba(${s.color},${a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation name, just above its visible stars (only when 2+ of them are up)
      if (litCon) {
        const members = named.filter((s) => s.visible && s.con === litCon);
        if (members.length >= 2) {
          const mx = members.reduce((sum, s) => sum + s.x, 0) / members.length;
          const my = Math.max(24, Math.min(...members.map((s) => s.y)) - 30);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(255,214,130,0.95)";
          ctx.font = `600 13px ${monoFont}`;
          ctx.fillText(litCon.toUpperCase().split("").join(" "), mx, my);
          if (CONSTELLATIONS[litCon]) {
            ctx.fillStyle = "rgba(200,190,170,0.8)";
            ctx.font = `10px ${monoFont}`;
            ctx.fillText(CONSTELLATIONS[litCon], mx, my + 16);
          }
        }
      }

      // Ring around the picked star (stays while its info card is open)
      if (pickedStar && pickedStar.visible && pickedStar !== hovered) {
        ctx.strokeStyle = "rgba(255,214,130,0.9)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(pickedStar.x, pickedStar.y, pickedStar.r + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Label for the hovered star
      if (hovered) {
        const s = hovered;
        ctx.strokeStyle = "rgba(255,206,110,0.85)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 7, 0, Math.PI * 2);
        ctx.stroke();
        // Text goes to the right of the star, or to the left when near the right edge
        const flip = s.x > width - 200;
        const tx = flip ? s.x - s.r - 14 : s.x + s.r + 14;
        ctx.textAlign = flip ? "right" : "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(245,239,228,0.95)";
        ctx.font = `500 11px ${monoFont}`;
        ctx.fillText(s.name!.toUpperCase(), tx, s.y - 7);
        ctx.fillStyle = "rgba(170,162,148,0.9)";
        ctx.font = `10px ${monoFont}`;
        ctx.fillText(`${s.con} · mag ${s.mag.toFixed(2)}`, tx, s.y + 8);
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }
    function start() {
      if (isDark() && !frame) frame = requestAnimationFrame(draw);
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      ctx.clearRect(0, 0, width, height);
    }

    // Is the mouse over something people click or read? Then stars don't react there.
    const CONTENT = "a, button, input, textarea, select, label, p, h1, h2, h3, li, blockquote, [role=dialog], [data-star-card]";
    let overContent = false;
    let pointerOn = false;

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      overContent = !!(e.target as Element | null)?.closest?.(CONTENT);
      if (reduceMotion) start(); // still update the hover label
    }

    // Click a star = open its info card. Click anywhere else = close it.
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest?.("[data-star-card]")) return; // clicks inside the card
      if (hovered && !target?.closest?.(CONTENT)) {
        const s = hovered;
        pickedName.current = s.name!;
        setPicked({ name: s.name!, con: s.con!, mag: s.mag, alt: s.alt, az: s.az, x: s.x, y: s.y });
      } else {
        pickedName.current = null;
        setPicked(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        pickedName.current = null;
        setPicked(null);
      }
    }
    function onResize() {
      resize();
      if (reduceMotion) start();
    }

    // Light mode has no stars; dark mode brings them back
    const themeWatcher = new MutationObserver(() => (isDark() ? start() : stop()));
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // With reduced motion, refresh once a minute so the sky still follows the real time
    const slowTimer = reduceMotion ? setInterval(start, 60000) : 0;

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.cursor = "";
      stop();
      themeWatcher.disconnect();
      clearInterval(slowTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="suck-fixed pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      {picked && (
        <StarCard
          star={picked}
          onClose={() => {
            pickedName.current = null;
            setPicked(null);
          }}
        />
      )}
    </>
  );
}

// The info card that opens next to a clicked star
function StarCard({ star, onClose }: { star: Picked; onClose: () => void }) {
  const W = 300; // card width in pixels
  // Place it beside the star, but keep it fully on screen
  const left = star.x + 24 + W > window.innerWidth - 16 ? star.x - 24 - W : star.x + 24;
  const top = Math.min(Math.max(star.y - 40, 80), window.innerHeight - 300);
  const fact =
    STAR_FACTS[star.name] ?? `One of the brighter stars in ${star.con}, ${brightnessWords(star.mag)} to the naked eye.`;

  return (
    <div
      data-star-card
      role="dialog"
      aria-label={`About the star ${star.name}`}
      className="star-card-in fixed z-40 rounded-2xl border border-line bg-[#16130d]/90 p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      style={{ left: Math.max(16, left), top, width: W }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-fg"
      >
        ✕
      </button>

      <p className="font-mono text-[10px] tracking-[0.2em] text-accent-2 uppercase">
        {star.con}
        {CONSTELLATIONS[star.con] && <span className="text-muted"> · {CONSTELLATIONS[star.con]}</span>}
      </p>
      <h3 className="mt-1 font-display text-2xl font-semibold">{star.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{fact}</p>

      {/* Two small facts side by side */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-line bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase">Brightness</p>
          <p className="mt-1 text-fg">mag {star.mag.toFixed(2)}</p>
          <p className="text-[11px] text-muted">{brightnessWords(star.mag)}</p>
        </div>
        <div className="rounded-xl border border-line bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase">Right now</p>
          <p className="mt-1 text-fg">{Math.round(star.alt)}° up</p>
          <p className="text-[11px] text-muted">toward the {compass(star.az)}</p>
        </div>
      </div>

      <a
        href={wikiLink(star.name)}
        target="_blank"
        rel="noreferrer"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm text-accent-2 transition hover:text-fg"
      >
        Read more on Wikipedia
        <span className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </div>
  );
}
