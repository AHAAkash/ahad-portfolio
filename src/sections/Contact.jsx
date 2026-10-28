import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Particles from "../components/Particles";
import { email, phone, address } from "../data";

const field = "p-3 rounded-md bg-white/10 border border-gray-500 focus:outline-none focus:border-[#1cd8d2] w-full";
const empty = { name: "", email: "", topic: "", message: "" };

export default function Contact() {
  const [f, setF] = useState(empty), [errors, setErrors] = useState({}), [status, setStatus] = useState("");
  const change = (e) => { setF({ ...f, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: "" }); };
  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    Object.entries(f).forEach(([k, v]) => !v.trim() && (err[k] = "Fill this field"));
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("sending");
    try {
      await emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, { ...f, from_name: f.name, reply_to: f.email }, import.meta.env.VITE_PUBLIC_KEY);
      setStatus("success"); setF(empty);
    } catch { setStatus("error"); }
  };
  const Err = ({ k }) => errors[k] ? <p className="text-red-400 text-xs mt-1">{errors[k]}</p> : null;
  return (
    <section id="contact" className="relative min-h-screen bg-black overflow-hidden px-6 md:px-20 py-20 flex items-center">
      <Particles />
      <div className="relative z-10 w-full grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex justify-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full grad-bg grid place-items-center text-center shadow-2xl">
            <span className="font-bangers text-5xl md:text-6xl">Let&apos;s<br />Talk</span>
          </motion.div>
        </motion.div>
        <motion.form onSubmit={submit} noValidate initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Let&apos;s Work Together</h2>
          <p className="text-gray-300 -mt-2">Or write to me directly at <a href={`mailto:${email}`} className="text-[#1cd8d2] underline underline-offset-4">{email}</a></p>
          <ul className="text-gray-300 text-sm grid gap-1 -mt-2">
            <li>Phone: <a href={`tel:${phone}`} className="text-[#1cd8d2] hover:underline">{phone}</a></li>
            <li>Location: {address}</li>
          </ul>
          <div><label htmlFor="name" className="block mb-1">Name</label><input id="name" name="name" value={f.name} onChange={change} placeholder="Your name" className={field} /><Err k="name" /></div>
          <div><label htmlFor="email" className="block mb-1">Email</label><input id="email" name="email" type="email" value={f.email} onChange={change} placeholder="Your email" className={field} /><Err k="email" /></div>
          <div><label htmlFor="topic" className="block mb-1">What is this about?</label>
            <select id="topic" name="topic" value={f.topic} onChange={change} className={field}>
              <option value="" disabled className="text-black">Pick a topic</option>
              {["Internship or job", "Research assistant role", "Research collaboration", "Master's study", "Project work", "Something else"].map((o) => <option key={o} className="text-black">{o}</option>)}
            </select><Err k="topic" /></div>
          <div><label htmlFor="message" className="block mb-1">Message</label><textarea id="message" name="message" rows="4" value={f.message} onChange={change} placeholder="How can I help?" className={field} /><Err k="message" /></div>
          <button type="submit" disabled={status === "sending"} className="grad py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity">{status === "sending" ? "Sending..." : "Send message"}</button>
          <p aria-live="polite" className={`text-sm ${status === "success" ? "text-[#00bf8f]" : "text-red-400"}`}>
            {status === "success" && "Message sent. I’ll reply soon."}{status === "error" && "Couldn’t send. Check your EmailJS keys in .env, or reach me on LinkedIn."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
