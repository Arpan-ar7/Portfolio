import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NightSky from "@/components/background/NightSky";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ContactPanel from "@/components/contact/ContactPanel";
import BackToTop from "@/components/layout/BackToTop";
import { profile } from "@/data/site";

// Fonts: Geist for body text, Geist Mono for the small code-style labels and numbers,
// Space Grotesk for headings and your name.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions like Grammarly add their own attributes to
          <body> before React loads. Without this, that shows up as a (harmless) error. */}
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        {/* Background: near-black with soft blue light from the side */}
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
