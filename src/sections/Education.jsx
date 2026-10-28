import { motion } from "framer-motion";
import { education, awards } from "../data";
import schoolImage from "../Assets/School_img.jpg";
import universityLogo from "../Assets/jstu_logo.png";
import collegeImage from "../Assets/Clg_images.jpg";

const view = { once: true, amount: 0.3 };
const educationImages = [
  { src: universityLogo, alt: "Jamalpur Science and Technology University emblem", contain: true },
  { src: collegeImage, alt: "Birshreshtha Munshi Abdur Rouf Public College badge", contain: true },
  { src: schoolImage, alt: "Zeal Bangla Sugar Mills High School campus", contain: false },
];

export default function Education() {
  return (
    <section id="education" className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="absolute top-10 right-0 w-[320px] h-[320px] rounded-full grad opacity-15 blur-[130px]" />
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl font-bold grad-text mb-6">Education</h2>
          <div className="grid gap-4">
            {education.map(([deg, school, meta], i) => (
              <motion.div key={deg} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 bg-white p-1.5 sm:h-20 sm:w-20">
                  <img
                    src={educationImages[i].src}
                    alt={educationImages[i].alt}
                    className={`h-full w-full rounded-full ${
                      educationImages[i].contain ? "object-contain" : "object-cover"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{deg}</h3>
                  <p className="text-gray-400">{school}</p>
                  <p className="mt-1 text-sm text-[#1cd8d2]">{meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold grad-text mb-6">Awards</h2>
          <ul className="grid gap-4">
            {awards.map((a, i) => (
              <motion.li key={a} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-200">{a}</motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
