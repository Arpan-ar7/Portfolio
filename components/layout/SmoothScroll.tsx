"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/smoothScroll";
import { startPointer } from "@/lib/pointer";

// Turns on the site-wide "feel" effects:
//  - smooth, floaty scrolling
//  - the view gently following your mouse
// Both are skipped for people who turned on "reduce motion" in their system settings.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stopScroll = startSmoothScroll();
    const stopPointer = startPointer();
    return () => {
      stopScroll();
      stopPointer();
    };
  }, []);
  return null;
}
