import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

const items = [
  { name: "Home", id: "home", number: "01" },
  { name: "About", id: "about", number: "02" },
  { name: "Skills", id: "skills", number: "03" },
  { name: "Research", id: "research", number: "04" },
  { name: "Projects", id: "projects", number: "05" },
  { name: "Experience", id: "experience", number: "06" },
  { name: "Education", id: "education", number: "07" },
  { name: "Contact", id: "contact", number: "08" },
];

export default function Navbar({ open, onOpenChange }) {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const lastScroll = useRef(0);
  const menuButton = useRef(null);
  const closeButton = useRef(null);

  const reduceMotion = useReducedMotion();

  // Scroll-aware navbar and active section detection
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScroll.current;

        setScrolled(y > 20);

        // Keep the navbar visible near the top.
        if (y < 100 || delta < -8) {
          setShow(true);
        } else if (delta > 8 && !open) {
          setShow(false);
        }

        lastScroll.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  // Detect the section currently visible on screen
  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Lock background scrolling and support Escape
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButton.current?.focus();
    };
  }, [open, onOpenChange]);

  const openMenu = () => {
    setShow(true);
    onOpenChange(true);
  };

  const closeMenu = () => onOpenChange(false);

  const reveal = reduceMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
    : {
      initial: {
        clipPath: "circle(0% at 95% 5%)",
      },
      animate: {
        clipPath: "circle(150% at 95% 5%)",
      },
      exit: {
        clipPath: "circle(0% at 95% 5%)",
      },
    };

  return (
    <>
      {/* Navigation bar */}
      <motion.nav
        initial={false}
        animate={{
          y: show ? 0 : "-110%",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed inset-x-0 top-0 z-50
          flex items-center justify-between
          px-5 py-4 sm:px-8 lg:px-12
          transition-colors duration-300
          ${scrolled
            ? "border-b border-white/10 bg-black/70 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
          }
        `}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={() => setActive("home")}
          className="group flex items-center gap-3"
        >
          <motion.span
            whileHover={reduceMotion ? undefined : { rotate: 12, scale: 1.08 }}
            className="
              grid h-10 w-10 place-items-center
              rounded-full grad text-sm font-bold text-white
              shadow-lg
            "
          >
            A
          </motion.span>

          <span className="text-xl font-bold tracking-tight text-white">
            Ahad
            <span className="text-cyan-400">.</span>
          </span>
        </a>

        {/* Center menu button */}
        <button
          ref={menuButton}
          type="button"
          onClick={() => (open ? closeMenu() : openMenu())}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="portfolio-menu"
          className="
            relative grid h-12 w-12 place-items-center
            rounded-full border border-white/15
            bg-white/5 text-2xl text-white
            transition-colors hover:bg-white/10
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-cyan-400
            lg:absolute lg:left-1/2 lg:-translate-x-1/2
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <FiX /> : <FiMenu />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Contact CTA */}
        <a
          href="#contact"
          className="
            hidden items-center gap-2 rounded-full
            grad px-5 py-3 text-sm font-semibold text-white
            shadow-lg transition-transform
            hover:scale-105 lg:flex
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-cyan-400
          "
        >
          Let's Talk
          <FiArrowUpRight />
        </a>
      </motion.nav>

      {/* Full-screen animated menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              fixed inset-0 z-[60]
              overflow-y-auto bg-[#08090d] text-white
            "
          >
            {/* Decorative background */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -right-32 top-1/4
                h-96 w-96 rounded-full
                bg-violet-600/20 blur-[120px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -left-32 bottom-0
                h-80 w-80 rounded-full
                bg-cyan-500/10 blur-[100px]
              "
            />

            {/* Menu header */}
            <div className="relative flex items-center justify-between px-6 py-6 sm:px-10">
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
                Navigation
              </span>

              <button
                ref={closeButton}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="
                  grid h-12 w-12 place-items-center
                  rounded-full border border-white/15
                  text-2xl transition-colors hover:bg-white/10
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-cyan-400
                "
              >
                <FiX />
              </button>
            </div>

            {/* Navigation links */}
            <div
              id="portfolio-menu"
              className="
                relative mx-auto flex min-h-[75vh]
                max-w-5xl flex-col justify-center
                px-6 py-10 sm:px-12
              "
            >
              <p className="mb-8 text-xs uppercase tracking-[0.35em] text-cyan-400">
                Explore my portfolio
              </p>

              <ul className="space-y-2">
                {items.map((item, index) => {
                  const isActive = active === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -30 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : 0.12 + index * 0.07,
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={`
                          group flex items-center gap-5
                          border-b border-white/10
                          py-3 sm:py-4
                          ${isActive
                            ? "text-cyan-400"
                            : "text-white/75 hover:text-white"
                          }
                        `}
                      >
                        <span className="w-7 text-xs text-white/35">
                          {item.number}
                        </span>

                        <span
                          className="
                            flex-1 text-2xl font-semibold
                            tracking-tight transition-transform
                            duration-300 group-hover:translate-x-2
                            sm:text-3xl md:text-4xl
                          "
                        >
                          {item.name}
                        </span>

                        <motion.span
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -8,
                          }}
                          className="text-xl text-cyan-400"
                        >
                          <FiArrowUpRight />
                        </motion.span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/45">
                <span>Building ideas into reality.</span>
                <span>Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}