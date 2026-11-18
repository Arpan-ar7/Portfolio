"use client";

import { useEffect, useState } from "react";
import LetsTalkButton from "@/components/ui/LetsTalkButton";

// Links in the header. Each "href" matches a section id on the page.
const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

/**
 * A minimal header that floats over the page — no bar, no line.
 * Left: logo + links. Right: Let's talk.
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
      {/* Full width: links on the left edge, Let's talk on the right edge.
          "page-width" (globals.css) gives it the same side gaps as every section below. */}
      <nav className="page-width flex items-center justify-between py-5">
        {/* Left: logo, then the section links (links hidden on phones to keep it clean) */}
        <div className="flex items-center gap-10">
          <a href="#top" className="font-display text-xl font-bold tracking-tight">
            AR<span className="text-accent">7</span>
          </a>
          {/* Link text size: text-base = 16px, and text-lg = 18px on very wide screens (3xl).
              For even bigger links, go one step up: text-lg and 3xl:text-xl. */}
          <ul className="hidden gap-8 text-base text-muted md:flex 3xl:gap-10 3xl:text-lg">
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

        {/* Right: Let's talk */}
        <LetsTalkButton variant="solid">Let&apos;s talk</LetsTalkButton>
      </nav>
    </header>
  );
}
