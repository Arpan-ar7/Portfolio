import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, seo } from "@/data/site";

/**
 * The picture shown when your link is shared (LinkedIn, WhatsApp, Discord, X, Slack...).
 * Next.js draws it once when the site is built and adds it to the page by itself.
 *
 * Layout (1200 x 630, the standard size): the site's near-black background, your role, name,
 * a short line and your site address on the left; your photo (background removed) on the right
 * with a soft blue light behind it.
 */
export const alt = `${profile.name} — ${profile.role} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Your photo with the background removed (the same one used for the dotted portrait)
const photo = await readFile(join(process.cwd(), "public/me/arpan-cutout.png"), "base64");

export default function Image() {
  const address = seo.siteUrl.replace("https://", "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#07090d",
          color: "#eef2f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* The soft blue light behind the photo */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 40,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(91,155,255,0.45) 0%, rgba(91,155,255,0) 65%)",
          }}
        />

        {/* LEFT: role, name, short line, site address */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, letterSpacing: 6, color: "#5b9bff" }}>
            <div style={{ width: 56, height: 3, background: "#5b9bff", marginRight: 20 }} />
            AI/ML · SOFTWARE ENGINEER
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, marginTop: 28, letterSpacing: -2 }}>
            <span>Arpan Kumar</span>
            <span style={{ color: "#5b9bff" }}>Panda</span>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#9aa3b2", marginTop: 30, maxWidth: 600 }}>
            Machine learning, RAG and multi-agent AI, and a live Android app.
          </div>
          <div style={{ display: "flex", marginTop: 40 }}>
            <div style={{ fontSize: 26, color: "#07090d", background: "#5b9bff", borderRadius: 999, padding: "12px 28px" }}>{address}</div>
          </div>
        </div>

        {/* RIGHT: your photo, standing on the bottom edge */}
        {/* eslint-disable-next-line @next/next/no-img-element -- this is an image generator, not a page */}
        <img
          src={`data:image/png;base64,${photo}`}
          width={560}
          height={560}
          alt=""
          style={{ position: "absolute", right: 30, bottom: 0 }}
        />
      </div>
    ),
    { ...size }
  );
}
