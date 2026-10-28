import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaOrcid,
  FaMedium,
} from "react-icons/fa6";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import {
  SiCodeforces,
  SiGit,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTensorflow,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import Particles from "../components/Particles";
import formalPicture from "../Assets/MY Formal Picture.jpeg";
import { profile, socials } from "../data";

const icons = [
  [FaGithub, "GitHub", socials.github],
  [FaLinkedinIn, "LinkedIn", socials.linkedin],
  [FaOrcid, "ORCID", socials.orcid],
  [FaMedium, "Medium", socials.medium],
];

const techLogos = [
  { Icon: SiCodeforces, label: "Codeforces", color: "text-blue-400/80" },
  { Icon: VscVscode, label: "Visual Studio Code", color: "text-sky-400/80" },
  { Icon: SiPython, label: "Python", color: "text-yellow-300/80" },
  { Icon: SiReact, label: "React", color: "text-cyan-300/80" },
  { Icon: SiGit, label: "Git", color: "text-orange-400/80" },
  { Icon: SiTensorflow, label: "TensorFlow", color: "text-orange-300/80" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "text-sky-300/80" },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8 },
});

// Typing animation
function useTyping(words) {
  const [w, setW] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!words?.length) return;

    const currentWord = words[w];

    const timer = setTimeout(
      () => {
        if (!del && n < currentWord.length) {
          setN((value) => value + 1);
        } else if (!del) {
          setDel(true);
        } else if (n > 0) {
          setN((value) => value - 1);
        } else {
          setDel(false);
          setW((value) => (value + 1) % words.length);
        }
      },
      !del && n === currentWord.length ? 1200 : del ? 40 : 70
    );

    return () => clearTimeout(timer);
  }, [n, del, w, words]);

  return words?.length ? words[w].slice(0, n) : "";
}

// Fixed scroll indicator
function ScrollIndicator() {
  const [atTop, setAtTop] = useState(true);
  const [atFinalSection, setAtFinalSection] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const checkPosition = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const sections = Array.from(
          document.querySelectorAll(
            "#home, #about, #skills, #research, #projects, #experience, #education, #contact"
          )
        );

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight =
          document.documentElement.scrollHeight;

        // Home is considered reached within 10px of the top.
        const isAtTop = scrollY <= 10;

        // Detect the bottom of the document.
        const isAtDocumentBottom =
          scrollY + viewportHeight >= documentHeight - 10;

        // Find the final portfolio section.
        const finalSection =
          document.querySelector("#contact") ||
          sections[sections.length - 1];

        let isAtFinalSection = false;

        if (finalSection) {
          const rect = finalSection.getBoundingClientRect();

          // Activate when the final section is reached.
          isAtFinalSection =
            rect.top < viewportHeight &&
            (rect.bottom <= viewportHeight + 20 ||
              isAtDocumentBottom);
        }

        setAtTop(isAtTop);
        setAtFinalSection(isAtFinalSection);

        ticking = false;
      });
    };

    checkPosition();

    window.addEventListener("scroll", checkPosition, {
      passive: true,
    });

    window.addEventListener("resize", checkPosition);
    window.addEventListener("load", checkPosition);

    const resizeObserver = new ResizeObserver(checkPosition);
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      window.removeEventListener("load", checkPosition);
      resizeObserver.disconnect();
    };
  }, []);

  // Scroll down through sections until Contact.
  // At Contact, scroll back to Home.
  const handleClick = () => {
    if (atFinalSection || !atTop) {
      // If at the final section, or returning from it,
      // scroll all the way back to Home.
      if (atFinalSection) {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else {
        // Before Contact, continue to the next section.
        const sectionIds = [
          "home",
          "about",
          "skills",
          "research",
          "projects",
          "experience",
          "education",
          "contact",
        ];

        const currentY = window.scrollY;

        const nextSection = sectionIds
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .find(
            (section) => section.offsetTop > currentY + 100
          );

        if (nextSection) {
          nextSection.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }

      return;
    }

    // At Home: go to the About section.
    const aboutSection = document.getElementById("about");

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  // Show UP only at the final section.
  // Otherwise, keep DOWN while travelling through the portfolio.
  const showUp = atFinalSection;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={
        showUp
          ? "Return to the top of the portfolio"
          : "Scroll down to the next section"
      }
      className="
        group fixed bottom-5 left-1/2 z-[100]
        flex -translate-x-1/2 flex-col items-center
        gap-2 rounded-xl px-4 py-2
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-cyan-400
        sm:bottom-6
      "
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? {} : { y: -2 }}
      whileTap={reduceMotion ? {} : { scale: 0.96 }}
    >
      {/* Mouse icon and label */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className="
            relative flex h-10 w-6 items-start
            justify-center rounded-full
            border-2 border-cyan-400/90
            shadow-[0_0_15px_rgba(34,211,238,0.2)]
            transition-shadow duration-300
            group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]
            sm:h-12 sm:w-7
          "
        >
          {/* Animated mouse wheel */}
          <motion.span
            className="
              mt-2 h-2 w-1 rounded-full
              bg-cyan-300
              shadow-[0_0_8px_rgba(103,232,249,0.9)]
            "
            animate={
              reduceMotion
                ? {}
                : {
                  y: showUp ? [7, 0, 7] : [0, 7, 0],
                  opacity: [1, 0.5, 1],
                }
            }
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>

        {/* Scroll label */}
        <span
          className="
            whitespace-nowrap text-[10px] font-semibold
            uppercase tracking-[0.25em] text-white/70
            transition-colors duration-300
            group-hover:text-white
            sm:text-xs sm:tracking-[0.35em]
          "
        >
          Scroll{" "}
          <span className="text-cyan-400">
            {showUp ? "Up" : "Down"}
          </span>
        </span>
      </div>

      {/* Directional arrows */}
      <div className="flex flex-col items-center -space-y-2">
        {[0, 1, 2].map((arrow) => (
          <motion.span
            key={`${showUp ? "up" : "down"}-${arrow}`}
            animate={
              reduceMotion
                ? { opacity: 0.7 }
                : {
                  y: showUp ? [-4, 0, -4] : [0, 5, 0],
                  opacity: [0.15, 0.95, 0.15],
                }
            }
            transition={{
              duration: 1.3,
              delay: arrow * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiChevronDown
              size={21}
              className={`
                transition-colors duration-300
                ${arrow === 0
                  ? "text-cyan-400"
                  : arrow === 1
                    ? "text-blue-500"
                    : "text-violet-500"
                }
                ${showUp ? "rotate-180" : ""}
              `}
            />
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
}

export default function Home({ menuOpen = false }) {
  const typed = useTyping(profile.roles);

  return (
    <section
      id="home"
      className="
        relative min-h-screen w-full
        overflow-hidden bg-black
      "
    >
      {/* Particle background */}
      <Particles />

      {/* Background glow effects */}
      <div
        className="
          pointer-events-none absolute -left-32 -top-32
          h-[50vw] max-h-[500px] w-[50vw] max-w-[500px]
          rounded-full grad opacity-20
          blur-[140px] animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute bottom-0 right-0
          h-[50vw] max-h-[500px] w-[50vw] max-w-[500px]
          rounded-full grad opacity-30
          blur-[140px] animate-pulse
        "
      />

      {/* Main hero layout */}
      <div
        className="
          relative z-10 mx-auto grid min-h-screen
          max-w-7xl grid-cols-1
          px-4 pb-28 pt-24
          lg:grid-cols-2 lg:py-0
        "
      >
        {/* Profile portrait and technology orbit */}
        <motion.div
          {...rise(0.7)}
          className="
            relative order-1 flex min-h-[19rem]
            items-center justify-center py-5
            sm:min-h-[25rem] lg:order-2 lg:min-h-screen
          "
        >
          <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-cyan-400/20 blur-[90px] sm:h-80 sm:w-80" />
          <div className="relative flex aspect-square w-[min(82vw,28rem)] items-center justify-center">
            <div className="absolute inset-[8%] rounded-full border border-cyan-300/20" />
            <div className="absolute inset-[2%] rounded-full border border-white/10" />
            <div className="absolute inset-[2%] rounded-full border border-cyan-300/10 [transform:rotateX(65deg)_rotate(-25deg)]" />

            <div className="relative z-10 aspect-square w-[65%] rounded-full bg-gradient-to-br from-cyan-300 via-emerald-400 to-violet-600 p-[3px] shadow-[0_0_60px_rgba(28,216,210,0.28)]">
              <img
                src={formalPicture}
                alt="Ahad Hosen Akash"
                className="h-full w-full rounded-full border-4 border-[#08090d] object-cover object-[center_18%]"
              />
            </div>

            {techLogos.map(({ Icon, label, color }, index) => {
              const positions = [
                "left-[13%] top-[12%]",
                "right-[10%] top-[18%]",
                "right-[2%] top-1/2 -translate-y-1/2",
                "bottom-[12%] right-[13%]",
                "bottom-[7%] left-[27%]",
                "bottom-[30%] left-[3%]",
                "left-[3%] top-[30%]",
              ];

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.35 }}
                  aria-label={label}
                  title={label}
                  className={`
                    absolute ${positions[index]}
                    z-20 grid h-10 w-10 place-items-center
                    text-3xl drop-shadow-[0_0_12px_currentColor]
                    sm:h-12 sm:w-12 sm:text-4xl ${color}
                  `}
                >
                  <Icon aria-hidden="true" />
                </motion.div>
              );
            })}

            <div className="absolute left-[74%] top-[69%] z-30 flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-300/40 bg-[#07130f]/90 px-4 py-2 text-sm font-medium text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.2)] backdrop-blur-md">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-emerald-950">
                <FiCheck aria-hidden="true" size={14} />
              </span>
              Available
            </div>
          </div>
        </motion.div>

        {/* Left column: introduction */}
        <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:text-left">
          <motion.p
            {...rise(0.3)}
            className="
              mb-3 min-h-[1.6em]
              text-2xl font-semibold
              sm:text-3xl lg:text-4xl
            "
          >
            {typed}
            <span
              className="
                ml-1 inline-block h-[1em] w-[2px]
                animate-pulse bg-white align-middle
              "
            />
          </motion.p>

          <motion.h1
            {...rise(0.5)}
            className="grad-text text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
            Hello, I&apos;m
            <br />
            <span className="text-5xl text-white sm:text-6xl lg:text-7xl">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.8)}
            className="
              mx-auto mt-6 max-w-2xl
              text-lg text-gray-300 md:text-xl
              lg:mx-0
            "
          >
            {profile.intro}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            {...rise(1.1)}
            className="
              mt-10 flex flex-wrap
              justify-center gap-5
              lg:justify-start
            "
          >
            <a
              href="#projects"
              className="
                grad rounded-full px-6 py-3
                text-lg font-medium shadow-lg
                transition-transform hover:scale-105
              "
            >
              View My Work
            </a>

            <a
              href="/Resume.pdf"
              download
              className="
                rounded-full bg-white px-6 py-3
                text-lg font-medium text-black
                transition-all hover:scale-105
                hover:bg-gray-200
              "
            >
              My Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...rise(1.4)}
            className="
              mt-10 flex justify-center
              gap-5 text-3xl
              lg:justify-start
            "
          >
            {icons.map(([Icon, label, href]) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300"
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  filter:
                    "drop-shadow(0 0 8px #1cd8d2) drop-shadow(0 0 18px #00bf8f)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Fixed scroll indicator */}
      {!menuOpen && <ScrollIndicator />}
    </section>
  );
}