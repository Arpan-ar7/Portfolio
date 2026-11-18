// Small helpers for reading the page, shared by the scroll-driven effects.

/**
 * How far an element's top is from the top of the PAGE, in pixels.
 *
 * We add up the layout positions instead of using getBoundingClientRect(), because that
 * includes any CSS transform: while the "Let's talk" transition shrinks and spins the page,
 * or while ScrollRise tilts its panel, it would give a wrong answer.
 */
export function pageTop(el: HTMLElement | null) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
}

/**
 * True while the "Let's talk" contact screen is opening, open or closing.
 * (ContactPanel puts these classes on <html>.) Effects behind it pause or ignore the mouse then.
 */
export function isContactOpen() {
  const cl = document.documentElement.classList;
  return cl.contains("is-sucking") || cl.contains("is-unsucking");
}
