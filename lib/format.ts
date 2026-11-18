// Small text helpers used in several places.

/** 1 → "01" */
export const twoDigits = (n: number) => String(n).padStart(2, "0");

/** "https://github.com/Arpan-ar7/repo" → "github.com/Arpan-ar7/repo" */
export const shortLink = (url: string) => url.replace(/^https?:\/\//, "");

/**
 * Turns a result like "0.89" or "81%" into a share from 0 to 1 (for a progress bar).
 * Gives null when the result isn't on a 0-to-1 (or 0-to-100%) scale, e.g. "4.8 / 5".
 */
export function shareOf(value: string) {
  const n = parseFloat(value);
  const share = value.trim().endsWith("%") ? n / 100 : n;
  return share > 0 && share <= 1 ? share : null;
}
