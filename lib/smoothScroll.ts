import Lenis from "lenis";

// One shared smooth-scroll instance for the whole site.
// Other components use these helpers instead of talking to Lenis directly.
let lenis: Lenis | null = null;

/** Turn on smooth scrolling (called once by <SmoothScroll />). Returns a cleanup function. */
export function startSmoothScroll() {
  lenis = new Lenis({
    autoRaf: true, // Lenis runs its own animation loop
    anchors: true, // links like href="#projects" glide smoothly too
    lerp: 0.09, // lower = smoother / floatier
  });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Smoothly scroll to the top of the page. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Freeze / unfreeze page scrolling (used while the contact panel is open). */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
