"use client";

import { useSyncExternalStore } from "react";

// Watches the "dark" class on <html> so any component can react to theme changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/** Returns true when dark (space) mode is on. */
export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true // on the server we assume dark, the default
  );
}
