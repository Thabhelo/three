import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { navLinks, profile, socials } from "@/content/site";

export default function Footer() {
  const marquee = "OPEN TO WORK · OPEN TO WORK · OPEN TO WORK · OPEN TO WORK ·";

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-zinc-950 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-8 overflow-hidden opacity-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-8xl italic text-white">
          <span>{marquee}</span>
          <span>{marquee}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-panel relative mb-8 overflow-hidden rounded-[2rem] p-6 text-center md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_20rem)]" />
          <div className="relative">
            <div className="mx-auto mb-4 grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] font-display text-base italic text-primary">
              TD
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">From concept to creation</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-none tracking-tight md:text-5xl">
              Let&apos;s make it happen!
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-flex h-10 items-center gap-3 rounded-full bg-white/[0.10] py-1 pl-5 pr-1 text-sm font-semibold text-zinc-50 shadow-[0_0_24px_rgba(255,255,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.16]"
            >
              Get in touch
              <span className="grid size-8 place-items-center rounded-full bg-zinc-100 text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-y border-white/[0.08] py-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <div className="font-display text-3xl italic text-zinc-100">TD</div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              I&apos;m {profile.fullName}, a software engineer building practical ML systems, tools, and community infrastructure.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">General</p>
              <div className="grid gap-3">
                {navLinks.slice(0, 4).map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">Specifics</p>
              <div className="grid gap-3">
                {navLinks.slice(4, 8).map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">More</p>
              <div className="grid gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.name}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <p>Built with React, Tailwind, motion, and a stubborn love for craft.</p>
        </div>
      </div>
    </footer>
  );
}
