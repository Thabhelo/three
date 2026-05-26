import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import AnimatedMediaCard from "@/components/AnimatedMediaCard";
import { projects, type Project } from "@/config/projects";
import { refEase } from "@/lib/motion";

function projectRows(items: Project[]) {
  const rows: Project[][] = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }
  return rows;
}

function ProjectSummaryPanel({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: refEase }}
    >
      <p className="font-label">{String(index + 1).padStart(2, "0")} / {project.eyebrow}</p>
      <h3 className="mt-4 font-editorial text-3xl leading-tight">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
      <ul className="mt-6 grid gap-3">
        {project.highlights.slice(0, 3).map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
            <span className="mt-2 h-px w-5 shrink-0 bg-white/55" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.slice(0, 8).map((tag) => (
          <span key={tag} className="ref-pill">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200 transition-colors hover:text-white"
      >
        Open project <ArrowUpRight className="size-4" />
      </Link>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rows = useMemo(() => projectRows(projects), []);
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <section className="section-frame py-20">
      <div className="mb-12 text-center">
        <h2 className="font-display text-5xl leading-tight md:text-6xl">Projects</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.64fr_0.36fr]">
        <div className="grid gap-6">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={row.map((project) => project.slug).join("-")}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
              transition={{ duration: 0.55, ease: refEase }}
              className="grid gap-6 md:grid-cols-2"
            >
              {row.map((project, columnIndex) => {
                const index = rowIndex * 2 + columnIndex;
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="block"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onTouchStart={() => setActiveIndex(index)}
                  >
                    <AnimatedMediaCard
                      image={project.image}
                      title={project.title}
                      subtitle={project.eyebrow}
                      aspectRatio="aspect-[16/10]"
                      cursorParallax
                      revealOnScroll={false}
                      className={isActive ? "border-white/28 bg-white/[0.05]" : undefined}
                      overlay={
                        <>
                          <div className="absolute right-5 top-5 rounded-full border border-dashed border-white/15 bg-[#0b0218]/40 px-3 py-1 font-label text-white/80 backdrop-blur">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                            <p className="font-label">{project.eyebrow}</p>
                            <h3 className="mt-2 font-editorial text-2xl font-semibold text-white">{project.title}</h3>
                          </div>
                        </>
                      }
                    />
                  </Link>
                );
              })}
            </motion.div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="soft-card min-h-[28rem] rounded-[14px] p-6">
            <p className="font-label">Selected focus</p>
            <AnimatePresence mode="wait">
              {activeProject ? <ProjectSummaryPanel project={activeProject} index={activeIndex} /> : null}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </section>
  );
}
