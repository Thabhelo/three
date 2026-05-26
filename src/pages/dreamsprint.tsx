import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { profile } from "@/content/site";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 4 * position} -${189 + i * 5}C-${380 - i * 4 * position} -${189 + i * 5} -${312 - i * 4 * position} ${216 - i * 5} ${152 - i * 4 * position} ${343 - i * 5}C${616 - i * 4 * position} ${470 - i * 5} ${684 - i * 4 * position} ${875 - i * 5} ${684 - i * 4 * position} ${875 - i * 5}`,
    width: 0.3 + i * 0.025,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none">
        <defs>
          <linearGradient id={`gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`url(#gradient-${position})`}
            strokeWidth={path.width}
            fill="none"
            initial={{ pathLength: 0, opacity: 0, filter: "blur(2px)" }}
            animate={{
              pathLength: [0, 1, 0.8],
              opacity: [0, 0.35, 0.12],
              filter: ["blur(2px)", "blur(0px)", "blur(1px)"],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

const highlights = [
  "10 days of pure focus",
  "About 10 participants",
  "Miami AirBnB",
  "Aug 1–11 | Thanksgiving | December",
  "Virtual option available",
];

const footerColumns = [
  {
    title: "Contact",
    lines: ["Organizer: Thabhelo Duve", profile.email, "+1 256 375 4207"],
  },
  {
    title: "Timeline",
    lines: ["Applications due: July 15", "Decisions sent: July 20", "Sprint begins: August 1"],
  },
  {
    title: "What to expect",
    lines: ["Intense focus sessions", "Daily progress reviews", "Breakthrough results"],
  },
];

export default function DreamSprintLanding() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen w-full bg-[#0d0d0f] text-zinc-100 selection:bg-white/20 selection:text-white">
      <header className="fixed top-6 z-50 w-full px-4 md:px-8">
        <div className="site-container flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <img src="/favicon.svg" alt="Home" className="size-[30px] transition-transform duration-300 group-hover:rotate-6" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/60 transition-colors duration-150 hover:text-white">
            Back to portfolio
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </header>

      <motion.section className="cinematic-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24" style={{ y, opacity }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-0.7} />
        <ParticleField />
        <div className="noise-overlay absolute inset-0" />
        <div className="stage-vignette absolute inset-0" />

        <div className="relative z-20 mx-auto max-w-6xl text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="font-label">
            Intensive work sprint
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-[clamp(3rem,12vw,9rem)] font-normal leading-none tracking-tight text-white/[0.92]"
          >
            DreamSprint
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-editorial text-xl text-white/70 md:text-3xl"
          >
            Transform vision into reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10"
          >
            <a
              href="/contact"
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.10] py-1 pl-6 pr-1.5 text-base font-medium text-white/90 transition-all duration-[400ms] hover:border-white/30 hover:bg-white hover:text-zinc-950"
            >
              Apply
              <span className="grid size-9 place-items-center rounded-full bg-white/[0.85] text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-12 max-w-5xl space-y-4 text-left text-sm leading-7 text-white/60 md:text-base md:leading-8"
          >
            <p>
              Hey, I&apos;m organizing a 10-day deep work sprint and I&apos;m looking for up to 9 other highly motivated people to join. The goal is simple: come with one big project you&apos;ve been meaning to finish — whether it&apos;s a startup, a coding project, finish 300 leetcodes, a set of 50 videos, a book, a course, or something creative — and use this time to get it done.
            </p>
            <p>
              <strong className="text-white/80">Tentative dates:</strong> August 1–11, Thanksgiving week, or December. During the application process, you&apos;ll rank these periods by preference. Those who can&apos;t attend in person can join virtually and participate in check-ins, progress updates, and collaborative sessions.
            </p>
            <p>
              We may stream the experience live 24/7 if one of us is a content creator. Fast Wi-Fi, shared spaces for working or brainstorming, daily challenges, and constant encouragement to push through. We&apos;ll also contribute and have access to the $200/mo ChatGPT Pro and the $100/mo Claude Max models.
            </p>
            <p>If you&apos;re down, fill in the form. We&apos;re looking for people ready to show up, lock in, and get real work done.</p>
          </motion.div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 h-[5px] w-9 -translate-x-1/2 rounded-full border border-white/35 bg-white/[0.02]" />
      </motion.section>

      <div className="border-y border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-center">
        <p className="font-label text-white/45">Big screen such as an iPad / Mac is recommended for best experience</p>
      </div>

      <section className="section-frame py-24 md:py-32">
        <div className="mb-16 text-center">
          <p className="font-label">Manifesto</p>
          <h2 className="mt-3 font-editorial text-3xl tracking-tight md:text-5xl">The sprint manifesto</h2>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-6 text-sm leading-7 text-white/60 md:text-base md:leading-8">
            <p>
              By the end of the sprint, you will have a tangible startup MVP ready to pitch to investors. Or you&apos;d have recorded and edited 75 pieces of content. Or finished a book. Or a DSA course. Or launched your YouTube channel. Or developed your first machine learning model.
            </p>
            <p>Ten days in Miami. One shared mission: transform your vision into tangible reality.</p>
            <p>
              We&apos;ll eliminate distractions, optimize for deep work, and surround you with equally driven individuals. Daily check-ins, progress demos, and relentless momentum toward your breakthrough.
            </p>
          </div>

          <div className="soft-card rounded-[14px] p-8">
            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="size-2 shrink-0 rounded-full bg-white/55" />
                  <span className="text-sm text-white/75 md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-dashed border-white/10 bg-zinc-950 py-16">
        <div className="site-container">
          <h3 className="text-center font-editorial text-2xl md:text-3xl">Ready to make history?</h3>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-label">{column.title}</p>
                <div className="mt-4 space-y-2 text-sm text-white/55">
                  {column.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-4xl border-t border-dashed border-white/10 pt-8 text-center text-sm leading-7 text-white/50">
            DreamSprint is an intensive work experience designed for ambitious individuals ready to transform their visions into reality. This is not a casual event — it&apos;s a crucible for breakthrough achievement.
          </p>
        </div>
      </footer>
    </div>
  );
}
