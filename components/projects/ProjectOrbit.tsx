"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/site";
import { scrollToY } from "@/lib/smoothScroll";
import { pageTop } from "@/lib/dom";
import { colorOf, getProjectTypes } from "./projectTypes";
import OrbitScreen from "./OrbitScreen";
import ProjectInfo from "./ProjectInfo";
import OrbitProgress from "./OrbitProgress";
import { TypeChips, TypeList } from "./TypeFilter";
import ProjectDetails from "./ProjectDetails";

/**
 * The project gallery, on every screen size.
 *
 * The view "pins" in place, and scrolling turns a spiral of glowing project screens
 * (OrbitScreen) around a beam of light, like satellites orbiting a core.
 *
 * BIG SCREENS (xl, 1280px and wider): three columns
 *  LEFT:   "Selected projects", and a list of project types (click one to jump to it).
 *  MIDDLE: the 3D orbit. Click the front screen to open its details; click any other
 *          screen to turn the orbit to it.
 *  RIGHT:  the current project: big number, type, name, what it does, result, stack, and
 *          buttons to open the details window (ProjectDetails) or go straight to GitHub.
 *
 * PHONES AND TABLETS: the same orbit, stacked
 *  TOP:    the orbit (with smaller screens).
 *  BOTTOM: the current project's number, type and name, its buttons, and a row of project
 *          types you can tap. Tap the front screen to open the details window.
 *
 * This file holds the scrolling and the layout. The pieces are in their own files:
 *   OrbitScreen    one glowing screen on the orbit
 *   ProjectInfo    the text and buttons about the project at the front
 *   TypeFilter     the list (big screens) or chips (phones) of project types
 *   OrbitProgress  "03 / 08" and the progress bar
 *   ProjectDetails the window that opens when you click a project
 *
 * Every project type has its own bold color (projectTypes.ts): the front screen's glow, the
 * light beam, the type label, the result and the progress bar all switch to it.
 *
 * HOW IT WORKS
 *  - The outer box is extra tall: one "step" of scrolling per project. Inside it, the stage
 *    sticks to the screen, so you stay in place while you scroll through that height.
 *  - How far you've scrolled becomes a number: 0 = first project, 1 = second, and so on.
 *    The orbit glides after that number (GLIDE), so it keeps moving a little after you stop
 *    scrolling, like it has weight. That's what makes it feel smooth.
 *  - The orbit's size changes with the screen: the CSS variables --r (the orbit's radius) and
 *    --sy (how much lower each screen sits) are set on the stage with Tailwind classes below.
 *  - It's all CSS 3D (no 3D library). Only "transform" changes while it moves, which is
 *    cheap for the browser.
 *
 * NUMBERS YOU CAN CHANGE
 */
const STEP_DEG = 58; // the angle between two screens on the orbit
const SCROLL_PER_PROJECT = 0.75; // how much scrolling moves to the next project (0.75 = 75% of the screen height)
const GLIDE = 0.08; // how quickly the orbit catches up with your scrolling (smaller = smoother and floatier)
// The orbit's size on phones / tablets / big screens: --r = radius, --sy = step down per screen
const ORBIT_SIZE = "[--r:300px] [--sy:96px] md:[--r:460px] md:[--sy:140px] xl:[--r:560px] xl:[--sy:165px]";

export default function ProjectOrbit({ projects }: { projects: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null); // the tall outer box
  const stageRef = useRef<HTMLDivElement>(null); // the part that stays on screen (holds --sy)
  const ringRef = useRef<HTMLDivElement>(null); // the spiral that turns
  const barRef = useRef<HTMLDivElement>(null); // the progress bar's fill
  const [active, setActive] = useState(0); // which project is at the front
  const [open, setOpen] = useState<number | null>(null); // which project's details window is open

  const count = projects.length;
  const types = getProjectTypes(projects);

  // Where the tall box starts on the page (see pageTop in lib/dom.ts)
  const boxTop = useCallback(() => pageTop(wrapRef.current), []);

  useEffect(() => {
    const stage = stageRef.current!;
    const ring = ringRef.current!;
    const bar = barRef.current!;
    const screens = Array.from(ring.children) as HTMLElement[];
    const shades = screens.map((s) => s.querySelector<HTMLElement>("[data-shade]")!);
    let frame = 0;
    let pos = -1; // where the orbit is right now (glides after "target")
    let stepY = 0; // --sy in pixels (it changes with the screen size)

    function measure() {
      stepY = parseFloat(getComputedStyle(stage).getPropertyValue("--sy")) || 0;
    }

    function update() {
      frame = 0;
      // How far through the projects we've scrolled: 0 ... count-1 (can be in between)
      const step = window.innerHeight * SCROLL_PER_PROJECT;
      const target = Math.min(count - 1, Math.max(0, (window.scrollY - boxTop()) / step));

      if (pos < 0) pos = target; // first time: start right there
      pos += (target - pos) * GLIDE;
      if (Math.abs(target - pos) < 0.0005) pos = target;

      // Turn the orbit, and lift it so the current screen stays in the middle
      ring.style.transform = `translateY(${-pos * stepY}px) rotateY(${-pos * STEP_DEG}deg)`;
      // Screens away from the front get darker (a solid dark cover, never see-through text)
      shades.forEach((shade, i) => {
        shade.style.opacity = String(Math.min(0.7, Math.abs(i - pos) * 0.55));
      });
      bar.style.transform = `scaleX(${(pos + 1) / count})`;
      setActive(Math.round(pos));

      if (pos !== target) request(); // keep gliding until it has caught up
    }

    function request() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function onResize() {
      measure();
      request();
    }
    measure();
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", onResize);
    };
  }, [count, boxTop]);

  // Scrolls to a project (used by the type lists and the side screens)
  function goTo(index: number) {
    scrollToY(boxTop() + index * window.innerHeight * SCROLL_PER_PROJECT);
  }

  // Clicking a screen: the front one opens its details, any other one turns the orbit to it
  function onScreenClick(index: number) {
    if (index === active) setOpen(index);
    else goTo(index);
  }

  // The same function every time (so the details window doesn't redo its setup on every redraw)
  const closeDetails = useCallback(() => setOpen(null), []);

  const project = projects[active];
  const color = colorOf(project, types);

  return (
    // The tall box. As wide as the whole screen, so the orbit has room to swing.
    <div
      ref={wrapRef}
      className="relative left-1/2 w-screen -translate-x-1/2"
      style={{ height: `${100 + (count - 1) * SCROLL_PER_PROJECT * 100}vh` }}
    >
      {/* The stage: stays on screen while you scroll through the tall box.
          (h-svh = the screen's height, also on phones whose address bar comes and goes) */}
      <div ref={stageRef} className={`sticky top-0 h-svh overflow-hidden ${ORBIT_SIZE}`}>
        <div className="page-width flex h-full flex-col pt-20 pb-20 xl:grid xl:grid-cols-[minmax(0,0.6fr)_minmax(0,1.5fr)_minmax(0,0.8fr)] xl:items-center xl:gap-6 xl:pt-16 xl:pb-0 2xl:gap-10">
          {/* (pb-20 on phones and tablets: room at the bottom for the round "back to top" button) */}
          {/* LEFT (big screens only): the list of project types */}
          <div className="relative z-10 hidden self-stretch py-10 xl:block" suppressHydrationWarning data-parallax="6">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.25em] text-fg uppercase">Selected projects</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {count} things I&apos;ve built. Scroll to orbit through them, click a screen to open it.
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-fg uppercase">Filter by type</p>
                <TypeList types={types} current={project.category} onPick={goTo} />
              </div>

              <OrbitProgress active={active} count={count} color={color} barRef={barRef} />
            </div>
          </div>

          {/* MIDDLE: the 3D orbit. "perspective" makes far things look smaller.
              On phones and tablets it takes all the height the text below doesn't need, and cuts
              off the screens further down the spiral so they don't show behind the text. */}
          <div className="relative min-h-0 flex-1 overflow-hidden [perspective:1100px] xl:h-full xl:overflow-visible xl:[perspective:1400px]" suppressHydrationWarning data-parallax="14">
            {/* Everything in here shares one 3D space, pushed back by the orbit's radius so the
                front screen ends up at its normal size */}
            <div className="absolute inset-0 [transform:translateZ(calc(-1*var(--r)))] [transform-style:preserve-3d]">
              {/* The core: a beam of light running top to bottom, glowing in the current type's color */}
              <div
                aria-hidden
                className="absolute top-0 left-1/2 h-full w-1.5 -translate-x-1/2 rounded-full transition-[background,box-shadow] duration-700"
                style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, boxShadow: `0 0 40px 6px ${color}55` }}
              />
              <OrbitLine scale={2} top="30%" />
              <OrbitLine scale={1.4} top="72%" />

              {/* The spiral of screens. Its transform is set while you scroll (see update above). */}
              <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d] will-change-transform">
                {projects.map((p, i) => (
                  <OrbitScreen
                    key={p.title}
                    project={p}
                    index={i}
                    color={colorOf(p, types)}
                    isActive={i === active}
                    onClick={() => onScreenClick(i)}
                    // Its place on the orbit: turn to its angle, move down the spiral, push out to the edge
                    style={{ transform: `rotateY(${i * STEP_DEG}deg) translateY(calc(${i} * var(--sy))) translateZ(var(--r))` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT on big screens, BOTTOM on phones and tablets: the current project */}
          <div className="relative z-10 shrink-0 pt-4 xl:pt-0" suppressHydrationWarning data-parallax="6">
            <ProjectInfo project={project} index={active} count={count} color={color} onOpen={() => setOpen(active)} />

            {/* Phones and tablets: a row of project types (swipe sideways to see them all; tap
                one to jump to it), then the progress bar.
                On short screens (under 700px tall) the description and this row are left out,
                so the orbit above still has room. */}
            <div className="mt-5 xl:hidden">
              <TypeChips types={types} current={project.category} onPick={goTo} />
              <div className="mt-4">
                <OrbitProgress active={active} count={count} color={color} barRef={null} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {open !== null && (
        <ProjectDetails
          project={projects[open]}
          index={open}
          count={count}
          color={colorOf(projects[open], types)}
          onClose={closeDetails}
        />
      )}
    </div>
  );
}

// A thin circle lying almost flat around the core, like an orbit drawn on a map.
// `scale` is its size compared to the orbit's radius (--r).
function OrbitLine({ scale, top }: { scale: number; top: string }) {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 rounded-full border border-white/15"
      style={{ top, width: `calc(${scale} * var(--r))`, height: `calc(${scale} * var(--r))`, transform: "translate(-50%, -50%) rotateX(80deg)" }}
    />
  );
}
