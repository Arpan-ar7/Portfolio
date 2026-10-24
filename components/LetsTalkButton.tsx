"use client";

/**
 * The "Let's talk" / "Let's connect" button.
 *  - Hover: it wobbles like jelly, and a small black hole opens up inside it.
 *  - Click: tells ContactPanel to open — the page gets sucked into a black hole
 *    at this button's position, and you land on the contact screen.
 */
export default function LetsTalkButton({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  function open(e: React.MouseEvent<HTMLButtonElement>) {
    // Send the button's center so the black hole starts right here
    const r = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent("open-contact", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
  }

  const look =
    variant === "solid"
      ? "bg-accent text-bg"
      : "border border-line text-fg"; // outline style used in the hero

  return (
    <button
      type="button"
      onClick={open}
      className={`wobble group relative isolate overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-transparent hover:text-white ${look}`}
    >
      {/* The black hole: hidden (scale 0) until hover, then grows to fill the button */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-black transition-transform duration-500 ease-out group-hover:scale-100"
      >
        {/* Spinning glowing ring (accretion disk) — see .bh-ring in globals.css */}
        <span className="bh-ring absolute inset-[18%] rounded-full" />
        {/* The dark core in the middle */}
        <span className="absolute inset-[38%] rounded-full bg-black shadow-[0_0_10px_3px_rgba(255,150,60,0.55)]" />
      </span>
      <span className="flex items-center gap-1.5">
        {children}
        <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
      </span>
    </button>
  );
}
