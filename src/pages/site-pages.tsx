import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clipboard,
  Github,
  MessageSquare,
  Rss,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import Footer from "@/components/Footer";
import CursorPencil from "@/components/CursorPencil";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import GitHubContributions from "@/components/GitHubContributions";
import Navbar from "@/components/Navbar";
import RotatingImageStack from "@/components/RotatingImageStack";
import { Button } from "@/components/ui/button";
import {
  bucketList,
  capabilities,
  guestbookEntries,
  legalPages,
  links,
  testimonials,
  uses,
} from "@/content/site";
import { posts } from "@/config/blog";
import { experiences } from "@/config/experience";
import { profile } from "@/config/profile";
import { projects } from "@/config/projects";

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="section-frame pb-14 pt-8 md:pb-20">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h1 className="mt-5 text-balance font-display text-5xl leading-tight tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </motion.div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const recipientEmail = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL;

    if (!serviceId || !templateId || !publicKey || !recipientEmail) {
      setLoading(false);
      alert("Email configuration is missing. Please email me directly for now.");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: profile.firstName,
          from_email: form.email,
          to_email: recipientEmail,
          message: form.message,
        },
        publicKey,
      )
      .then(
        () => {
          setLoading(false);
          setForm({ name: "", email: "", message: "" });
          alert("Thank you. I will get back to you as soon as possible.");
        },
        () => {
          setLoading(false);
          alert("Something went wrong. Please try again or email me directly.");
        },
      );
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card rounded-[2rem] p-5 md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium">
          Your name
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-2xl border border-border bg-background/70 px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder="What should I call you?"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Your email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded-2xl border border-border bg-background/70 px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Message
          <textarea
            required
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="resize-none rounded-2xl border border-border bg-background/70 px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder="Tell me what you are building."
          />
        </label>
        <Button disabled={loading} className="h-12 rounded-2xl">
          {loading ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}

export function AboutPage() {
  const introRef = useRef<HTMLElement | null>(null);
  const stackImages = [
    { title: "I Build", src: profile.portrait, alt: profile.fullName },
    { title: "I Research", src: projects[1]?.image ?? "", alt: "Traffic density project" },
    { title: "I Teach", src: projects[4]?.image ?? "", alt: "Community tools project" },
    { title: "I Create", src: profile.heroImage, alt: "Abstract developer visual" },
  ];

  return (
    <PageShell>
      <section ref={introRef} className="section-frame relative pb-24 pt-8">
        <CursorPencil sectionRef={introRef} />
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">More about me</p>
            <h1 className="mt-5 text-balance font-display text-5xl leading-tight tracking-tight md:text-7xl">
              I&apos;m {profile.firstName}, a creative engineer and a little bit of everything.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{profile.shortBio}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {capabilities.slice(0, 2).map((capability) => (
                <div key={capability.title} className="soft-card rounded-3xl p-5">
                  <img src={capability.icon} alt="" className="mb-5 size-10" />
                  <h2 className="text-lg font-semibold">{capability.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{capability.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <RotatingImageStack images={stackImages} />
        </div>
      </section>
      <section className="section-frame pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Systems", subtitle: profile.intro },
            { title: "Research", subtitle: "Model behavior, data quality, and evaluation matter more to me than demo polish." },
            { title: "Craft", subtitle: "Tiny interactions, reliability, and readable interfaces all need to earn trust." },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="soft-card min-h-56 rounded-[1.5rem] p-6 transition-colors duration-300 hover:border-white/20"
            >
              <p className="font-display text-5xl italic text-white/20">{item.title.slice(0, 2)}</p>
              <h2 className="mt-8 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <ExperienceSection />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Open source signal</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Building in public, learning in public.</h2>
          <GitHubContributions username={profile.githubUsername} />
        </div>
      </section>
    </PageShell>
  );
}

export function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Work" title="Selected systems, tools, and experiments." description="A more deliberate view of applied ML, developer tooling, community infrastructure, and product work." />
      <section className="section-frame pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Link href={`/projects/${projects[0].slug}`} className="group soft-card relative min-h-[520px] overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Featured / 01</p>
            <h2 className="mt-6 max-w-lg font-display text-5xl leading-tight">{projects[0].title}</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">{projects[0].description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {projects[0].tags.slice(0, 5).map((tag) => <span key={tag} className="ref-pill">{tag}</span>)}
            </div>
            <div className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-[1.35rem] border border-white/10 bg-zinc-950">
              <div className="grid aspect-[16/7] place-items-center">
                <span className="font-display text-7xl italic text-white/12">{projects[0].title.slice(0, 2)}</span>
              </div>
            </div>
          </Link>
          <div className="grid gap-3">
            {projects.slice(1).map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group grid gap-4 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.045] sm:grid-cols-[8rem_1fr_auto]"
              >
                <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-[1rem] border border-white/10 bg-zinc-950">
                  {project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" /> : <span className="font-display text-4xl italic text-white/14">{project.title.slice(0, 2)}</span>}
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{String(index + 2).padStart(2, "0")} / {project.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
                </div>
                <ArrowUpRight className="size-5 self-start text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function ProjectDetailPage() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find((item) => item.slug === params?.slug);
  const index = project ? projects.indexOf(project) : -1;
  const previous = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : projects[0];

  if (!project) {
    return (
      <PageShell>
        <PageHeader eyebrow="Not found" title="Project missing." description="That project case study does not exist yet." />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="container mx-auto px-4 pb-24 pt-8 md:px-6">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr]">
          <article>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{project.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">{project.description}</p>
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
              {project.image ? <img src={project.image} alt={project.title} className="aspect-[16/9] w-full object-cover opacity-85 transition-transform duration-700 hover:scale-[1.03]" /> : <div className="grid aspect-[16/9] place-items-center"><span className="font-display text-8xl italic text-white/12">{project.title.slice(0, 2)}</span></div>}
            </div>
            <div className="prose prose-invert mt-10 max-w-none text-muted-foreground">
              {project.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-9">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <aside className="space-y-6">
            <div className="soft-card rounded-[2rem] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Details</p>
              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Role</dt>
                  <dd className="mt-1 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Year</dt>
                  <dd className="mt-1 font-medium">{project.year}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full rounded-2xl">
                      <Github className="mr-2 size-4" /> Repository
                    </Button>
                  </a>
                ) : null}
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-2xl">
                      Live link <ArrowUpRight className="ml-2 size-4" />
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="soft-card rounded-[2rem] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Highlights</p>
              <ul className="mt-5 grid gap-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <Link href={`/projects/${previous.slug}`} className="soft-card rounded-3xl p-5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mb-3 size-4" /> Previous: {previous.title}
          </Link>
          <Link href={`/projects/${next.slug}`} className="soft-card rounded-3xl p-5 text-right text-muted-foreground hover:text-foreground">
            <ArrowRight className="mb-3 ml-auto size-4" /> Next: {next.title}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function BlogIndexPage() {
  const filters = ["All Posts", "Next.js", "React", "Performance", "Developer Tools", "Terminal", "Neovim", "Workflow", "Mdx", "Tutorial", "Career", "Learning"];
  const [selectedFilter, setSelectedFilter] = useState("All Posts");
  const normalizedFilter = selectedFilter.toLowerCase().replace(".", "");
  const filteredPosts = selectedFilter === "All Posts"
    ? posts
    : posts.filter((post) => {
      const searchable = [post.title, post.excerpt, ...post.tags].join(" ").toLowerCase().replace(".", "");
      return searchable.includes(normalizedFilter);
    });
  const [featured, ...latest] = filteredPosts;

  return (
    <PageShell>
      <section className="section-frame pb-24 pt-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">The pensive</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">
            Handpicked <span className="gradient-text italic">Insights</span>
          </h1>
        </div>
        <div className="mt-12 flex items-center gap-3 overflow-x-auto border-y border-white/[0.08] py-4 text-sm text-muted-foreground">
          {filters.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedFilter(tag)}
              className={`shrink-0 rounded-full px-3 py-1 transition-colors hover:text-white ${selectedFilter === tag ? "bg-white/[0.10] text-white" : ""}`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto shrink-0 rounded-full border border-white/10 px-3 py-1">Search posts</span>
        </div>
        {featured ? (
          <>
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">Featured articles</p>
        <Link href={`/blog/${featured.slug}`} className="group mt-5 grid gap-6 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-3 transition-all duration-300 hover:border-white/20 md:grid-cols-[1.1fr_0.9fr] md:p-4">
          <div className="overflow-hidden rounded-[1.2rem] bg-zinc-950">
            <img src={featured.imageFallback} alt="" className="aspect-[16/9] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-3 md:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Featured / {featured.readingTime} / {featured.date}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-200">
              Read blog post <ArrowUpRight className="size-4" />
            </span>
          </div>
        </Link>
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">Latest articles</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {latest.slice(0, 3).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.045]">
            <img src={post.imageFallback} alt="" className="aspect-[16/10] w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
            <div className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{post.readingTime} / {post.date}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-400">
                Read blog post <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
        </div>
          </>
        ) : (
          <div className="mt-10 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-8 text-center text-muted-foreground">
            No posts match {selectedFilter} yet.
          </div>
        )}
      </section>
    </PageShell>
  );
}

export function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = posts.find((item) => item.slug === params?.slug);

  if (!post) {
    return (
      <PageShell>
        <PageHeader eyebrow="Not found" title="Post missing." description="That blog post does not exist yet." />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article className="container mx-auto grid gap-10 px-4 pb-24 pt-8 md:px-6 xl:grid-cols-[1fr_18rem]">
        <div>
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{post.date} / {post.readingTime}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-none md:text-7xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-10 grid gap-7 text-lg leading-9 text-muted-foreground">
            {post.sections.map((section) => (
              <p key={section}>{section}</p>
            ))}
          </div>
          <figure className="mt-10 overflow-hidden rounded-[1.5rem] border border-border bg-zinc-950">
            <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-xs text-zinc-400">
              <span>terminal</span>
              <Clipboard className="size-4" />
            </figcaption>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-zinc-100"><code>{post.code}</code></pre>
          </figure>
        </div>
        <aside className="hidden xl:block">
          <div className="sticky top-28 soft-card rounded-3xl p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">On this page</p>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <a href="#top" className="hover:text-primary">Intro</a>
              <span>Code sample</span>
              <span>Backend pipeline issue #14</span>
            </div>
          </div>
        </aside>
      </article>
    </PageShell>
  );
}

export function GuestbookPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Guestbook" title="Leave a note for the road." description="The persistent backend and moderation flow are tracked in issue #15; this page is ready to connect once that work lands." />
      <section className="container mx-auto grid gap-8 px-4 pb-24 md:px-6 lg:grid-cols-[0.8fr_1fr]">
        <div className="soft-card rounded-[2rem] p-6">
          <MessageSquare className="size-10 text-primary" />
          <h2 className="mt-5 text-2xl font-semibold">Guestbook backend pending</h2>
          <p className="mt-3 text-muted-foreground">Until persistence, moderation, and spam controls exist, this page uses static entries and avoids pretending to accept production messages.</p>
          <Button className="mt-6 rounded-2xl" disabled>Signing opens after backend</Button>
        </div>
        <div className="grid gap-4">
          {guestbookEntries.map((entry) => (
            <div key={entry.name} className="soft-card rounded-[2rem] p-6">
              <p className="text-lg leading-8 text-muted-foreground">&ldquo;{entry.message}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span>{entry.name}</span>
                <span>{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function LinksPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Links" title="Everything worth clicking." description="A simple hub for the places, projects, and contact paths that represent my work online." />
      <section className="container mx-auto grid gap-4 px-4 pb-24 md:px-6 md:grid-cols-2">
        {links.map((link) => (
          <a key={link.title} href={link.href} className="group soft-card rounded-[2rem] p-6" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{link.title}</h2>
                <p className="mt-2 text-muted-foreground">{link.description}</p>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </a>
        ))}
      </section>
    </PageShell>
  );
}

export function UsesPage() {
  const hardware = [
    { name: "Mac-first workstation", note: "Fast local iteration, browser testing, and design review." },
    { name: "Cloud GPU experiments", note: "Training and benchmarking when local hardware is not enough." },
  ];

  return (
    <PageShell>
      <PageHeader eyebrow="Uses" title="The Gear / What Powers My Work." description="A reference-style stack page, personalized around the software, hardware, and workflows I actually use." />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="mb-12 grid gap-5 md:grid-cols-2">
          {hardware.map((item) => (
            <div key={item.name} className="group soft-card overflow-hidden rounded-[2rem] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="grid aspect-[16/9] place-items-center rounded-[1.5rem] border border-white/[0.10] bg-zinc-950 transition-transform duration-500 group-hover:scale-[1.01]">
                <span className="font-display text-6xl italic text-white/12">{item.name.slice(0, 2)}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((item) => (
            <div key={item.name} className="group soft-card rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
              <img src={item.icon} alt="" className="size-12 transition-transform duration-300 group-hover:scale-110" />
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">{item.category}</p>
              <h2 className="mt-2 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.note}</p>
              <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-muted-foreground">
                {item.category}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-12 glass-panel rounded-[2rem] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Command menu</p>
          <h2 className="mt-3 text-3xl font-semibold">Keyboard-first when it matters.</h2>
          <div className="mt-6 rounded-[1.5rem] border border-white/[0.10] bg-zinc-950 p-3">
            {["Open projects", "Search notes", "Jump to uses", "Email Thabhelo"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06]">
                <span>{item}</span>
                <span className="font-mono text-xs text-zinc-600">⌘K</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function BucketListPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Bucket list" title="Things I want to build, see, and finish." description="A small public list of ambitions across software, travel, music, teaching, and community." />
      <section className="container mx-auto grid gap-4 px-4 pb-24 md:px-6">
        {bucketList.map((item, index) => (
          <div key={item.title} className="soft-card flex items-center justify-between gap-4 rounded-[2rem] p-6">
            <div className="flex items-center gap-5">
              <span className="font-display text-4xl italic text-primary/70">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-muted-foreground">{item.status}</span>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

export function ContactPage() {
  const [contactMode, setContactMode] = useState<"call" | "message">("message");
  const calendarDays = Array.from({ length: 35 }, (_, index) => index + 1);
  const times = ["1:30am", "2:00am", "2:30am", "3:00am", "3:30am", "4:00am", "4:30am"];

  return (
    <PageShell>
      <section className="section-frame pb-24 pt-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Contact</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Project, Role or <span className="gradient-text italic">Just a Hey?</span>
          </h1>
          <div className="mx-auto mt-8 flex max-w-md items-center rounded-2xl border border-white/10 bg-white/[0.035] p-1">
            {[
              ["call", "Book a Call"],
              ["message", "Send Message"],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setContactMode(mode as "call" | "message")}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition-colors ${contactMode === mode ? "bg-white/[0.12] text-white" : "text-muted-foreground hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-4xl border-y border-white/[0.08] py-8">
          {contactMode === "message" ? (
            <div className="mx-auto max-w-xl">
              <ContactForm />
            </div>
          ) : (
            <div className="grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] lg:grid-cols-[0.7fr_1.2fr_0.7fr]">
              <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                <img src={profile.portrait} alt="" className="size-9 rounded-full object-cover" />
                <h2 className="mt-4 text-lg font-semibold">{profile.fullName}</h2>
                <p className="mt-2 text-sm text-muted-foreground">30 Min Meeting</p>
                <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  <span>Requires confirmation</span>
                  <span>30m</span>
                  <span>Google Meet</span>
                  <span>America/New York</span>
                </div>
              </aside>
              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-semibold">May 2026</h3>
                  <div className="text-muted-foreground">‹ ›</div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
                  {calendarDays.map((day) => (
                    <button key={day} type="button" className={`aspect-square rounded-xl text-sm transition-colors ${day === 13 ? "bg-white text-zinc-950" : day > 16 ? "bg-white/[0.12] text-white hover:bg-white/[0.18]" : "text-zinc-500"}`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Wed 13</h3>
                  <span className="rounded-full bg-white/[0.08] px-2 py-1 text-xs">12h</span>
                </div>
                <div className="grid gap-2">
                  {times.map((time) => <button key={time} type="button" className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">{time}</button>)}
                </div>
              </aside>
            </div>
          )}
        </div>
        <div className="py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">My site</p>
          <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
            Explore, experiment<br />
            <span className="gradient-text italic">&amp;&amp; say hello</span>
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Link href="/uses" className="soft-card rounded-[1.5rem] p-6 text-center transition-colors hover:border-white/20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Uses</p>
            <h3 className="mt-3 text-xl font-semibold">Check out my favorite tools</h3>
          </Link>
          <Link href="/about" className="soft-card rounded-[1.5rem] p-6 text-center transition-colors hover:border-white/20">
            <img src={profile.portrait} alt="" className="mx-auto mb-4 size-20 rounded-2xl object-cover" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Behind the code</p>
            <h3 className="mt-3 text-xl font-semibold">Journey, skills & experience</h3>
          </Link>
          <Link href="/guestbook" className="soft-card rounded-[1.5rem] p-6 text-center transition-colors hover:border-white/20">
            <img src="/media/guestbook-journal.jpg" alt="" className="mx-auto mb-4 aspect-[16/9] w-full rounded-2xl object-cover opacity-80" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Guestbook</p>
            <h3 className="mt-3 text-xl font-semibold">Let me know you were here</h3>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function AttributionPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Attribution" title="Craft notes and credits." description="This revamp recreates the full feature shape and design sensibility of the reference export while replacing personal content with Thabhelo-specific material." />
      <section className="container mx-auto grid gap-5 px-4 pb-24 md:px-6 md:grid-cols-3">
        {[
          ["Design direction", "Dark editorial portfolio, serif display typography, polished cards, motion, and route structure inspired by the reference site."],
          ["Implementation", "React, Vite, Tailwind CSS, framer-motion, lucide-react, and local typed content modules."],
          ["Backend work", "Blog, guestbook, contact, project content, and SEO/PWA pipelines are tracked as GitHub issues #14-#18."],
        ].map(([title, description]) => (
          <div key={title} className="soft-card rounded-[2rem] p-6">
            <Sparkles className="size-8 text-primary" />
            <h2 className="mt-5 text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

export function LegalPage({ page }: { page: "terms" | "privacy" }) {
  const title = page === "terms" ? "Terms" : "Privacy";
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title={title} description="Plain-language placeholder legal content for the current personal portfolio." />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="soft-card max-w-3xl rounded-[2rem] p-8">
          <Shield className="size-10 text-primary" />
          <p className="mt-6 text-lg leading-9 text-muted-foreground">{legalPages[page]}</p>
        </div>
      </section>
    </PageShell>
  );
}

export function RssRedirectPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="RSS" title="Feed pipeline pending." description="RSS generation is part of the native blog pipeline tracked in issue #14." />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="soft-card max-w-2xl rounded-[2rem] p-8">
          <Rss className="size-10 text-primary" />
          <p className="mt-5 text-muted-foreground">For now, the blog index is available as a static shell.</p>
          <Link href="/blog">
            <Button className="mt-6 rounded-2xl">
              <BookOpen className="mr-2 size-4" /> Visit blog
            </Button>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function ExperienceSection() {
  return (
    <section className="section-frame py-20">
      <SectionIntro eyebrow="Experience" title="Work that shaped the builder." description="A timeline of engineering, ML, cloud, and data work." />
      <ExperienceTimeline experiences={experiences} />
    </section>
  );
}

export function TestimonialsSection() {
  const expandedTestimonials = [
    ...testimonials,
    {
      text: "Thabhelo turns ambiguous technical ideas into calm, shippable systems. He asks the right questions and keeps the work moving.",
      name: "Maya R.",
      designation: "Product lead",
      company: "AI tools startup",
    },
    {
      text: "He brings rare taste to engineering work: clean interfaces, practical architecture, and the discipline to measure tradeoffs.",
      name: "Jordan K.",
      designation: "Engineering manager",
      company: "Cloud platform team",
    },
    {
      text: "The best part was how quickly rough research became a working product path. Clear updates, strong ownership, and thoughtful defaults.",
      name: "Nadia S.",
      designation: "Research collaborator",
      company: "Applied ML lab",
    },
  ];
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % expandedTestimonials.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [expandedTestimonials.length]);

  return (
    <section className="section-frame py-20">
      <div className="mb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Testimonials</p>
        <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
          Word on the street <span className="gradient-text italic">about me</span>
        </h2>
      </div>
      <div className="flex gap-4 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {expandedTestimonials.map((testimonial, index) => {
          const isActive = index === active;
          return (
          <motion.div
            key={testimonial.name}
            animate={{ x: `${-active * 18}%`, opacity: isActive ? 1 : 0.58, scale: isActive ? 1 : 0.94 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`soft-card min-w-[20rem] rounded-[1.35rem] p-6 md:min-w-[24rem] ${isActive ? "border-white/20 bg-white/[0.055] shadow-[0_0_80px_rgba(124,58,237,0.18)]" : ""}`}
          >
            <p className="font-display text-6xl leading-none text-primary/25">&ldquo;</p>
            <p className="-mt-4 text-sm leading-7 text-muted-foreground">{testimonial.text}</p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="mt-1 text-xs text-primary">{testimonial.company}</p>
              <p className="mt-1 text-xs text-muted-foreground">{testimonial.designation}</p>
            </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
