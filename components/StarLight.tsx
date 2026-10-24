/**
 * The background behind the live stars: black, with soft warm light coming in from the side,
 * like light spilling in from somewhere just off-screen to the right.
 *
 *  - A wide, soft golden wash entering from the right edge and fading out across the page.
 *  - A much fainter wash from the left edge, so that side isn't completely flat.
 *  - It gently brightens and dims (see .star-breathe in globals.css).
 *
 * No visible light source, just the light itself. Pure CSS, fixed in place while you scroll.
 */
export default function StarLight() {
  return (
    <div aria-hidden className="suck-fixed pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Main light, coming in from the right side */}
      <div className="star-breathe absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_105%_40%,rgba(255,190,100,0.17),rgba(255,170,80,0.06)_45%,transparent_75%)]" />

      {/* A faint touch of light from the left side */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_-5%_70%,rgba(255,180,90,0.06),transparent_70%)]" />
    </div>
  );
}
