import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const hellos = [
  "Hello",
  "হ্যালো",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "Ciao",
  "Olá",
  "Здравствуйте",
  "Merhaba",
  "Γειά",
  "Hej",
  "Assalamu Alaikum",
];

export default function Intro({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const timer = setTimeout(() => {
        setLeaving(true);
      }, 500);

      return () => clearTimeout(timer);
    }

    if (index < hellos.length - 1) {
      const timer = setTimeout(() => {
        setIndex((current) => current + 1);
      }, 250);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLeaving(true);
    }, 650);

    return () => clearTimeout(timer);
  }, [index, reduceMotion]);

  const progress = ((index + 1) / hellos.length) * 100;

  return (
    <motion.div
      aria-hidden="true"
      className="
        pointer-events-none fixed inset-0 z-[9998]
        overflow-hidden bg-[#07080d] text-white
      "
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (leaving) onFinish?.();
      }}
    >
      {/* Background gradient */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,_rgba(45,35,80,0.32)_0%,_rgba(7,8,13,1)_72%)]
        "
      />

      {/* Animated violet glow */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.28, 0.15],
            }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute left-1/2 top-1/2
          h-64 w-64 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-violet-500/20 blur-[100px]
          sm:h-80 sm:w-80 md:h-96 md:w-96
        "
      />

      {/* Cyan ambient glow */}
      <div
        className="
          absolute bottom-1/4 right-1/4
          h-40 w-40 rounded-full
          bg-cyan-500/10 blur-[90px]
        "
      />

      {/* Brand */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
        }}
        className="
          absolute left-6 top-6 z-20
          flex items-center gap-3
          sm:left-10 sm:top-8
        "
      >
        <div
          className="
            grid h-11 w-11 place-items-center
            rounded-full border border-white/15
            bg-white/5 text-xl font-bold
            shadow-[0_0_25px_rgba(34,211,238,0.08)]
          "
        >
          A<span className="text-cyan-400">.</span>
        </div>

        <span className="text-xs font-medium tracking-[0.18em] text-white/60 sm:text-sm">
          AHAD HOSEN AKASH
        </span>
      </motion.div>

      {/* Greeting area */}
      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <div className="w-full max-w-6xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.15,
            }}
            className="
              mb-8 text-xs font-semibold uppercase
              tracking-[0.3em] text-cyan-400
              sm:mb-10 sm:text-sm
            "
          >
            Welcome to my portfolio
          </motion.p>

          {/* Reserve space to avoid layout shifts */}
          <div className="flex min-h-[100px] items-center justify-center sm:min-h-[140px] md:min-h-[170px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={hellos[index]}
                initial={
                  reduceMotion
                    ? false
                    : {
                      opacity: 0,
                      y: 25,
                      scale: 0.96,
                      filter: "blur(8px)",
                    }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                      opacity: 0,
                      y: -18,
                      scale: 1.02,
                      filter: "blur(5px)",
                    }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mx-auto max-w-full
                  break-words text-5xl font-extrabold
                  leading-tight tracking-tight text-white
                  drop-shadow-[0_0_30px_rgba(34,211,238,0.22)]
                  sm:text-7xl md:text-8xl lg:text-9xl
                "
              >
                {hellos[index]}
                <span className="text-cyan-400">.</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 90, opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.3,
            }}
            className="
              mx-auto mt-8 h-1 rounded-full
              bg-gradient-to-r from-violet-500
              via-fuchsia-400 to-cyan-400
            "
          />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.4,
            }}
            className="
              mt-6 text-xs tracking-wide text-white/40
              sm:text-sm
            "
          >
            Ideas · Creativity · Technology
          </motion.p>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-8 left-6 right-6 z-20 sm:bottom-10 sm:left-10 sm:right-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-xs">
            Preparing your experience
          </span>

          <span className="text-xs font-semibold tabular-nums text-cyan-400 sm:text-sm">
            {String(Math.round(progress)).padStart(3, "0")}%
          </span>
        </div>

        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="
              h-full rounded-full
              bg-gradient-to-r from-violet-500
              via-fuchsia-400 to-cyan-400
            "
            animate={{ width: `${progress}%` }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: "easeOut",
        }}
        className="
          absolute bottom-0 left-0 h-1 w-full
          origin-left bg-gradient-to-r
          from-violet-500 via-fuchsia-400 to-cyan-400
        "
      />
    </motion.div>
  );
}