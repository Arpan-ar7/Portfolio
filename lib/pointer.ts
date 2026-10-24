// Tracks the mouse position for the gentle "the view follows your cursor" effect.
// `pointer.x` / `pointer.y` go from -1 (left/top) to 1 (right/bottom), smoothed.
// They are also written to CSS as --mx / --my so any element can use them
// (see .depth-1 / .depth-2 in globals.css).

export const pointer = { x: 0, y: 0 };

/** Start listening to the mouse. Returns a cleanup function. */
export function startPointer() {
  // Phones/tablets have no hovering mouse, so skip there
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};

  const target = { x: 0, y: 0 };
  let frame = 0;
  const root = document.documentElement.style;

  function loop() {
    // Move 8% of the way to the mouse each frame = smooth, floaty follow
    pointer.x += (target.x - pointer.x) * 0.08;
    pointer.y += (target.y - pointer.y) * 0.08;
    root.setProperty("--mx", pointer.x.toFixed(3));
    root.setProperty("--my", pointer.y.toFixed(3));
    // Keep going only until we've caught up with the mouse
    const settled = Math.abs(target.x - pointer.x) < 0.001 && Math.abs(target.y - pointer.y) < 0.001;
    frame = settled ? 0 : requestAnimationFrame(loop);
  }

  function onMove(e: MouseEvent) {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (!frame) frame = requestAnimationFrame(loop);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("mousemove", onMove);
  };
}
