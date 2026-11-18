// Tracks the mouse, for the effects that gently follow your cursor.
// `pointer.x` / `pointer.y` go from -1 (left/top) to 1 (right/bottom), smoothed.
//
// Two kinds of elements follow it:
//
//  1. data-parallax="N"  → the element shifts up to N pixels toward the mouse
//     (a negative N shifts it the other way). Different N on different layers gives a
//     feeling of depth: e.g. the background moves the opposite way, the text a little,
//     the portrait a bit more. It uses the CSS "translate" property, so it doesn't fight
//     with any "transform" the element already has. (Don't put it on an element that uses
//     Tailwind's translate-* classes: those use the same property.)
//     ALWAYS add suppressHydrationWarning next to it, like this:
//       <div suppressHydrationWarning data-parallax="8">
//     If the mouse moves while the page is still loading, this file may already have moved
//     the element before React takes over, and without it React reports that as an error.
//
//  2. class "follows-pointer" → gets the CSS variables --mx / --my (the contact light beam
//     uses them to tilt).
//
// Why not write the mouse position on the whole page (<html>)? Changing a CSS variable there
// makes the browser re-check the style of every element on every frame, which made the
// background flicker. Writing on just these few elements is cheap.

export const pointer = { x: 0, y: 0 };

/** Start listening to the mouse. Returns a cleanup function. */
export function startPointer() {
  // Phones/tablets have no hovering mouse, and some people turn off motion: skip both
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const target = { x: 0, y: 0 };
  let frame = 0;

  function loop() {
    // Move 6% of the way to the mouse each frame = smooth, floaty follow
    pointer.x += (target.x - pointer.x) * 0.06;
    pointer.y += (target.y - pointer.y) * 0.06;

    for (const el of document.querySelectorAll<HTMLElement>("[data-parallax]")) {
      const n = Number(el.dataset.parallax) || 0;
      el.style.translate = `${(pointer.x * n).toFixed(2)}px ${(pointer.y * n * 0.6).toFixed(2)}px`;
    }
    for (const el of document.querySelectorAll<HTMLElement>(".follows-pointer")) {
      el.style.setProperty("--mx", pointer.x.toFixed(3));
      el.style.setProperty("--my", pointer.y.toFixed(3));
    }

    // Keep going only until we've caught up with the mouse
    const settled = Math.abs(target.x - pointer.x) < 0.001 && Math.abs(target.y - pointer.y) < 0.001;
    frame = settled ? 0 : requestAnimationFrame(loop);
  }

  function onMove(e: MouseEvent) {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (!frame) frame = requestAnimationFrame(loop);
  }

  // When the mouse leaves the window, everything drifts back to the middle
  function onLeave() {
    target.x = 0;
    target.y = 0;
    if (!frame) frame = requestAnimationFrame(loop);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("mousemove", onMove);
    document.documentElement.removeEventListener("mouseleave", onLeave);
  };
}
