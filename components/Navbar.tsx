"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LetsTalkButton from "./LetsTalkButton";

// Links in the header. Each "href" matches a section id on the page.
const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

/**
 * A minimal header that floats over the page — no bar, no line.
 * Left: logo + links. Right: theme switch + Let's talk.
 * It slides away when you scroll down (so it never covers content)
 * and comes back as soon as you scroll up.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // hide when going down past the top area, show when going up
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`suck-fixed fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Full width: links on the left edge, Let's talk + theme switch on the right edge */}
      <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
        {/* Left: logo, then the section links (links hidden on phones to keep it clean) */}
        <div className="flex items-center gap-10">
          <a href="#top" className="font-display text-xl font-bold tracking-tight">
            AR<span className="text-accent">7</span>
          </a>
          <ul className="hidden gap-8 text-sm text-muted md:flex">
            {links.map((link) => (
              <li key={link.href}>
                {/* The line under each link grows from the left on hover */}
                <a
                  href={link.href}
                  className="relative py-1 transition hover:text-fg after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the theme switch, then Let's talk at the far right */}
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <LetsTalkButton variant="solid">Let&apos;s talk</LetsTalkButton>
        </div>
      </nav>
    </header>
  );
}
