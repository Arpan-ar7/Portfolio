import StarField from "./StarField";

/**
 * The background of the whole site: a near-black night sky with small stars that slowly
 * drift and twinkle (StarField), and a soft blue light coming in from the right side that
 * gently brightens and dims (.breathe in globals.css).
 *
 * It's fixed in place while you scroll, so every section sits on the same sky.
 * The light shifts a little the opposite way to the mouse, the stars a little less
 * (data-parallax, see lib/pointer.ts), which gives a feeling of depth.
 */
export default function NightSky() {
  return (
    <div aria-hidden className="suck-fixed pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#05070b]">
      {/* Soft blue light from the right side */}
      <div className="absolute -inset-10" suppressHydrationWarning data-parallax="-20">
        <div className="breathe absolute inset-0 bg-[radial-gradient(ellipse_45%_70%_at_100%_40%,rgba(90,150,255,0.13),rgba(70,120,255,0.04)_45%,transparent_75%)]" />
      </div>

      {/* The stars */}
      <StarField />
    </div>
  );
}
