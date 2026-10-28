import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaOrcid, FaMedium } from "react-icons/fa6";
import { profile, socials } from "../data";

const icons = [[FaGithub, "GitHub", socials.github], [FaLinkedinIn, "LinkedIn", socials.linkedin], [FaOrcid, "ORCID", socials.orcid], [FaMedium, "Medium", socials.medium]];
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(28,216,210,0.3),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(0,191,143,0.3),transparent_70%)]" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 px-4 py-20 flex flex-col items-center text-center gap-6">
        <h1 className="font-bangers leading-none select-none whitespace-nowrap" style={{ fontSize: "clamp(2.2rem, 9vw, 9rem)", letterSpacing: "0.02em" }}>{profile.name}</h1>
        <div className="h-1 w-40 rounded-full grad" />
        <div className="flex gap-6 text-3xl">
          {icons.map(([Icon, label, href]) => (
            <motion.a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.95 }}><Icon /></motion.a>
          ))}
        </div>
        <p className="text-sm text-gray-400">© 2026 {profile.name}. Built with React, Vite, Tailwind CSS and Framer Motion.</p>
      </motion.div>
    </footer>
  );
}
