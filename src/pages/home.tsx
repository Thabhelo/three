import { motion } from "framer-motion";
import AnimatedMediaCard from "@/components/AnimatedMediaCard";
import BentoSection from "@/components/BentoSection";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { capabilities, profile } from "@/content/site";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { featuredWriting } from "@/config/featured-writing";
import { ExperienceSection, TestimonialsSection } from "@/pages/site-pages";

export default function Home() {
  return (
    <div className="site-shell">
      <Navbar />
      <Hero backgroundImage={profile.heroImage} />

      <main>
        <BentoSection />

        <section className="section-frame py-20">
          <div className="mb-10 max-w-3xl">
            <p className="font-label">Overview</p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold tracking-tight md:text-5xl">{profile.tagline}</h2>
            <p className="mt-4 text-muted-foreground leading-8">{profile.intro}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                viewport={{ once: true }}
                className="soft-card rounded-[14px] p-5"
              >
                <p className="font-mono text-xs text-white/45">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-editorial text-xl font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <ExperienceSection />

        <ProjectsShowcase />

        <section className="section-frame py-20">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-label">Writing</p>
              <h2 className="mt-3 font-editorial text-4xl font-semibold tracking-tight md:text-5xl">ML teaching, Medium essays, and technical notes.</h2>
              <p className="mt-4 text-muted-foreground">Practical guides from Medium: dev environments, tooling, and systems thinking.</p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200 transition-colors hover:text-white"
              >
                View all writing <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {featuredWriting.map((post) => (
                <a
                  key={post.slug}
                  href={post.href}
                  {...(post.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group"
                >
                  <AnimatedMediaCard
                    image={post.coverImage}
                    aspectRatio="aspect-[16/7]"
                    cursorParallax
                    overlay={
                      <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                        <p className="font-label">{post.readTime} · {post.channel}</p>
                        <h3 className="mt-3 font-editorial text-2xl font-semibold text-white">{post.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{post.excerpt}</p>
                      </div>
                    }
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </main>

      <Footer showReachOutCTA />
    </div>
  );
}
