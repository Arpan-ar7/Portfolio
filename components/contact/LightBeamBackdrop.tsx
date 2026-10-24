"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// The angle of the light beam (it rises from bottom-left to top-right)
const BEAM_DEG = -20;

/**
 * The background of the contact screen: a warm beam of light cutting across the dark,
 * a hand reaching up into it, Arpan on the right waving hi (the beam passes behind him),
 * film grain on top, and specks of dust drifting through it.
 * Dust is only bright when it floats inside the beam, like dust in sunlight.
 *
 * The hand is Adam's, from Michelangelo's "The Creation of Adam" (public domain),
 * cut out of the fresco and tinted gold (public/media/adam-hand.webp).
 *
 * Both images are small WebP files marked "priority", so they load with the page and are
 * ready the moment someone clicks "Let's talk" (no waiting on a blank light screen).
 *
 *  - The beam tilts a tiny bit with the mouse (uses --mx from lib/pointer.ts).
 *  - The dust stops animating when it's off screen, or for "reduce motion".
 */
export default function LightBeamBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {/* The beam: two soft layers (a wide haze and a brighter core), brightest toward the right */}
      <div
        className="beam-breathe absolute top-[55%] left-[-25%] h-[38%] w-[150%] -translate-y-1/2"
        style={{ rotate: `calc(${BEAM_DEG}deg + var(--mx, 0) * 3deg)` }}
      >
        <div className="absolute inset-0 blur-3xl [background:linear-gradient(to_right,transparent_10%,rgba(120,75,35,0.35)_40%,rgba(255,200,140,0.6)_72%,rgba(255,240,220,0.85)_100%)] [mask-image:radial-gradient(ellipse_65%_50%_at_75%_50%,black_25%,transparent_100%)]" />
        <div className="absolute inset-x-0 top-1/2 h-[38%] -translate-y-1/2 blur-xl [background:linear-gradient(to_right,transparent_25%,rgba(255,205,150,0.45)_55%,rgba(255,246,232,0.95)_100%)] [mask-image:radial-gradient(ellipse_60%_50%_at_80%_50%,black_30%,transparent_100%)]" />
      </div>

      {/* The hand: rises from the lower left so the fingertips reach into the beam.
          Tilted to match the beam, faded where the arm is cut off, and floating very slightly. */}
      <div className="hand-float absolute top-[92%] left-[6%] aspect-[540/210] w-[max(42%,20rem)] origin-left -translate-y-1/2 rotate-[-24deg] [mask-image:linear-gradient(to_right,transparent,black_35%)]">
        <Image
          src="/media/adam-hand.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 42vw, 20rem"
          className="object-contain"
        />
        {/* Extra light on the fingers, where the hand enters the beam (only drawn on the hand itself) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_50%,rgba(255,230,190,0.3))] mix-blend-screen [mask-image:url(/media/adam-hand.webp)] [mask-size:100%_100%]" />
      </div>

      {/* Arpan waving hi, standing on the right (hidden on phones, where there's no room).
          Warmed a little to match the golden light, with a soft warm rim, and his photo's
          cut-off bottom fades into the dark. Sways gently, like he's waving. */}
      <div className="absolute right-[3%] bottom-0 hidden h-[78%] md:block lg:right-[5%]">
        <div className="wave-sway h-full origin-bottom drop-shadow-[0_0_28px_rgba(255,200,140,0.28)]">
          <Image
            src="/me/arpan-wave.webp"
            alt=""
            width={900}
            height={1181}
            priority
            sizes="600px"
            className="h-full w-auto brightness-[0.85] saturate-[0.85] sepia-[0.15] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          />
        </div>
      </div>

      {/* Dust floating in the light */}
      <BeamDust />

      {/* Film grain over everything (see .film-grain in globals.css) */}
      <div className="film-grain absolute inset-0" />

      {/* Darken the edges a little so the eye stays in the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}

// Tiny glowing specks that drift slowly. Brightness depends on how close they are to the beam.
function BeamDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;

    type Speck = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
    let specks: Speck[] = [];

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 9000); // more dust on bigger screens
      specks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.3) * 0.25, // drift mostly to the right, slowly
        vy: (Math.random() - 0.5) * 0.15,
        r: 0.4 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
      }));
      draw(0);
    }

    // How strongly a point is lit by the beam (1 = in the middle of it, 0 = outside)
    const angle = (BEAM_DEG * Math.PI) / 180;
    const nx = -Math.sin(angle); // direction across the beam
    const ny = Math.cos(angle);
    function light(x: number, y: number) {
      const cx = width / 2;
      const cy = height * 0.55;
      const across = Math.abs((x - cx) * nx + (y - cy) * ny); // distance from the beam's center line
      const halfWidth = height * 0.16;
      const inBeam = Math.max(0, 1 - across / halfWidth);
      const towardSource = 0.35 + 0.65 * (x / width); // brighter toward the right, where the light comes from
      return inBeam * towardSource;
    }

    function draw(now: number) {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;
      for (const s of specks) {
        if (!reduceMotion) {
          s.x += s.vx;
          s.y += s.vy;
          // wrap around the edges
          if (s.x > width + 5) s.x = -5;
          if (s.x < -5) s.x = width + 5;
          if (s.y > height + 5) s.y = -5;
          if (s.y < -5) s.y = height + 5;
        }
        const lit = light(s.x, s.y);
        const flicker = 0.75 + 0.25 * Math.sin(t * 1.5 + s.phase);
        const a = (0.05 + lit * 0.9) * flicker; // faint in the dark, glowing in the light
        ctx.fillStyle = `rgba(255,232,200,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.7 + lit * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible && !reduceMotion) frame = requestAnimationFrame(draw);
    }

    // Only animate while it's on screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);

    build();
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
