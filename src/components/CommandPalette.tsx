import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, FileText, Github, Home, ImageIcon, Link as LinkIcon, Mail, Search, User, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { mediumPosts } from "@/config/medium-posts";
import { posts, profile, socials } from "@/content/site";
import { dropdownItemMotion, smoothEase } from "@/lib/motion";

type CommandItem = {
  id: string;
  name: string;
  href: string;
  group: "Pages" | "Blog" | "Connect";
  external?: boolean;
  icon: typeof Home;
  searchText: string;
};

const pageItems: CommandItem[] = [
  { id: "page-home", name: "Home", href: "/", group: "Pages", icon: Home, searchText: "home" },
  { id: "page-about", name: "About", href: "/about", group: "Pages", icon: User, searchText: "about" },
  { id: "page-projects", name: "Projects", href: "/projects", group: "Pages", icon: Briefcase, searchText: "projects work" },
  { id: "page-blog", name: "Blog", href: "/blog", group: "Pages", icon: BookOpen, searchText: "blog writing" },
  { id: "page-guestbook", name: "Guestbook", href: "/guestbook", group: "Pages", icon: BookOpen, searchText: "guestbook" },
  { id: "page-gallery", name: "Gallery", href: "/gallery", group: "Pages", icon: ImageIcon, searchText: "gallery photos images" },
  { id: "page-contact", name: "Book a call", href: "/contact", group: "Pages", icon: Mail, searchText: "contact call message" },
  { id: "page-resume", name: "Resume", href: profile.resume, group: "Pages", icon: FileText, external: true, searchText: "resume cv pdf" },
  { id: "page-links", name: "Links", href: "/links", group: "Pages", icon: LinkIcon, searchText: "links" },
];

const blogItems: CommandItem[] = [
  ...posts.map((post) => ({
    id: `blog-${post.slug}`,
    name: post.title,
    href: `/blog/${post.slug}`,
    group: "Blog" as const,
    icon: BookOpen,
    searchText: `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase(),
  })),
  ...mediumPosts.map((post) => ({
    id: `medium-${post.slug}`,
    name: post.title,
    href: post.url,
    group: "Blog" as const,
    external: true,
    icon: BookOpen,
    searchText: `${post.title} ${post.excerpt} medium`.toLowerCase(),
  })),
];

const connectItems: CommandItem[] = socials.map((social) => ({
  id: `social-${social.name}`,
  name: social.name,
  href: social.href,
  group: "Connect" as const,
  external: true,
  icon: social.name === "GitHub" ? Github : LinkIcon,
  searchText: social.name.toLowerCase(),
}));

const allItems = [...pageItems, ...blogItems, ...connectItems];

function matchesQuery(item: CommandItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return (
    item.name.toLowerCase().includes(normalized) ||
    item.searchText.includes(normalized) ||
    item.group.toLowerCase().includes(normalized)
  );
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const filteredItems = useMemo(() => allItems.filter((item) => matchesQuery(item, query)), [query]);
  const groupedItems = useMemo(
    () =>
      (["Pages", "Blog", "Connect"] as const)
        .map((group) => ({
          group,
          items: filteredItems.filter((item) => item.group === group),
        }))
        .filter((section) => section.items.length > 0),
    [filteredItems],
  );

  const renderItem = (item: CommandItem, index: number) => {
    const Icon = item.icon;
    const itemClassName =
      "group flex items-center gap-3 rounded-[10px] p-2.5 text-sm text-zinc-300 transition-colors duration-150 hover:bg-white/[0.08] hover:text-white";

    return (
      <motion.div key={item.id} {...dropdownItemMotion} transition={{ ...dropdownItemMotion.transition, delay: index * 0.02 }}>
        {item.external ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className={itemClassName}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-dashed border-white/10 bg-white/[0.07]">
              <Icon className="size-4" />
            </span>
            <span className="line-clamp-2">{item.name}</span>
          </a>
        ) : (
          <Link href={item.href} onClick={onClose} className={itemClassName}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-dashed border-white/10 bg-white/[0.07]">
              <Icon className="size-4" />
            </span>
            <span className="line-clamp-2">{item.name}</span>
          </Link>
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-[#0b0218]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 120, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.98 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="absolute bottom-4 left-1/2 w-[min(90vw,560px)] -translate-x-1/2 overflow-hidden rounded-[14px] border border-dashed border-white/[0.12] bg-[rgba(30,30,32,0.92)] shadow-border backdrop-blur-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-dashed border-white/10 p-2.5">
              <label className="flex h-10 flex-1 items-center gap-3 rounded-[10px] border border-dashed border-white/10 bg-white/[0.055] px-3">
                <Search className="size-4 shrink-0 text-zinc-500" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find a page or blog post..."
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.07] px-3 py-2.5 text-sm text-zinc-200 transition-colors duration-150 hover:bg-white/[0.12]"
              >
                Reach out
              </a>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.055]">
                <X className="size-4" />
              </Button>
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-3">
              <div className="mb-3 flex items-center justify-between font-label">
                <span>{query.trim() ? "Results" : "Quick navigation"}</span>
                {query.trim() ? (
                  <button type="button" onClick={() => setQuery("")} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    Clear
                  </button>
                ) : null}
              </div>

              {groupedItems.length === 0 ? (
                <p className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-zinc-500">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              ) : (
                groupedItems.map((section) => (
                  <div key={section.group} className="mb-4 last:mb-0">
                    <p className="mb-2 font-label text-zinc-500">{section.group}</p>
                    <div className="grid gap-1.5 md:grid-cols-2">
                      {section.items.map((item, index) => renderItem(item, index))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
