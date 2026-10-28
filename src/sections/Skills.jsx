import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { FaJava } from "react-icons/fa";
import { SiPython, SiCplusplus, SiJavascript, SiTypescript, SiDart, SiFlutter, SiReact, SiFastapi, SiDjango, SiPostgresql, SiMysql, SiFirebase, SiSupabase, SiPandas, SiNumpy, SiJupyter, SiGit, SiLinux } from "react-icons/si";

const skills = [[SiPython, "Python"], [FaJava, "Java"], [SiCplusplus, "C++"], [SiJavascript, "JavaScript"], [SiTypescript, "TypeScript"], [SiDart, "Dart"], [SiFlutter, "Flutter"],
  [SiReact, "React"], [SiFastapi, "FastAPI"], [SiDjango, "Django"], [SiPostgresql, "PostgreSQL"], [SiMysql, "MySQL"], [SiFirebase, "Firebase"], [SiSupabase, "Supabase"],
  [SiPandas, "Pandas"], [SiNumpy, "NumPy"], [SiJupyter, "Jupyter"], [SiGit, "Git"], [SiLinux, "Linux"]];
const loop = [...skills, ...skills];

export default function Skills() {
  const x = useMotionValue(0), dir = useRef(-1), track = useRef(null);
  useEffect(() => {
    const wheel = (e) => { dir.current = e.deltaY > 0 ? -1 : 1; };
    window.addEventListener("wheel", wheel, { passive: true });
    return () => window.removeEventListener("wheel", wheel);
  }, []);
  useAnimationFrame((_, delta) => {
    const half = (track.current?.scrollWidth || 0) / 2;
    if (!half) return;
    let next = x.get() + dir.current * 80 * (delta / 1000);
    if (next <= -half) next += half;
    if (next >= 0) next -= half;
    x.set(next);
  });
  return (
    <section id="skills" className="relative py-24 bg-black overflow-hidden text-center">
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full grad opacity-20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full grad opacity-20 blur-[120px] animate-pulse" />
      <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} className="relative text-4xl sm:text-5xl font-bold grad-text">My Skills</motion.h2>
      <p className="relative mt-2 mb-10 text-lg text-white/90">Machine Learning | Full-Stack | Research</p>
      <div className="relative overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex gap-10 text-6xl text-[#1cd8d2] whitespace-nowrap will-change-transform">
          {loop.map(([Icon, name], i) => (
            <div key={i} title={name} className="flex flex-col items-center gap-2 min-w-[120px]">
              <Icon className="hover:scale-125 transition-transform duration-300" /><p className="text-sm text-white/80">{name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
