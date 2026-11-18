"use client";

/**
 * The "Let's talk" / "Let's connect" button.
 *  - Hover: it wobbles like jelly, and a streak of light sweeps across it.
 *  - Click: tells ContactPanel to open — the page gets pulled into a burst of light
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
    // Send the button's center so the burst of light starts right here
    const r = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent("open-contact", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
  }

  const look =
    variant === "solid"
      ? "bg-accent text-bg"
      : "border border-line bg-card text-fg hover:border-accent/70"; // outline style used in the hero: a solid dark button with a thin line around it

  return (
    <button
      type="button"
      onClick={open}
      className={`wobble group relative isolate overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-[box-shadow,border-color] duration-300 hover:shadow-[0_0_24px_rgba(91,155,255,0.45)] ${look}`}
    >
      {/* A streak of light that sweeps across on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100"
      />
      <span className="flex items-center gap-1.5">
        {children}
        <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
      </span>
    </button>
  );
}
