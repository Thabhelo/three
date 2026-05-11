import { useEffect, type RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { springSmooth } from "@/lib/motion";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CursorPencil({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springSmooth);
  const y = useSpring(rawY, springSmooth);
  const rotate = useTransform(x, [-50, 50], [-5, 5]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(max-width: 768px)").matches) return undefined;

    const handleMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      rawX.set(clamp(relativeX * rect.width * 0.9, -360, 360));
      rawY.set(clamp(relativeY * 140, -70, 70));
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    section.addEventListener("pointermove", handleMove);
    section.addEventListener("pointerleave", handleLeave);

    return () => {
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, [rawX, rawY, sectionRef]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[18%] z-10 hidden origin-bottom md:block"
      style={{ x, y, rotate }}
    >
      <img src="/media/stylus-pencil.jpg" alt="" className="h-80 w-16 rounded-full object-cover opacity-90 mix-blend-screen shadow-[0_24px_80px_rgba(255,255,255,0.14)]" />
    </motion.div>
  );
}
