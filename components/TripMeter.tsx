"use client";

import { useEffect, useState } from "react";

const MOON_KM = 384400; // average distance from the Earth to the Moon

/**
 * "You just travelled 384,400 km, from Earth to the Moon."
 * The number counts up as you scroll down the page, like a trip meter:
 * 0 km at the top (on Earth), 384,400 km at the very bottom (on the Moon).
 */
export default function TripMeter() {
  const [km, setKm] = useState(0);

  useEffect(() => {
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
      setKm(Math.round(MOON_KM * progress));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p className="font-mono text-xs tracking-[0.15em] text-white/60 uppercase sm:text-sm">
      You just travelled{" "}
      {/* fixed-width digits so the line doesn't jiggle while it counts */}
      <span className="font-semibold text-accent tabular-nums">{km.toLocaleString("en-US")} km</span>
      , from Earth to the Moon. Thanks for the ride.
    </p>
  );
}
