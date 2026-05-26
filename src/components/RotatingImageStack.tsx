import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { springSmooth } from "@/lib/motion";

type StackImage = {
  title: string;
  src: string;
  alt: string;
};

export default function RotatingImageStack({ images }: { images: StackImage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springSmooth);
  const y = useSpring(rawY, springSmooth);
  const rotateX = useTransform(y, [-1, 1], [5, -5]);
  const rotateY = useTransform(x, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (paused || images.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleLeave = () => {
    setPaused(false);
    rawX.set(0);
    rawY.set(0);
  };

  const ordered = images.map((image, index) => ({
    ...image,
    position: (index - active + images.length) % images.length,
  }));

  return (
    <div
      className="relative min-h-[520px] overflow-hidden rounded-[14px] border border-dashed border-white/[0.09] bg-white/[0.035] p-5 shadow-border"
      onMouseEnter={() => setPaused(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div className="relative h-[430px] [perspective:1000px]" style={{ rotateX, rotateY }}>
        {ordered.map((image) => {
          const isActive = image.position === 0;
          const styles = [
            "left-1/2 top-8 z-30 w-[72%] -translate-x-1/2 rotate-0 opacity-100",
            "left-8 top-20 z-20 w-[50%] -rotate-8 opacity-55",
            "right-8 top-24 z-10 w-[48%] rotate-8 opacity-45",
            "left-1/2 top-32 z-0 w-[44%] -translate-x-1/2 rotate-3 opacity-25",
          ];

          return (
            <motion.div
              key={image.title}
              layout
              transition={springSmooth}
              className={`absolute overflow-hidden rounded-[18px] border border-dashed border-white/[0.12] bg-zinc-950 shadow-border ${styles[image.position] ?? styles[3]}`}
            >
              <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {isActive ? <div className="absolute inset-x-0 bottom-0 p-5 font-label text-white/75">{image.title}</div> : null}
            </motion.div>
          );
        })}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={images[active]?.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24 }}
          className="text-center font-display text-3xl italic text-zinc-100"
        >
          {images[active]?.title}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
