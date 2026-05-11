import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, Calendar, Github, Home, Link as LinkIcon, Mail, Search, User, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { profile, socials } from "@/content/site";
import { smoothEase } from "@/lib/motion";

const pages = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Guestbook", href: "/guestbook", icon: BookOpen },
  { name: "Bucket List", href: "/bucket-list", icon: Calendar },
  { name: "Book a call", href: "/contact", icon: Mail },
  { name: "Uses", href: "/uses", icon: Briefcase },
  { name: "Attribution", href: "/attribution", icon: BookOpen },
  { name: "Links", href: "/links", icon: LinkIcon },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm"
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
            transition={{ duration: 0.28, ease: smoothEase }}
            className="absolute bottom-4 left-1/2 w-[min(90vw,560px)] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border border-white/[0.12] bg-[rgba(30,30,32,0.92)] shadow-[0_24px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 p-2.5">
              <div className="flex h-10 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-3 text-sm text-zinc-400">
                <Search className="size-4" />
                <span>Find a blog post...</span>
              </div>
              <a href={`mailto:${profile.email}`} className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-sm text-zinc-200 transition-colors hover:bg-white/[0.12]">
                Reach out
              </a>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl border border-white/10 bg-white/[0.055]">
                <X className="size-4" />
              </Button>
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-3">
              <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
                <span>Recent</span>
                <span>Clear</span>
              </div>
              <Link href="/uses" onClick={onClose} className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300">
                Uses
              </Link>

              <p className="mb-2 border-t border-white/10 pt-3 text-sm text-zinc-500">Pages</p>
              <div className="grid gap-1.5 md:grid-cols-2">
                {pages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={page.name}
                      href={page.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-2xl p-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white ${index === 0 ? "bg-white/[0.12] text-white" : ""}`}
                    >
                      <span className="grid size-8 place-items-center rounded-xl bg-white/[0.07]">
                        <Icon className="size-4" />
                      </span>
                      <span>{page.name}</span>
                    </Link>
                  );
                })}
              </div>

              <p className="mb-2 mt-4 border-t border-white/10 pt-3 text-sm text-zinc-500">Connect</p>
              <div className="grid gap-1.5 md:grid-cols-3">
                {socials.slice(0, 3).map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl p-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white">
                    <span className="grid size-8 place-items-center rounded-xl bg-white/[0.07]">
                      {social.name === "GitHub" ? <Github className="size-4" /> : <LinkIcon className="size-4" />}
                    </span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
