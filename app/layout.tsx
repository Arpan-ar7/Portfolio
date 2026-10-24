import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NightSky from "@/components/NightSky";
import StarLight from "@/components/StarLight";
import SmoothScroll from "@/components/SmoothScroll";
import ContactPanel from "@/components/contact/ContactPanel";
import BackToTop from "@/components/BackToTop";
import { profile } from "@/data/site";

// Fonts: Geist for body text, Geist Mono for small "space console" labels,
// Space Grotesk for headings, Instrument Serif for the big elegant name in the hero.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        {/* Background: black with soft warm light from the side, with the real night sky (live) on top */}
        <StarLight />
        <NightSky />
        <SmoothScroll />
        <Navbar />
        {/* "suck-page" = this gets pulled into the button when Let's talk is clicked */}
        <div className="suck-page">{children}</div>
        <BackToTop />
        {/* Full-screen "Let's talk" panel, hidden until a Let's talk button is clicked */}
        <ContactPanel />
      </body>
    </html>
  );
}
