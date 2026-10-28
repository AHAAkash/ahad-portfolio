import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "../data";

function Card({ e, className = "", style }) {
  return (
    <motion.article style={style} className={`bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-semibold">{e.role}</h3>
      <p className="text-gray-400 mb-3">{e.org} | {e.time}</p>
      <p className="text-gray-300">{e.text}</p>
    </motion.article>
  );
}

function Item({ e, i, n, progress }) {
  const a = i / n, b = (i + 1) / n, above = i % 2 === 0;
  const op = useTransform(progress, [a, b], [0, 1]);
  const dy = useTransform(progress, [a, b], [above ? 30 : -30, 0]);
  return (
    <div className="relative flex-1 flex justify-center">
      <motion.div style={{ scale: op, opacity: op }} className="z-10 w-7 h-7 -mt-[13px] rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]" />
      <Card e={e} style={{ opacity: op, y: dy }} className={`absolute w-[300px] max-w-[90vw] ${above ? "bottom-8" : "top-8"}`} />
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const n = experience.length;
  return (
    <section id="experience" className="bg-black">
      <div className="md:hidden px-6 py-20">
        <h2 className="text-4xl font-semibold text-center mb-10">Experience</h2>
        <div className="grid gap-5">{experience.map((e) => <Card key={e.role} e={e} />)}</div>
      </div>
      <div ref={ref} className="hidden md:block relative" style={{ height: `${n * 120}vh` }}>
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-5xl font-semibold text-center pt-16">Experience</h2>
          <div className="flex-1 flex items-center px-10">
            <div className="relative w-full max-w-7xl mx-auto">
              <div className="relative h-[6px] bg-white/15 rounded"><motion.div style={{ width }} className="absolute left-0 top-0 h-[6px] bg-white rounded" /></div>
              <div className="flex">{experience.map((e, i) => <Item key={e.role} e={e} i={i} n={n} progress={scrollYProgress} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
