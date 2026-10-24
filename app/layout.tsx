import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import NeuralBackground from "@/components/NeuralBackground";
import Navbar from "@/components/Navbar";
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

// Runs before the page paints, so the saved theme shows up without a flash.
// Dark (space) is the default; it only switches to light if the visitor chose it before.
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        {/* Background: a faint, living neural network behind everything */}
        <NeuralBackground />
        <SmoothScroll />
        <Navbar />
        {/* "suck-page" = this gets pulled into the black hole when Let's talk is clicked */}
        <div className="suck-page">{children}</div>
        <BackToTop />
        {/* Full-screen "Let's talk" panel, hidden until a Let's talk button is clicked */}
        <ContactPanel />
      </body>
    </html>
  );
}
