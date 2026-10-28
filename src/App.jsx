import { useEffect, useState } from "react";

import Intro from "./components/Intro";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";

import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Research from "./sections/Research";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem("portfolio-intro-seen") !== "true";
    } catch {
      return true;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!showIntro) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  const finishIntro = () => {
    try {
      sessionStorage.setItem("portfolio-intro-seen", "true");
    } catch {
      // Continue normally if session storage is unavailable.
    }

    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen">
      <Cursor />

      <Navbar open={menuOpen} onOpenChange={setMenuOpen} />

      {showIntro && <Intro onFinish={finishIntro} />}

      <main>
        <Home menuOpen={menuOpen} />
        <About />
        <Skills />
        <Research />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}