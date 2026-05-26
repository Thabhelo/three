import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { navLinks, profile, socials } from "@/content/site";

export default function Footer({ showReachOutCTA = false }: { showReachOutCTA?: boolean }) {
  return (
    <footer className="relative border-t border-dashed border-indigo-500/10 bg-card/40 py-14 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        {showReachOutCTA ? (
          <div className="glass-panel relative mb-8 overflow-hidden rounded-[14px] p-6 text-center md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_20rem)]" />
            <div className="relative">
              <Link href="/" className="mx-auto mb-4 inline-grid size-11 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] transition-colors hover:border-white/20">
                <img src="/favicon.svg" alt="Home" className="size-7" />
              </Link>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-none tracking-tight md:text-5xl">
                Reach out.
              </h2>
              <Link
                href="/contact"
                className="group mt-6 inline-flex h-10 items-center gap-3 rounded-full bg-white/[0.10] py-1 pl-5 pr-1 text-sm font-semibold text-zinc-50 shadow-[0_0_24px_rgba(255,255,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.16]"
              >
                Get in Touch
                <span className="grid size-8 place-items-center rounded-full bg-zinc-100 text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid gap-10 border-y border-dashed border-white/[0.10] py-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <img src="/favicon.svg" alt="Home" className="size-8" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              I&apos;m {profile.fullName}, a machine learning engineer and software engineer. Passionate about AI, Math and Physics.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-4 font-label">General</p>
              <div className="grid gap-3">
                {navLinks.slice(0, 4).map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-label">Specifics</p>
              <div className="grid gap-3">
                {navLinks.slice(4, 8).map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-label">More</p>
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
        </div>
      </div>
    </footer>
  );
}
