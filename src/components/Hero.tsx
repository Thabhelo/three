import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { profile } from "@/content/site";

interface HeroProps {
  backgroundImage: string;
}

export default function Hero({ backgroundImage }: HeroProps) {
  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    event.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const item = {
    hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section onMouseMove={handlePointerMove} className="cinematic-stage relative min-h-screen overflow-hidden px-4 md:px-6">
      <div className="noise-overlay absolute inset-0" />
      <div className="stage-vignette absolute inset-0" />
      <div className="absolute inset-0 -z-10 opacity-10">
        <img src={backgroundImage} alt="" className="h-full w-full object-cover blur-3xl saturate-150" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh] overflow-hidden">
        <div className="absolute bottom-[12vh] left-1/2 h-28 w-[760px] -translate-x-1/2 overflow-hidden rounded-full opacity-70 blur-3xl">
          <div className="h-full w-[300%] animate-[hero-glow-shift_8s_linear_infinite] bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#7c3aed)]" />
        </div>
        <div className="hero-horizon absolute bottom-[-26vh] left-1/2 h-[40vh] w-[132vw] -translate-x-1/2 rounded-[100%]" />
      </div>

      <div className="site-container relative z-10 grid min-h-screen place-items-center pb-[23vh] pt-[18vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.1 }}
          className="mx-auto w-full max-w-[860px] text-center"
        >
          <a
            href="/projects"
            className="group mb-8 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/70 backdrop-blur-xs transition-colors duration-300 ease-in hover:border-white/15 hover:bg-white/5 hover:text-white"
          >
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">New</span>
            <Sparkles className="size-3.5 text-primary" />
            <span>Keythm — feel every keystroke</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <motion.h1 variants={item} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="w-full text-balance font-display text-[clamp(42px,4.2vw,70px)] font-normal leading-[1.05] tracking-tight text-white/[0.88]">
            Code that feels designed.
          </motion.h1>
          <motion.p variants={item} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="mt-3 bg-gradient-to-b from-white/50 via-white/75 to-white/90 bg-clip-text font-display text-[clamp(40px,4vw,66px)] font-normal italic leading-[1.05] tracking-tight text-transparent">
            Engineering that actually ships.
          </motion.p>

          <motion.div variants={item} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="relative z-20 mt-10 flex flex-col items-center justify-center text-center text-lg leading-[1.5] tracking-tight text-white/[0.68] sm:flex-row sm:gap-3 lg:text-xl">
            <span>Hello, I&apos;m {profile.fullName}</span>
            <img src={profile.portrait} alt="" className="h-[34px] w-[58px] rounded-full border border-white/10 object-cover shadow-lg shadow-black/30" />
            <span>a {profile.role}</span>
          </motion.div>

          <motion.div variants={item} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex h-12 w-fit items-center justify-between overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.09] py-1 pl-6 pr-1.5 text-base font-medium text-white/[0.90] backdrop-blur-xs transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-white/30 hover:bg-white hover:text-zinc-950 hover:shadow-lg hover:shadow-white/20 active:scale-[0.98]">
              Let&apos;s Connect
              <span className="ml-4 grid size-9 place-items-center rounded-full bg-white/[0.85] text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-2 text-sm text-white/[0.42] transition-colors duration-300 hover:text-zinc-100 sm:ml-3">
              <Mail className="size-4" />
              {profile.email}
              <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-7 left-1/2 z-20 h-[5px] w-9 -translate-x-1/2 rounded-full border border-white/35 bg-white/[0.02]" />
    </section>
  );
}
