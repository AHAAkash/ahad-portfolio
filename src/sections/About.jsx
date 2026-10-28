import { motion } from "framer-motion";
import formalPicture from "../Assets/MY Formal Picture.jpeg";
import { profile } from "../data";

const view = { once: true, amount: 0.4 };
export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full grad opacity-20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full grad opacity-15 blur-[140px] animate-pulse" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} whileHover={{ scale: 1.03 }}
          className="shrink-0 w-44 h-44 md:w-52 md:h-52 rounded-2xl grad p-1 shadow-2xl">
          <img src={formalPicture} alt="Ahad Hosen Akash" className="w-full h-full rounded-xl object-cover object-top" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ duration: 0.6 }} className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold grad-text">About Me</h2>
          <p className="mt-2 text-xl font-semibold text-white/90">ML Engineer and Full-Stack Developer</p>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">{profile.bio}</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {profile.stats.map(([k, v], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: 0.08 * i }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="text-sm text-gray-400">{k}</div><div className="font-semibold">{v}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a href="#projects" className="rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition">View Projects</a>
            <a href="#contact" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 hover:bg-white/20 transition">Get in Touch</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
