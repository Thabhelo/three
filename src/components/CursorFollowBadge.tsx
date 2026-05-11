import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { badgeFollowMotion } from "@/lib/motion";

export default function CursorFollowBadge({
  visible,
  x,
  y,
  label = "View",
}: {
  visible: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  label?: string;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          {...badgeFollowMotion}
          className="pointer-events-none absolute left-0 top-0 z-30 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white text-zinc-950 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
          style={{ x, y }}
        >
          <span className="absolute inset-1 rounded-full border border-zinc-950/10" />
          <span className="flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-[0.18em]">
            {label}
            <ArrowUpRight className="mt-0.5 size-4" />
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
