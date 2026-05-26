import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "@/config/profile";
import type { ExperienceConfig } from "@/config/experience";
import { fadeUp, springSmooth } from "@/lib/motion";

export default function ExperienceTimeline({ experiences }: { experiences: ExperienceConfig[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, springSmooth);
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative grid gap-0">
      <div className="pointer-events-none absolute bottom-16 left-[calc(28%+4rem)] top-5 hidden w-px bg-white/[0.10] md:block">
        <motion.div className="absolute left-0 top-0 w-px bg-gradient-to-b from-white/70 via-white/35 to-white/10" style={{ height }} />
        <motion.div className="absolute left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border border-white/20 bg-card shadow-[0_0_30px_rgba(255,255,255,0.12)]" style={{ top: markerTop }}>
          <img src={profile.portrait} alt="" className="size-8 rounded-full object-cover" />
        </motion.div>
      </div>

      {experiences.map((experience, index) => (
        <motion.article
          key={`${experience.company}-${experience.title}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          className="group grid gap-8 border-b border-dashed border-white/[0.10] py-12 last:border-b-0 md:grid-cols-[0.28fr_8rem_minmax(0,1fr)]"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="md:text-right">
            <p className="font-label">{experience.date}</p>
            <div className="mt-4 inline-grid size-16 place-items-center rounded-[10px] border border-dashed border-white/10 bg-white/[0.08] p-2 font-mono text-xs text-zinc-200">
              {experience.logo ? (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="max-h-10 max-w-10 object-contain"
                />
              ) : (
                experience.logoText
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-100">{experience.company}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{experience.location} / {experience.type}</p>
          </motion.div>

          <div className="relative hidden md:block" aria-hidden="true" />

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[14px] border border-dashed border-white/[0.08] bg-white/[0.025] p-5 transition-colors duration-300 group-hover:border-white/[0.18] group-hover:bg-white/[0.04] md:p-7"
          >
            <p className="font-mono text-xs text-white/55">{String(index + 1).padStart(2, "0")}</p>
            <h4 className="mt-2 text-2xl font-semibold tracking-tight">{experience.title}</h4>
            <ul className="mt-5 grid gap-3">
              {experience.description.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-white/55" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {experience.techStack.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: tagIndex * 0.04 }}
                  className="ref-pill"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.article>
      ))}
    </div>
  );
}
