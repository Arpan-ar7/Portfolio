import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NightSky from "@/components/background/NightSky";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ContactPanel from "@/components/contact/ContactPanel";
import BackToTop from "@/components/layout/BackToTop";
import { profile, seo } from "@/data/site";
import PersonJsonLd from "@/components/seo/PersonJsonLd";

// Fonts: Geist for body text, Geist Mono for the small code-style labels and numbers,
// Space Grotesk for headings and your name.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

// What Google, LinkedIn, WhatsApp etc. read about the page. The text lives in data/seo.ts.
// (The preview picture is app/opengraph-image.tsx; Next.js adds it by itself.)
export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl), // so every link below becomes a full address
  title: seo.title,
  description: seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: seo.siteUrl }],
  creator: profile.name,
  keywords: [profile.name, ...seo.otherNames, "AI/ML engineer portfolio", "machine learning engineer portfolio", "software engineer portfolio"],
  // The one true address of this page (stops Google from splitting it across copies)
  alternates: { canonical: "/" },
  // Let search engines show the page and follow its links
  robots: { index: true, follow: true },
  // The card shown when the link is shared (LinkedIn, WhatsApp, Discord, X...)
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    firstName: "Arpan Kumar",
    lastName: "Panda",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Proves to Google Search Console that the site is yours (see googleVerification in data/seo.ts)
  verification: seo.googleVerification ? { google: seo.googleVerification } : undefined,
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
        {/* Invisible: tells Google who this site is about (see components/seo/PersonJsonLd.tsx) */}
        <PersonJsonLd />
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
