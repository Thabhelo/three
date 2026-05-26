import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedMediaCard from "@/components/AnimatedMediaCard";
import BentoSection from "@/components/BentoSection";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { capabilities, profile, uses } from "@/content/site";
import { nativePosts } from "@/config/blog";
import { projects } from "@/config/projects";
import { ExperienceSection, TestimonialsSection } from "@/pages/site-pages";

function CuratedWork() {
  return (
    <section className="section-frame py-20">
      <div className="mb-12 text-center">
        <p className="font-label">Case studies</p>
        <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
          Curated <span className="gradient-text italic">work</span>
        </h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.64fr_0.36fr]">
        <div className="grid gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block"
            >
              <AnimatedMediaCard
                image={project.image}
                title={project.title}
                subtitle={project.eyebrow}
                aspectRatio="aspect-[16/10]"
                cursorParallax
                overlay={
                  <div className="absolute right-5 top-5 rounded-full border border-dashed border-white/15 bg-black/30 px-3 py-1 font-label text-white/80 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                }
              />
            </a>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="soft-card rounded-[14px] p-6">
            <p className="font-label">Selected focus</p>
            <h3 className="mt-4 font-editorial text-3xl leading-tight">Useful systems over decorative demos.</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              These projects span clinical ML, computer vision, contract intelligence, audio tooling, and community infrastructure. The shared thread is practical delivery: clean data, measured tradeoffs, and products that can survive contact with real users.
            </p>
            <ul className="mt-6 grid gap-3">
              {["Accuracy and latency tradeoffs", "Human-readable tooling", "Cloud and offline-first constraints", "Open-source learning loops"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="h-px w-5 bg-white/55" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {projects[0].tags.slice(0, 8).map((tag) => (
                <span key={tag} className="ref-pill">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
      <Navbar />
      <Hero backgroundImage={profile.heroImage} />

      <main>
        <BentoSection />

        <section className="section-frame py-20">
          <div className="mb-10 max-w-3xl">
            <p className="font-label">Overview</p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold tracking-tight md:text-5xl">A personal site with the full portfolio shape.</h2>
            <p className="mt-4 text-muted-foreground">
              The site now mirrors the reference structure: home, about, projects, case studies, blog, guestbook, links, uses, bucket list, contact, legal, attribution, RSS shell, and PWA/SEO-ready metadata work.
            </p>
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
                <img src={capability.icon} alt="" className="mb-6 size-11" />
                <h3 className="font-editorial text-xl font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <ExperienceSection />

        <CuratedWork />

        <section className="section-frame py-20">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-label">Writing and stack</p>
              <h2 className="mt-3 font-editorial text-4xl font-semibold tracking-tight md:text-5xl">ML teaching, Medium essays, and stack notes.</h2>
              <p className="mt-4 text-muted-foreground">Machine learning posts live on the native blog. Broader essays link out to Medium.</p>
            </div>
            <div className="grid gap-4">
              {nativePosts.map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <AnimatedMediaCard
                    image={post.imageFallback}
                    aspectRatio="aspect-[16/7]"
                    cursorParallax
                    overlay={
                      <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                        <p className="font-label">{post.readingTime}</p>
                        <h3 className="mt-3 font-editorial text-2xl font-semibold text-white">{post.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/60">{post.excerpt}</p>
                      </div>
                    }
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame py-20">
          <div className="grid gap-5 md:grid-cols-4">
            {uses.slice(0, 4).map((item) => (
              <div key={item.name} className="group soft-card rounded-[14px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <img src={item.icon} alt="" className="size-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-5 font-editorial text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSection />

        <section className="section-frame py-20">
          <div className="glass-panel overflow-hidden rounded-[18px] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-center">
              <div>
                <p className="font-label">Contact</p>
                <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">Want to compare notes?</h2>
                <p className="mt-5 max-w-2xl text-muted-foreground">Reach out for applied ML, cloud systems, developer tools, community projects, or anything weird and useful.</p>
              </div>
              <div className="grid gap-3">
                <a href="/contact">
                  <Button className="h-12 w-full rounded-full">
                    Open contact page <ArrowUpRight className="ml-2 size-4" />
                  </Button>
                </a>
                <a href={`mailto:${profile.email}`}>
                  <Button variant="outline" className="h-12 w-full rounded-full border-white/15 bg-white/[0.045]">
                    Email directly
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
