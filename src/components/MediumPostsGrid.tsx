import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { DisplayMediumPost } from "@/hooks/use-blog-posts";

type MediumPostsGridProps = {
  posts: DisplayMediumPost[];
};

export default function MediumPostsGrid({ posts }: MediumPostsGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(posts.length - 1, 0)));
  }, [posts.length]);

  if (!posts.length) return null;

  const active = posts[activeIndex] ?? posts[0];

  function goPrevious() {
    setActiveIndex((current) => (current - 1 + posts.length) % posts.length);
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % posts.length);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-label">Featured on Medium</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous Medium post"
            onClick={goPrevious}
            className="grid size-9 place-items-center rounded-full border border-dashed border-white/15 text-muted-foreground transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next Medium post"
            onClick={goNext}
            className="grid size-9 place-items-center rounded-full border border-dashed border-white/15 text-muted-foreground transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.a
          key={active.slug}
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="group mb-6 grid overflow-hidden rounded-[14px] border border-dashed border-white/[0.12] bg-white/[0.03] transition-colors hover:border-white/25 md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative overflow-hidden bg-card">
            <img
              src={active.coverImage || active.imageFallback || "/media/blog-mdx-writing.jpg"}
              alt=""
              className="aspect-[16/10] h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03] md:aspect-auto md:min-h-[18rem]"
            />
          </div>
          <div className="flex flex-col justify-center p-5 md:p-7">
            <p className="font-label">{active.readTime} / {active.date}</p>
            <h2 className="mt-3 font-editorial text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{active.title}</h2>
            <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground md:text-base">{active.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200">
              Read on Medium <ArrowUpRight className="size-4" />
            </span>
          </div>
        </motion.a>
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={post.slug}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-[14px] border text-left transition-all duration-300 ${
                isActive
                  ? "scale-[1.02] border-white/30 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] lg:scale-[1.04]"
                  : "border-dashed border-white/[0.10] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-card">
                <img
                  src={post.coverImage || post.imageFallback || "/media/blog-mdx-writing.jpg"}
                  alt=""
                  className={`h-full w-full object-cover transition-all duration-500 ${isActive ? "opacity-95" : "opacity-80"}`}
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#0b0218]/70 via-[#0b0218]/30 to-transparent p-3 pr-10">
                  <p className="font-label text-white/85">{post.readTime}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className={`font-editorial font-semibold tracking-tight transition-colors ${isActive ? "text-lg text-white" : "text-base text-zinc-100"}`}>
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-white"
                >
                  Open <ArrowUpRight className="size-3" />
                </a>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
