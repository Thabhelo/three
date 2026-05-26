import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clipboard,
  Github,
  Rss,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import BookingEmbed from "@/components/BookingEmbed";
import ContactForm from "@/components/ContactForm";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";
import GalleryEditorGrid from "@/components/GalleryEditorGrid";
import AdminHintLink from "@/components/AdminHintLink";
import GitHubContributions from "@/components/GitHubContributions";
import Navbar from "@/components/Navbar";
import RotatingImageStack from "@/components/RotatingImageStack";
import { Button } from "@/components/ui/button";
import {
  capabilities,
  privacyNotice,
  links,
  testimonials,
} from "@/content/site";
import { getStaticCode, getStaticSections, useBlogPost, useMediumPosts, useNativePosts } from "@/hooks/use-blog-posts";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useGuestbookForm } from "@/hooks/use-guestbook";
import MarkdownContent from "@/components/MarkdownContent";
import MailingListSignup from "@/components/MailingListSignup";
import MediumPostsGrid from "@/components/MediumPostsGrid";
import { experiences } from "@/config/experience";
import { profile } from "@/config/profile";
import { projects } from "@/config/projects";
import { useGallery } from "@/hooks/use-gallery";
import { galleryImages as staticGalleryImages } from "@/content/site";
import { seedGalleryIfEmpty, galleryHasBeenInitialized } from "@/lib/gallery-service";

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
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
        <p className="font-label">{eyebrow}</p>
        <h1 className="mt-5 text-balance font-display text-5xl leading-tight tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </motion.div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-label">{eyebrow}</p>
      <h2 className="mt-3 font-editorial text-4xl leading-tight tracking-tight md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function AboutPage() {
  const projectImage = (slug: string) => projects.find((item) => item.slug === slug)?.image ?? "";
  const stackImages = [
    { title: "I Build", src: profile.portrait, alt: profile.fullName },
    { title: "I Research", src: projectImage("traffic-density-classification"), alt: "Singapore traffic density classification" },
    { title: "I Teach", src: projectImage("medical-image-segmentation"), alt: "3D medical image segmentation benchmark" },
    { title: "I Create", src: profile.heroImage, alt: "Abstract developer visual" },
  ];

  return (
    <PageShell>
      <section className="section-frame pb-24 pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="font-label">More about me</p>
            <h1 className="mt-5 text-balance font-display text-5xl leading-tight tracking-tight md:text-7xl">
              I&apos;m {profile.firstName}.
            </h1>
            <ul className="mt-6 max-w-2xl space-y-2.5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {profile.shortBio.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-white/50" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {capabilities.slice(0, 2).map((capability, index) => (
                <div key={capability.title} className="soft-card rounded-[14px] p-5">
                  <p className="font-mono text-xs text-white/45">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 text-lg font-semibold">{capability.title}</h2>
                </div>
              ))}
            </div>
          </motion.div>
          <RotatingImageStack images={stackImages} />
        </div>
      </section>
      <ExperienceSection />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="glass-panel rounded-[14px] p-8">
          <p className="font-label">Open source signal</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Building in public, learning in public.</h2>
          <GitHubContributions username={profile.githubUsername} />
        </div>
      </section>
    </PageShell>
  );
}

export function ProjectsPage() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = projects[featuredIndex] ?? projects[0];

  return (
    <PageShell>
      <PageHeader eyebrow="Work" title="Projects" description="ML systems, developer tools, and products I've built." />
      <section className="section-frame pb-24">
        <p className="mb-6 font-label text-center lg:text-left">Hover a project to preview it in the spotlight</p>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Link href={`/projects/${featured.slug}`} className="group soft-card relative min-h-[520px] overflow-hidden rounded-[14px] p-6 lg:sticky lg:top-28 lg:self-start">
            <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div
              key={featured.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-label">Featured / {String(featuredIndex + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-label text-white/45">{featured.eyebrow}</p>
              <h2 className="mt-4 max-w-lg font-display text-5xl leading-tight">{featured.title}</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">{featured.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {featured.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="ref-pill">{tag}</span>
                ))}
              </div>
            </motion.div>
            <div className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-[14px] border border-white/10 bg-zinc-950">
              {featured.image ? (
                <motion.img
                  key={featured.slug}
                  src={featured.image}
                  alt={featured.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[16/7] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="grid aspect-[16/7] place-items-center">
                  <span className="font-display text-7xl italic text-white/12">{featured.title.slice(0, 2)}</span>
                </div>
              )}
            </div>
          </Link>
          <div className="grid gap-3">
            {projects.map((project, index) => {
              const isFeatured = index === featuredIndex;

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setFeaturedIndex(index)}
                  onFocus={() => setFeaturedIndex(index)}
                  onTouchStart={() => setFeaturedIndex(index)}
                  className={`group grid gap-4 rounded-[14px] border border-dashed p-4 transition-all duration-300 hover:-translate-y-0.5 sm:grid-cols-[8rem_1fr_auto] ${
                    isFeatured
                      ? "border-white/25 bg-white/[0.06] shadow-[0_0_80px_rgba(124,58,237,0.12)]"
                      : "border-white/[0.10] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-[1rem] border border-white/10 bg-zinc-950">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <span className="font-display text-4xl italic text-white/14">{project.title.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-label">{String(index + 1).padStart(2, "0")} / {project.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
                  </div>
                  <ArrowUpRight className="size-5 self-start text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              );
            })}
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
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white">
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr]">
          <article>
            <p className="font-label">{project.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">{project.description}</p>
            <div className="mt-10 overflow-hidden rounded-[14px] border border-white/10 bg-zinc-950">
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
            <div className="soft-card rounded-[14px] p-6">
              {project.isStartup ? (
                <>
                  <p className="font-label">Details</p>
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
                </>
              ) : null}
              <p className="font-label">Stack</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full rounded-[10px]">
                      <Github className="mr-2 size-4" /> Repository
                    </Button>
                  </a>
                ) : null}
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-[10px]">
                      Live link <ArrowUpRight className="ml-2 size-4" />
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="soft-card rounded-[14px] p-6">
              <p className="font-label">Highlights</p>
              <ul className="mt-5 grid gap-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-white/70" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <Link href={`/projects/${previous.slug}`} className="soft-card rounded-[14px] p-5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mb-3 size-4" /> Previous: {previous.title}
          </Link>
          <Link href={`/projects/${next.slug}`} className="soft-card rounded-[14px] p-5 text-right text-muted-foreground hover:text-foreground">
            <ArrowRight className="mb-3 ml-auto size-4" /> Next: {next.title}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function BlogIndexPage() {
  const { posts: nativePosts, loading: nativeLoading } = useNativePosts();
  const { posts: mediumPosts, loading: mediumLoading } = useMediumPosts();
  const [blogMode, setBlogMode] = useState<"native" | "medium">("medium");
  const loading = nativeLoading || mediumLoading;

  return (
    <PageShell>
      <section className="section-frame pb-24 pt-8">
        <div className="flex justify-end">
          <AdminHintLink loginHref="/blog/admin" />
        </div>
        <div className="text-center">
          <p className="font-label">The pensive</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">
            Writing and notes.
          </h1>
          <div className="mx-auto mt-8 flex max-w-md items-center rounded-[10px] border border-dashed border-white/10 bg-white/[0.035] p-1">
            {[
              ["medium", "Medium"],
              ["native", "ML Blog"],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setBlogMode(mode as "native" | "medium")}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition-colors ${blogMode === mode ? "bg-white/[0.12] text-white" : "text-muted-foreground hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-y border-dashed border-white/[0.10] py-8">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-48 rounded-[14px] bg-white/5" />
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="h-40 rounded-[14px] bg-white/5" />
                <div className="h-40 rounded-[14px] bg-white/5" />
                <div className="h-40 rounded-[14px] bg-white/5" />
              </div>
            </div>
          ) : blogMode === "native" ? (
            <>
              {nativePosts.length === 0 ? (
                <p className="text-center text-muted-foreground">ML posts coming soon.</p>
              ) : (
                <>
                  {[nativePosts[0]].filter(Boolean).map((featured) => (
                    <Link key={featured.slug} href={`/blog/${featured.slug}`} className="group grid gap-6 rounded-[14px] border border-dashed border-white/[0.10] bg-white/[0.025] p-3 transition-all duration-300 hover:border-white/20 md:grid-cols-[1.1fr_0.9fr] md:p-4">
                      <div className="overflow-hidden rounded-[14px] bg-zinc-950">
                        <img src={featured.coverImage || featured.imageFallback || "/media/blog-highway-aerial.jpg"} alt="" className="aspect-[16/9] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-col justify-center p-3 md:p-6">
                        <p className="font-label">Featured / {featured.readTime} / {featured.date}</p>
                        <h2 className="mt-4 font-blog text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{featured.title}</h2>
                        <p className="mt-4 font-blog text-sm leading-7 text-muted-foreground">{featured.excerpt}</p>
                        <span className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-200">
                          Read post <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {nativePosts.slice(1).map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[14px] border border-dashed border-white/[0.10] bg-white/[0.025] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.045]">
                        <img src={post.coverImage || post.imageFallback || "/media/blog-highway-aerial.jpg"} alt="" className="aspect-[16/10] w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
                        <div className="p-5">
                          <p className="font-label">{post.readTime} / {post.date}</p>
                          <h2 className="mt-3 font-blog text-xl font-semibold leading-tight tracking-tight">{post.title}</h2>
                          <p className="mt-3 font-blog text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : mediumPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">Medium posts coming soon.</p>
          ) : (
            <MediumPostsGrid posts={mediumPosts} />
          )}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <MailingListSignup source="blog-index" />
        </div>
      </section>
    </PageShell>
  );
}

export function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const { post, loading, isMarkdown, staticPost } = useBlogPost(params?.slug);

  if (loading) {
    return (
      <PageShell>
        <article className="container mx-auto px-4 pb-24 pt-8 md:px-6">
          <div className="max-w-5xl animate-pulse space-y-6">
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="h-16 w-4/5 rounded bg-white/10" />
            <div className="h-24 w-full rounded bg-white/10" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
            </div>
          </div>
        </article>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <PageHeader eyebrow="Not found" title="Post missing." description="That blog post does not exist yet." />
      </PageShell>
    );
  }

  const readTime = "readTime" in post ? post.readTime : staticPost?.readingTime ?? "5 min read";
  const staticMarkdown = staticPost && "content" in staticPost ? staticPost.content : undefined;
  const markdownContent =
    isMarkdown && "content" in post && post.content
      ? post.content
      : staticMarkdown;

  return (
    <PageShell>
        <article className="section-frame pb-24 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white">
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
          <p className="font-label">{post.date} / {readTime}</p>
          <h1 className="mt-4 max-w-4xl font-blog text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 max-w-4xl font-blog text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
          {markdownContent ? (
            <div className="mt-10 border-t border-dashed border-white/10 pt-10">
              <MarkdownContent content={markdownContent} variant="blog" />
            </div>
          ) : (
            <>
              <div className="mt-10 grid max-w-4xl gap-6 border-t border-dashed border-white/10 pt-10 text-base leading-8 text-muted-foreground">
                {getStaticSections(staticPost).map((section) => (
                  <p key={section}>{section}</p>
                ))}
              </div>
              {getStaticCode(staticPost) && (
                <figure className="mt-10 max-w-4xl overflow-hidden rounded-[14px] border border-border bg-zinc-950">
                  <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-xs text-zinc-400">
                    <span>terminal</span>
                    <Clipboard className="size-4" />
                  </figcaption>
                  <pre className="overflow-x-auto p-5 font-mono text-sm text-zinc-100"><code>{getStaticCode(staticPost)}</code></pre>
                </figure>
              )}
            </>
          )}
          <div className="mt-12 max-w-4xl">
            <MailingListSignup source="blog-post" />
          </div>
        </div>
      </article>
    </PageShell>
  );
}

export function GuestbookPage() {
  const { handleSubmit, submitting, error, submitted } = useGuestbookForm();

  return (
    <PageShell>
      <PageHeader eyebrow="Guestbook" title="Guestbook" description="Leave your name, website, and message." />
      <section className="container mx-auto max-w-2xl px-4 pb-24 md:px-6">
        <div className="soft-card rounded-[14px] p-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span>Name</span>
              <input name="name" required maxLength={80} className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-white/25" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Website <span className="text-muted-foreground">(optional)</span></span>
              <input name="website" type="url" maxLength={2048} className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-white/25" placeholder="https://" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Email <span className="text-muted-foreground">(optional)</span></span>
              <input name="email" type="email" maxLength={254} className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-white/25" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Message</span>
              <textarea name="message" required maxLength={1000} rows={4} className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-white/25" />
            </label>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {submitted && <p className="text-sm text-emerald-300">Message sent.</p>}
            <Button type="submit" className="rounded-[10px]" disabled={submitting}>
              {submitting ? "Sending..." : "Submit"}
            </Button>
          </form>
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
          <a key={link.title} href={link.href} className="group soft-card rounded-[14px] p-6" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{link.title}</h2>
                <p className="mt-2 text-muted-foreground">{link.description}</p>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </a>
        ))}
      </section>
    </PageShell>
  );
}

export function GalleryPage() {
  const { user } = useAdminAuth();
  const { images, loading, refresh } = useGallery({ firebaseOnly: Boolean(user) });
  const [preparingEditor, setPreparingEditor] = useState(false);
  const seededRef = useRef(false);

  useEffect(() => {
    if (!user || seededRef.current) return;

    let cancelled = false;
    setPreparingEditor(true);

    void (async () => {
      try {
        const initialized = await galleryHasBeenInitialized();
        if (cancelled) return;

        if (!initialized) {
          await seedGalleryIfEmpty(
            staticGalleryImages.map((item, index) => ({
              id: item.id,
              src: item.src,
              label: item.label,
              order: index,
            })),
          );
        }

        seededRef.current = true;
        if (!cancelled) await refresh();
      } finally {
        if (!cancelled) setPreparingEditor(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, refresh]);

  const editorItems = images.map((item, index) => ({
    id: item.id,
    src: item.src,
    label: item.label,
    order: item.order ?? index,
  }));

  return (
    <PageShell>
      <section className="section-frame pb-14 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-label">Gallery</p>
            <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">Meaningful images.</h1>
            {user ? <p className="mt-3 text-sm text-muted-foreground">Drag to reorder. Tap X to delete. Label opens after upload; click any label to rename.</p> : null}
          </div>
          <AdminHintLink loginHref="/gallery/admin" />
        </div>
      </section>
      <section className="section-frame pb-24">
        {loading || preparingEditor ? (
          <p className="text-sm text-muted-foreground">Loading gallery...</p>
        ) : user ? (
          <GalleryEditorGrid items={editorItems} onChange={refresh} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((item, index) => (
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group soft-card overflow-hidden rounded-[14px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/75 via-black/35 to-transparent p-4">
                    <p className="font-label text-white/90">{item.label}</p>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

export function ContactPage() {
  const [contactMode, setContactMode] = useState<"call" | "message">("message");

  return (
    <PageShell>
      <section className="section-frame pb-24 pt-8">
        <div className="text-center">
          <p className="font-label">Contact</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Project, Role or <span className="gradient-text italic">Just a Hey?</span>
          </h1>
          <div className="mx-auto mt-8 flex max-w-md items-center rounded-[10px] border border-dashed border-white/10 bg-white/[0.035] p-1">
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
        <div className="mx-auto mt-8 max-w-4xl border-y border-dashed border-white/[0.10] py-8">
          {contactMode === "message" ? (
            <div className="mx-auto max-w-xl">
              <ContactForm />
            </div>
          ) : (
            <BookingEmbed />
          )}
        </div>
        <div className="py-20 text-center">
          <p className="font-label">My site</p>
          <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
            Explore, experiment<br />
            <span className="gradient-text italic">&amp;&amp; say hello</span>
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="soft-card rounded-[14px] p-6 text-center transition-colors hover:border-white/20">
            <p className="font-label">Resume</p>
            <h3 className="mt-3 text-xl font-semibold">PDF: experience and education</h3>
          </a>
          <Link href="/about" className="soft-card rounded-[14px] p-6 text-center transition-colors hover:border-white/20">
            <img src={profile.portrait} alt="" className="mx-auto mb-4 size-20 rounded-[14px] object-cover" />
            <p className="font-label">Behind the code</p>
            <h3 className="mt-3 text-xl font-semibold">Journey, skills & experience</h3>
          </Link>
          <Link href="/guestbook" className="soft-card rounded-[14px] p-6 text-center transition-colors hover:border-white/20">
            <img src="/media/guestbook-journal.jpg" alt="" className="mx-auto mb-4 aspect-[16/9] w-full rounded-[14px] object-cover opacity-80" />
            <p className="font-label">Guestbook</p>
            <h3 className="mt-3 text-xl font-semibold">Let me know you were here</h3>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy" description="What this site collects and why." />
      <section className="container mx-auto px-4 pb-24 md:px-6">
        <div className="soft-card max-w-3xl rounded-[14px] p-8">
          <p className="text-lg leading-9 text-muted-foreground">{privacyNotice}</p>
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
        <div className="soft-card max-w-2xl rounded-[14px] p-8">
          <Rss className="size-10 text-white/70" />
          <p className="mt-5 text-muted-foreground">For now, the blog index is available as a static shell.</p>
          <Link href="/blog">
            <Button className="mt-6 rounded-[10px]">
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
      <SectionIntro eyebrow="Experience" title="Some of the work I've done." description="A timeline of engineering, ML, cloud, and data work." />
      <div className="container mx-auto px-4 pb-24 md:px-6">
        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const expandedTestimonials = [
    ...testimonials,
    {
      text: "Thabhelo turns ambiguous technical ideas into calm, shippable systems. He asks the right questions and keeps the work moving.",
      name: "Dr. William Oswald, PhD",
      designation: "Senior Machine Learning Engineer",
      company: "Analytical AI",
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
  const beltItems = [...expandedTestimonials, ...expandedTestimonials];

  return (
    <section className="section-frame py-20">
      <div className="mb-12 text-center">
        <p className="font-label">Testimonials</p>
        <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
          Recommendations
        </h2>
      </div>
      <div className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="recommendations-belt flex w-max gap-4">
          {beltItems.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="soft-card w-[20rem] shrink-0 rounded-[14px] p-6 md:w-[24rem]"
            >
              <p className="font-display text-6xl leading-none text-white/25">&ldquo;</p>
              <p className="-mt-4 text-sm leading-7 text-muted-foreground">{testimonial.text}</p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="mt-1 text-xs text-white/55">{testimonial.company}</p>
                <p className="mt-1 text-xs text-muted-foreground">{testimonial.designation}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
