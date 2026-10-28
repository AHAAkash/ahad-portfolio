import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function WorkCarousel({ id, title, entries }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(
      Math.min(entries.length - 1, Math.floor(progress * entries.length))
    );
  });

  const entry = entries[active];

  return (
    <section
      id={id}
      ref={ref}
      className="relative"
      style={{
        height: `${100 * entries.length}vh`,
        backgroundColor: entry.bg,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-80 w-80 rounded-full bg-white/10 blur-[100px]"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 40, -25, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute top-8 flex flex-col items-center gap-2 sm:top-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Selected work
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
          <span className="h-px w-12 bg-white/50" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={entry.title}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 28, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -20, filter: "blur(6px)" }
            }
            transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/15 bg-black/20 px-6 py-10 shadow-2xl backdrop-blur-sm sm:px-12 sm:py-14"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.08 }}
              className="mb-4 block text-sm font-medium tracking-[0.2em] text-white/60"
            >
              {String(active + 1).padStart(2, "0")}{" "}
              <span className="text-white/35">/</span>{" "}
              {String(entries.length).padStart(2, "0")}
            </motion.span>
            <motion.h3
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.4 }}
              className="font-bangers text-[clamp(2.5rem,9vw,7rem)] italic leading-none"
            >
              {entry.title}
            </motion.h3>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.2, duration: 0.4 }}
              className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl"
            >
              {entry.text}
            </motion.p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {entry.stack.map((item, index) => (
                <motion.span
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.06 }}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/85"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            {entry.link && (
              <motion.a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.45 }}
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black"
              >
                View project
                <FiArrowUpRight aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 flex items-center gap-3 sm:bottom-10" aria-hidden="true">
          <span className="text-xs tabular-nums text-white/60">
            {String(active + 1).padStart(2, "0")}
          </span>
          {entries.map((item, index) => (
            <motion.span
              key={item.title}
              animate={{
                width: index === active ? 32 : 12,
                opacity: index === active ? 1 : 0.4,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="h-1.5 rounded-full bg-white"
            />
          ))}
          <span className="text-xs tabular-nums text-white/60">
            {String(entries.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
