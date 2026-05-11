import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation } from "wouter";
import CommandPalette from "@/components/CommandPalette";
import { Button } from "@/components/ui/button";
import { moreLinks, primaryLinks } from "@/config/nav";
import { profile } from "@/content/site";
import { dropdownMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
    <nav className="fixed top-[22px] z-50 w-full px-4 md:top-6 md:px-8">
      <div className="site-container relative flex h-[54px] items-start py-1.5">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <span className="inline-flex w-6 items-baseline justify-center font-display text-[22px] font-bold italic leading-none tracking-tight text-zinc-50 transition-transform group-hover:rotate-6">
              T<span className="ml-0.5 text-[0.58em] text-primary">D</span>
            </span>
          </Link>

          <div
            className={cn(
              "shadow-border absolute left-1/2 top-1/2 hidden h-11 w-[456px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] p-1 backdrop-blur-[20px] transition-all duration-300 md:flex",
              scrolled && "bg-white/[0.11] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.35)]",
            )}
            onMouseLeave={() => setMoreOpen(false)}
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13.5px] font-normal leading-5 text-white/60 transition-colors duration-150 hover:text-white",
                  (location === link.href || (link.href !== "/" && location.startsWith(link.href))) && "bg-white/[0.12] text-white",
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setMoreOpen(true)}
                onFocus={() => setMoreOpen(true)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13.5px] font-normal leading-5 text-white/60 transition-colors duration-150 hover:text-white",
                  moreOpen && "bg-white/[0.12] text-white",
                )}
              >
                More ^
              </button>
              <AnimatePresence>
                {moreOpen ? (
                  <motion.div
                    {...dropdownMotion}
                    role="menu"
                    onFocus={() => setMoreOpen(true)}
                    style={{ x: "-50%" }}
                    className="absolute left-1/2 top-12 w-[min(88vw,900px)] rounded-[30px] border border-white/[0.12] bg-[rgba(30,30,32,0.86)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-[24px]"
                  >
                    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="grid gap-4 sm:grid-cols-2">
                      {moreLinks.filter((item) => item.featured).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            role="menuitem"
                            className="group relative min-h-[208px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-white/12 to-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/20"
                          >
                            {"image" in item && item.image ? <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105" /> : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="relative mt-auto flex h-full flex-col justify-end">
                              <Icon className="mb-4 size-8 text-zinc-200" />
                              <h3 className="text-xl font-semibold text-zinc-50">{item.name}</h3>
                              <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                            </div>
                          </Link>
                        );
                      })}
                      </div>
                      <div className="grid content-start gap-3">
                      {moreLinks.filter((item) => !item.featured).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            role="menuitem"
                            className="group flex items-center gap-4 rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/20"
                          >
                            <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                              <Icon className="size-5 text-zinc-200" />
                            </span>
                            <span>
                              <span className="block font-semibold text-zinc-100">{item.name}</span>
                              <span className="mt-1 block text-sm text-zinc-400">{item.description}</span>
                            </span>
                            <ArrowUpRight className="ml-auto size-4 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-100" />
                          </Link>
                        );
                      })}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <Link href="/contact">
              <span className="inline-flex h-8 items-center rounded-full bg-white/[0.12] px-4 py-1.5 text-[13.5px] font-normal leading-5 text-white/75 transition-colors duration-200 hover:bg-white/[0.18] hover:text-white">
                Book a Call
              </span>
            </Link>
          </div>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <button type="button" onClick={() => setCommandOpen(true)} className="rounded-full px-3 py-2 font-mono text-sm text-zinc-300 transition-colors hover:text-white">⌘K</button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/10 bg-white/[0.035]"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/10 bg-white/[0.045]"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-4 right-4 top-16 rounded-3xl border border-border bg-background/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
          <div className="grid gap-1">
            {[...primaryLinks, ...moreLinks, { name: "Contact", href: "/contact" }].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  location === link.href && "bg-muted text-foreground",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="sm" className="mt-3 w-full rounded-2xl">
              Resume
            </Button>
          </a>
        </div>
      )}
    </nav>
    <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
