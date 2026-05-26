import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import HeroTerminalBanner from "@/components/HeroTerminalBanner";
import { profile, profileCredentials } from "@/content/site";
import { blurIn, heroItemTransition } from "@/lib/motion";

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

  return (
    <section onMouseMove={handlePointerMove} className="cinematic-stage relative min-h-screen overflow-hidden px-4 md:px-6">
      <div className="noise-overlay absolute inset-0" />
      <div className="stage-vignette absolute inset-0" />
      <div className="absolute inset-0 -z-10 opacity-10">
        <img src={backgroundImage} alt="" className="h-full w-full object-cover blur-3xl saturate-50" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh] overflow-hidden">
        <div className="absolute bottom-[12vh] left-1/2 h-28 w-[760px] -translate-x-1/2 overflow-hidden rounded-full opacity-70 blur-3xl">
          <div className="hero-glow-band h-full w-[300%]" />
        </div>
        <div className="hero-horizon absolute bottom-[-26vh] left-1/2 h-[40vh] w-[132vw] -translate-x-1/2 rounded-[100%]" />
      </div>

      <div className="site-container relative z-10 grid min-h-screen place-items-center pb-[23vh] pt-[18vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="mx-auto w-full max-w-[860px] text-center"
        >
          <a
            href="https://sterlingoversight.us"
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-8 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/70 backdrop-blur-xs transition-colors duration-150 ease-in hover:border-white/15 hover:bg-white/5 hover:text-white"
          >
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">New</span>
            <span>Oh, please support my business.</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <motion.div
            variants={blurIn}
            transition={heroItemTransition}
            className="mx-auto w-full max-w-[min(100%,640px)] overflow-hidden rounded-[14px] border border-[#39FF14]/20 shadow-[0_0_40px_rgba(57,255,20,0.12)]"
          >
            <HeroTerminalBanner className="h-auto w-full" />
          </motion.div>

          <motion.div
            variants={blurIn}
            transition={heroItemTransition}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2"
          >
            {profileCredentials.map((credential) => (
              <span
                key={credential}
                className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[12.5px] leading-snug text-white backdrop-blur-xs"
              >
                {credential}
              </span>
            ))}
          </motion.div>

          <motion.div variants={blurIn} transition={heroItemTransition} className="relative z-20 mt-8 flex flex-col items-center justify-center text-center text-lg leading-[1.5] tracking-tight text-white/[0.68] sm:flex-row sm:gap-3 lg:text-xl">
            <span>Hello, I&apos;m {profile.fullName}</span>
            <img src={profile.portrait} alt="" className="h-[34px] w-[58px] rounded-full border border-white/10 object-cover shadow-border" />
            <span>a {profile.role}</span>
          </motion.div>

          <motion.div variants={blurIn} transition={heroItemTransition} className="z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex h-12 w-fit items-center justify-between overflow-hidden rounded-full border border-white/[0.10] bg-white/[0.10] py-1 pl-3 pr-1 text-base font-medium text-white/[0.90] backdrop-blur-xs transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-white/30 hover:bg-white hover:text-zinc-950 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]">
              Let&apos;s Connect
              <span className="ml-4 grid size-9 place-items-center rounded-full bg-white/[0.85] text-zinc-950 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                <ArrowUpRight className="size-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
            </a>
            <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-2 text-sm text-white/[0.42] transition-colors duration-150 hover:text-zinc-100 sm:ml-3">
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
