import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// The home page is just the sections, top to bottom.
// To reorder or remove a section, change it here.
export default function Home() {
  return (
    // overflow-x-clip: keeps the spinning orbit rings from making phones scroll sideways
    <main className="overflow-x-clip">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
