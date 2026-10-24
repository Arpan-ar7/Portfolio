"use client";

/**
 * The "Let's talk" / "Let's connect" button.
 *  - Hover: it wobbles like jelly, and a streak of warm light sweeps across it.
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
      : "border border-line text-fg dark:bg-black/55 dark:backdrop-blur-md"; // outline style used in the hero (dark glass so it reads over the Earth picture)

  return (
    <button
      type="button"
      onClick={open}
      className={`wobble group relative isolate overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(255,200,130,0.35)] ${look}`}
    >
      {/* A streak of warm light that sweeps across on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(255,226,180,0.55)] to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100"
      />
      <span className="flex items-center gap-1.5">
        {children}
        <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
      </span>
    </button>
  );
}
