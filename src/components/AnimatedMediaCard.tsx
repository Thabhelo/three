import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { imageReveal, springSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedMediaCardProps = {
  image?: string;
  video?: string;
  title?: string;
  subtitle?: string;
  alt?: string;
  aspectRatio?: string;
  overlay?: ReactNode;
  hoverScale?: number;
  cursorParallax?: boolean;
  revealOnScroll?: boolean;
  gradientTone?: string;
  className?: string;
};

export default function AnimatedMediaCard({
  image,
  video,
  title,
  subtitle,
  alt,
  aspectRatio = "aspect-[16/10]",
  overlay,
  hoverScale = 1.04,
  cursorParallax = false,
  revealOnScroll = true,
  gradientTone = "from-transparent via-transparent to-transparent",
  className,
}: AnimatedMediaCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springSmooth);
  const springY = useSpring(y, springSmooth);
  const mediaX = useTransform(springX, [-1, 1], [-10, 10]);
  const mediaY = useTransform(springY, [-1, 1], [-8, 8]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (!cursorParallax) return;

    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = revealOnScroll ? imageReveal : {};

  return (
    <motion.figure
      {...motionProps}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ y: -4 }}
      transition={springSmooth}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur transition-colors duration-300 hover:border-white/18",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-zinc-950", aspectRatio)}>
        <motion.div
          className="absolute inset-[-3%]"
          style={cursorParallax ? { x: mediaX, y: mediaY } : undefined}
          whileHover={{ scale: hoverScale }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {video ? (
            <video src={video} className="h-full w-full object-cover" muted loop playsInline autoPlay />
          ) : image ? (
            <img src={image} alt={alt ?? title ?? ""} className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:brightness-110" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center bg-zinc-950">
              <span className="font-display text-6xl italic text-white/18">{title?.slice(0, 2) ?? "TD"}</span>
            </div>
          )}
        </motion.div>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-35 transition-transform duration-700 group-hover:translate-y-[-6px]", gradientTone)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
        {overlay}
      </div>
      {!overlay && (title || subtitle) ? (
        <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5">
          {subtitle ? <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{subtitle}</p> : null}
          {title ? <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3> : null}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
