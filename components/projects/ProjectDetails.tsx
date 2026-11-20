"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project, ProjectImage } from "@/data/site";
import { lockScroll } from "@/lib/smoothScroll";
import { shareOf, shortLink, twoDigits } from "@/lib/format";
import { GitHubIcon } from "@/components/ui/icons";
import TeammateLink from "@/components/ui/TeammateLink";

/**
 * The window that opens when you click a project: everything about it, its photos, and a big
 * button to its GitHub repo. A solid panel over a darkened page (no blur / glass).
 * `color` is the project type's bold color (see projectTypes.ts).
 *
 * Close it with the ✕ button, the Escape key, or by clicking the dark area around it.
 * Click a photo to open it full size in a new tab.
 */
export default function ProjectDetails({
  project,
  index,
  count,
  color,
  onClose,
}: {
  project: Project;
  index: number;
  count: number;
  color: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll(true); // the page behind stays still while the window is open
    const opener = document.activeElement as HTMLElement | null; // to give focus back on close
    closeRef.current?.focus(); // keyboard users start on the close button
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const share = project.metric ? shareOf(project.metric.value) : null;
  const images = project.images ?? [];
  const wide = images.filter((img) => img.width >= img.height);
  const tall = images.filter((img) => img.width < img.height);

  // Drawn straight into <body>, so nothing on the page (like the 3D orbit) can get in its way
  return createPortal(
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-3 sm:p-8"
      onClick={onClose} // clicking the dark area closes it...
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()} // ...but clicking inside the window doesn't
        data-lenis-prevent // lets the window scroll on its own when it's taller than the screen
        className="panel-in relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border-2 bg-[#0b111b]"
        style={{ borderColor: color, boxShadow: `0 0 90px -30px ${color}` }}
      >
        {/* Top row: number, type, status, close button. It stays at the top while the window scrolls. */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-[#0b111b] px-5 py-3.5 sm:px-8">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            <span className="text-muted">
              <span style={{ color }}>{twoDigits(index + 1)}</span> / {twoDigits(count)}
            </span>
            <span style={{ color }}>{project.category}</span>
            {project.status && (
              <span className="flex items-center gap-2 tracking-[0.15em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {project.status}
              </span>
            )}
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors hover:border-fg"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          {/* The name, with the project's logo in front of it if it has one */}
          <h3 className="flex items-center gap-4 font-display text-2xl leading-tight font-bold tracking-tight sm:text-4xl">
            {project.logo && (
              <Image src={project.logo.src} alt={project.logo.alt} width={56} height={56} className="h-12 w-12 shrink-0 rounded-xl sm:h-14 sm:w-14" />
            )}
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted sm:text-lg">{project.description}</p>
          {/* Who it was built with, if anyone (links to their portfolio) */}
          <TeammateLink name={project.teammate} color={color} className="mt-4" />

          {/* Photos. Wide ones (like screenshots of a website) are big, one under the other.
              Tall ones (like phone screenshots) sit side by side, three in a row. */}
          {wide.length > 0 && (
            <div className="mt-7 space-y-6">
              {wide.map((img) => (
                <Photo key={img.src} img={img} sizes="(min-width: 896px) 830px, 94vw" />
              ))}
            </div>
          )}
          {tall.length > 0 && (
            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-5">
              {tall.map((img) => (
                <Photo key={img.src} img={img} sizes="(min-width: 896px) 270px, 30vw" />
              ))}
            </div>
          )}

          {/* How it works */}
          {project.highlights && (
            <div className="mt-8">
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color }}>
                How it works
              </p>
              <ul className="mt-3 space-y-2.5 leading-relaxed text-fg/90">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* The result, with a bar when it's a 0-1 score */}
          {project.metric && (
            <div className="mt-8 rounded-xl border border-line bg-card-2 p-5">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{project.metric.label}</p>
                <p className="font-mono text-3xl leading-none font-bold tabular-nums sm:text-4xl" style={{ color }}>
                  {project.metric.value}
                </p>
              </div>
              {share !== null && (
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full" style={{ width: `${share * 100}%`, background: color }} />
                </div>
              )}
            </div>
          )}

          {/* The stack */}
          <div className="mt-8">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color }}>
              Built with
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-md border border-line bg-card-2 px-2.5 py-1 font-mono text-[13px] text-fg/85">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons: GitHub (the main one) and a live demo if there is one */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="wobble inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold text-bg transition-[filter] hover:brightness-110"
                style={{ background: color }}
              >
                <GitHubIcon /> View on GitHub <span aria-hidden>↗</span>
              </a>
            ) : (
              <p className="font-mono text-xs text-muted">Code coming soon.</p>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="wobble inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-bold transition-colors hover:bg-fg hover:text-bg"
                style={{ borderColor: color, color }}
              >
                Live demo <span aria-hidden>↗</span>
              </a>
            )}
            {project.link && <span className="ml-auto hidden font-mono text-[11px] text-muted md:block">{shortLink(project.link)}</span>}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/** One photo with its caption. Click it to open it full size in a new tab. */
function Photo({ img, sizes }: { img: ProjectImage; sizes: string }) {
  return (
    <figure>
      <a
        href={img.src}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-xl border border-line transition-colors hover:border-fg/60"
        aria-label={`Open full size: ${img.alt}`}
      >
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className="h-auto w-full" />
      </a>
      {img.caption && <figcaption className="mt-2 font-mono text-[11px] text-muted">{img.caption}</figcaption>}
    </figure>
  );
}
