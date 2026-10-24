"use client";

import { useState } from "react";

/**
 * The "Gmail me" button.
 *  - Clicking it opens a new email to you in Gmail (in a new tab), instead of a "mailto:"
 *    link that opens whatever mail app the visitor's computer uses (often Outlook).
 *  - Hovering (or tabbing to it with the keyboard) shows a small menu:
 *      Open in Gmail · Copy email
 *    "Copy email" copies the address and briefly shows "Copied!".
 */
export default function EmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers: copy using a hidden text box
      const box = document.createElement("textarea");
      box.value = email;
      document.body.appendChild(box);
      box.select();
      document.execCommand("copy");
      box.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const item =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <span className="group/email relative inline-block">
      {/* The main button: opens Gmail */}
      <a
        href={gmail}
        target="_blank"
        rel="noreferrer"
        className="wobble group inline-flex items-center gap-2.5 rounded-full bg-[#ffe2b8] px-5 py-3 text-sm font-medium text-black shadow-[0_0_30px_rgba(255,210,150,0.25)] transition-colors hover:bg-white"
      >
        <MailIcon />
        Gmail me
        <span className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>

      {/* The menu. The pt-2 gap is part of the hover area, so moving the mouse down to it doesn't close it. */}
      <span className="pointer-events-none invisible absolute top-full left-0 z-20 pt-2 opacity-0 transition-all duration-200 group-focus-within/email:pointer-events-auto group-focus-within/email:visible group-focus-within/email:opacity-100 group-hover/email:pointer-events-auto group-hover/email:visible group-hover/email:opacity-100">
        <span className="block w-60 translate-y-1 rounded-2xl border border-white/10 bg-[#16130d]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-200 group-hover/email:translate-y-0">
          <span className="block px-3 pt-2 pb-1.5 font-mono text-[11px] text-white/50">{email}</span>
          <a href={gmail} target="_blank" rel="noreferrer" className={item}>
            <GmailIcon /> Open in Gmail
          </a>
          <button type="button" onClick={copy} className={item}>
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? <span className="text-emerald-300">Copied!</span> : "Copy email"}
          </button>
        </span>
      </span>
    </span>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

// A simple "M" envelope in Gmail's colours
function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
      <path d="M3 7v11a1 1 0 0 0 1 1h3V10l5 3.8L17 10v9h3a1 1 0 0 0 1-1V7l-2-1.4L12 11 5 5.6Z" fill="#ea4335" />
      <path d="M3 7v11a1 1 0 0 0 1 1h3V10Z" fill="#4285f4" />
      <path d="M21 7v11a1 1 0 0 1-1 1h-3V10Z" fill="#34a853" />
      <path d="M17 10V5.8l2-1.4A1.3 1.3 0 0 1 21 5.5V7Z" fill="#fbbc04" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
