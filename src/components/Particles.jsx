import { useEffect, useRef } from "react";

export default function Particles({ count = 50 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let ps = [], id;
    const reset = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight;
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      }));
    };
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.shadowBlur = 10; ctx.shadowColor = "#1cd8d2";
      for (const p of ps) {
        p.x = (p.x + p.vx + c.width) % c.width; p.y = (p.y + p.vy + c.height) % c.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      id = requestAnimationFrame(tick);
    };
    reset(); tick();
    window.addEventListener("resize", reset);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", reset); };
  }, [count]);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
