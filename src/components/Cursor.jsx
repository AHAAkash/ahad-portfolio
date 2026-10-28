import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
} from "framer-motion";

export default function Cursor() {
  const [mode, setMode] = useState("default");
  const [clickId, setClickId] = useState(0);
  const [pointerVisible, setPointerVisible] = useState(false);

  const currentMode = useRef("default");
  const pointerInside = useRef(false);

  // Pointer position
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Main cursor: fast and responsive
  const cursorX = useSpring(x, {
    stiffness: 700,
    damping: 45,
    mass: 0.25,
  });

  const cursorY = useSpring(y, {
    stiffness: 700,
    damping: 45,
    mass: 0.25,
  });

  // Secondary follower: smooth, delayed movement
  const followerX = useSpring(x, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  const followerY = useSpring(y, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  // Stretch the glow according to pointer velocity
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);

  const stretchX = useTransform(velocityX, (v) =>
    1 + Math.min(Math.abs(v) / 5000, 0.35)
  );

  const stretchY = useTransform(velocityY, (v) =>
    1 + Math.min(Math.abs(v) / 5000, 0.35)
  );

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) return;

    const move = (event) => {
      const isFirstMove = !pointerInside.current;
      x.set(event.clientX);
      y.set(event.clientY);

      if (isFirstMove) {
        pointerInside.current = true;
        setPointerVisible(true);
        document.documentElement.dataset.customCursor = "active";
        cursorX.jump(event.clientX);
        cursorY.jump(event.clientY);
        followerX.jump(event.clientX);
        followerY.jump(event.clientY);
      }

      const target = event.target;

      const element =
        target instanceof Element
          ? target.closest("[data-cursor]")
          : null;

      const nextMode = element?.getAttribute("data-cursor") || "default";

      if (nextMode !== currentMode.current) {
        currentMode.current = nextMode;
        setMode(nextMode);
      }
    };

    const leave = () => {
      pointerInside.current = false;
      setPointerVisible(false);
      delete document.documentElement.dataset.customCursor;
      currentMode.current = "default";
      setMode("default");
      x.set(-200);
      y.set(-200);
    };

    const click = () => {
      setClickId((id) => id + 1);
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", click);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", click);
      delete document.documentElement.dataset.customCursor;
    };
  }, [x, y, cursorX, cursorY, followerX, followerY]);

  const isInteractive = mode !== "default";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]
                 hidden overflow-hidden
                 [@media(pointer:fine)]:block
                 motion-reduce:hidden"
    >
      {/* Delayed outer follower */}
      <motion.div
        style={{ x: followerX, y: followerY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            width: isInteractive ? 82 : 42,
            height: isInteractive ? 82 : 42,
            opacity: pointerVisible ? 0.8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
          }}
          className="absolute -left-1/2 -top-1/2
                     rounded-full border border-white/50"
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          scaleX: stretchX,
          scaleY: stretchY,
        }}
        className="absolute left-0 top-0"
      >
        {/* Gradient glow */}
        <motion.div
          animate={{
            width: isInteractive ? 110 : 80,
            height: isInteractive ? 110 : 80,
            opacity: pointerVisible ? (isInteractive ? 0.8 : 0.55) : 0,
          }}
          transition={{ duration: 0.25 }}
          className="absolute -left-10 -top-10
                     rounded-full bg-gradient-to-r
                     from-violet-500 via-fuchsia-500
                     to-cyan-400 blur-3xl"
        />

        {/* Center dot */}
        <motion.div
          animate={{
            scale: isInteractive ? 1.5 : 1,
            opacity: pointerVisible ? 1 : 0,
          }}
          className="absolute -left-1 -top-1
                     h-2 w-2 rounded-full bg-white"
        />

        {/* Context label */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{
            opacity: mode === "default" || !pointerVisible ? 0 : 1,
            scale: 1,
            y: 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-5 top-5
                     flex h-16 w-16 items-center
                     justify-center rounded-full
                     border border-white/40
                     bg-black/70 text-[10px]
                     font-semibold uppercase
                     tracking-wider text-white
                     backdrop-blur-md"
        >
          {mode === "default" ? "" : mode}
        </motion.div>
      </motion.div>

      {/* Click ripple */}
      {clickId > 0 && (
        <motion.div
          key={clickId}
          initial={{
            left: x.get(),
            top: y.get(),
            width: 0,
            height: 0,
            opacity: 0.7,
          }}
          animate={{
            width: 90,
            height: 90,
            opacity: 0,
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-violet-300"
        />
      )}
    </div>
  );
}