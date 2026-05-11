import { motion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@/content/site";
import CursorFollowBadge from "@/components/CursorFollowBadge";
import { useMotionValue, useSpring } from "framer-motion";
import { springSmooth } from "@/lib/motion";

type ProjectCardData = Project & {
  cursorBadge?: boolean;
};

export default function ProjectCard({ project, index }: { project: ProjectCardData; index: number }) {
  const [badgeVisible, setBadgeVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const badgeX = useSpring(rawX, springSmooth);
  const badgeY = useSpring(rawY, springSmooth);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!project.cursorBadge) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(event.clientX - rect.left);
    rawY.set(event.clientY - rect.top);
  };

  const preview = (
    <motion.article
      onPointerEnter={() => project.cursorBadge && setBadgeVisible(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setBadgeVisible(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group relative h-full overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]"
    >
      <CursorFollowBadge visible={Boolean(project.cursorBadge && badgeVisible)} x={badgeX} y={badgeY} label="View" />
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-purple-950">
            <span className="font-display text-7xl italic text-white/20">{project.title.slice(0, 2)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur">
          {project.eyebrow}
        </div>
        <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex min-h-72 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{project.role} / {project.year}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="ref-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      {preview}
    </Link>
  );
}
