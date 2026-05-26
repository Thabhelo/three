import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Check,
  Copy,
  Edit,
  Eye,
  FileText,
  Image as ImageIcon,
  Lock,
  LogOut,
  Trash2,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import MarkdownContent from "@/components/MarkdownContent";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  uploadBlog,
  uploadImage,
  type Blog,
  type BlogMetadata,
} from "@/lib/blog-service";
import { nativePosts } from "@/config/blog";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { signOutAdmin } from "@/lib/admin-auth";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { blogSnippets, insertIntoEditor } from "@/lib/blog-markdown";

export default function BlogAdminPage() {
  const { user, checkingAuth } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState<Array<{ name: string; url: string; copied: boolean }>>([]);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [existingBlogs, setExistingBlogs] = useState<BlogMetadata[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loadingEditSlug, setLoadingEditSlug] = useState<string | null>(null);
  const [showWritingGuide, setShowWritingGuide] = useState(true);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (user) void loadExistingBlogs();
  }, [user]);

  useEffect(() => {
    if (title && !slug && !editingSlug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  }, [title, slug, editingSlug]);

  useEffect(() => {
    if (content && !readTime) {
      const wordCount = content.split(/\s+/).length;
      setReadTime(`${Math.max(1, Math.ceil(wordCount / 200))} min read`);
    }
  }, [content, readTime]);

  async function loadExistingBlogs() {
    const blogs = await getAllBlogs();
    setExistingBlogs(blogs);
  }

  async function handleGoogleLogin() {
    if (!auth || !googleProvider) return;
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOutAdmin();
    setExistingBlogs([]);
  }

  const handleImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const results = await Promise.all(
        Array.from(files).map(async (file) => {
          const imageName = `${Date.now()}-${file.name}`;
          const url = await uploadImage(file, imageName);
          return url ? { name: file.name, url, copied: false } : null;
        }),
      );

      const valid = results.filter((item): item is { name: string; url: string; copied: boolean } => item !== null);
      if (!valid.length) throw new Error("Upload failed");

      setUploadedImages((prev) => [...prev, ...valid]);
      setSuccessMessage(`Uploaded ${valid.length} image(s)`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to upload images. Check Firebase Storage rules and auth.");
    } finally {
      setUploading(false);
    }
  }, []);

  function insertSnippet(snippet: string) {
    insertIntoEditor(content, snippet, contentRef.current, setContent);
  }

  function insertUploadedImage(img: { name: string; url: string }, asCover = false) {
    const alt = img.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    if (asCover) {
      setCoverImage(img.url);
      setSuccessMessage("Cover image set.");
      setTimeout(() => setSuccessMessage(""), 2500);
      return;
    }

    insertSnippet(`\n\n![${alt}](${img.url})\n\n`);
    setSuccessMessage("Image inserted into post.");
    setTimeout(() => setSuccessMessage(""), 2500);
  }

  function resetForm() {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setTags("");
    setReadTime("");
    setCoverImage("");
    setContent("");
    setUploadedImages([]);
    setEditingSlug(null);
  }

  function staticBlogForSlug(postSlug: string): Blog | null {
    const staticPost = nativePosts.find((post) => post.slug === postSlug);
    if (!staticPost || !("content" in staticPost) || !staticPost.content) return null;

    return {
      slug: staticPost.slug,
      title: staticPost.title,
      excerpt: staticPost.excerpt,
      date: staticPost.date,
      readTime: staticPost.readingTime,
      coverImage: staticPost.coverImage,
      tags: staticPost.tags,
      content: staticPost.content,
    };
  }

  function populateEditor(blog: Blog, postSlug: string) {
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setTags(blog.tags?.join(", ") ?? "");
    setReadTime(blog.readTime);
    setCoverImage(blog.coverImage ?? "");
    setContent(blog.content);
    setUploadedImages([]);
    setEditingSlug(postSlug);
    setShowPreview(false);
    document.getElementById("blog-editor-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleEdit(postSlug: string) {
    setError("");
    setSuccessMessage("");

    const staticBlog = staticBlogForSlug(postSlug);
    if (staticBlog) {
      populateEditor(staticBlog, postSlug);

      void getBlogBySlug(postSlug, { bustCache: true }).then((remote) => {
        if (!remote?.content?.trim()) return;
        setTitle(remote.title);
        setExcerpt(remote.excerpt);
        setTags(remote.tags?.join(", ") ?? "");
        setReadTime(remote.readTime);
        setCoverImage(remote.coverImage ?? "");
        setContent(remote.content);
      });

      return;
    }

    setLoadingEditSlug(postSlug);

    try {
      const blog = await getBlogBySlug(postSlug, { bustCache: true });
      if (!blog) {
        setError(`Could not load "${postSlug}" for editing. Check Storage rules and try again.`);
        return;
      }

      populateEditor(blog, postSlug);
    } catch (err) {
      console.error("Edit load error:", err);
      setError(`Failed to open "${postSlug}" for editing.`);
    } finally {
      setLoadingEditSlug(null);
    }
  }

  async function handlePublish() {
    if (!title || !slug || !content) {
      setError("Title, slug, and content are required.");
      return;
    }

    setPublishing(true);
    setError("");

    try {
      const success = await uploadBlog(slug, content, {
        title,
        excerpt,
        date: new Date().toISOString().split("T")[0],
        readTime: readTime || "5 min read",
        coverImage: coverImage || uploadedImages[0]?.url,
        tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      });

      if (!success) throw new Error("Upload failed");

      setSuccessMessage(editingSlug ? "Post updated." : "Post published.");
      setTimeout(() => setSuccessMessage(""), 3000);
      resetForm();
      await loadExistingBlogs();
    } catch (err) {
      console.error(err);
      setError("Failed to publish. Sign in and confirm Storage is enabled.");
    } finally {
      setPublishing(false);
    }
  }

  async function handleDelete(postSlug: string) {
    if (!confirm(`Delete "${postSlug}"?`)) return;

    const success = await deleteBlog(postSlug);
    if (success) {
      setSuccessMessage("Post deleted.");
      setTimeout(() => setSuccessMessage(""), 3000);
      await loadExistingBlogs();
    }
  }

  function fixLatexDelimiters() {
    let fixed = content;
    let changes = 0;

    const patterns: Array<[RegExp, (inner: string) => string]> = [
      [/\\\[([\s\S]*?)\\\]/g, (inner) => `$$${inner}$$`],
      [/\\\(([\s\S]*?)\\\)/g, (inner) => `$${inner}$`],
    ];

    for (const [pattern, replacer] of patterns) {
      const matches = fixed.match(pattern);
      if (matches) {
        changes += matches.length;
        fixed = fixed.replace(pattern, (_, inner: string) => replacer(inner));
      }
    }

    if (changes) {
      setContent(fixed);
      setSuccessMessage(`Fixed ${changes} LaTeX delimiter issue(s).`);
    } else {
      setSuccessMessage("No LaTeX delimiter issues found.");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 pb-24 pt-32 md:px-6">
          <div className="soft-card mx-auto max-w-lg rounded-[14px] p-8 text-center">
            <AlertCircle className="mx-auto size-10 text-white/60" />
            <h1 className="mt-4 text-2xl font-semibold">Firebase not configured</h1>
            <p className="mt-3 text-muted-foreground">
              Add the VITE_FIREBASE_* variables from .env.example, enable Storage in the Firebase console, then reload.
            </p>
            <Link href="/blog">
              <Button className="mt-6 rounded-[10px]">Back to blog</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex min-h-[80vh] items-center justify-center px-4 pb-24 pt-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="soft-card rounded-[14px] p-8">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full border border-dashed border-white/15 p-3">
                  <Lock className="size-6 text-white/70" />
                </div>
              </div>
              <h1 className="text-center text-2xl font-semibold">Blog admin</h1>
              <p className="mt-2 text-center text-sm text-muted-foreground">Sign in with your Firebase admin account.</p>
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-white/25"
                  disabled={loading}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-white/25"
                  disabled={loading}
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" className="w-full rounded-[10px]" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in with email"}
                </Button>
                <Button type="button" variant="outline" className="w-full rounded-[10px]" disabled={loading} onClick={() => void handleGoogleLogin()}>
                  Sign in with Google
                </Button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-24 z-50 flex items-center gap-2 rounded-[10px] border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200"
          >
            <Check className="size-4" /> {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pb-24 pt-28 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-label">Editor</p>
            <h1 className="mt-2 text-3xl font-semibold">ML blog admin</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-[10px] border border-dashed border-white/10 px-4 py-2 text-sm text-muted-foreground hover:text-white"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-[10px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div id="blog-editor-panel" className="soft-card space-y-4 rounded-[14px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="size-5" /> {editingSlug ? "Edit post" : "New post"}
              </h2>
              {editingSlug && (
                <button type="button" onClick={resetForm} className="text-sm text-muted-foreground hover:text-white">
                  <X className="inline size-4" /> Cancel
                </button>
              )}
            </div>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="admin-input" />
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug"
              disabled={Boolean(editingSlug)}
              className="admin-input disabled:opacity-50"
            />
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Excerpt" rows={3} className="admin-input" />
            <div className="grid gap-4 md:grid-cols-2">
              <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" className="admin-input" />
              <input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="Read time" className="admin-input" />
            </div>
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover image URL (or use Set cover on an upload)" className="admin-input" />

            <div className="rounded-[10px] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-zinc-200">Write in Markdown — not HTML</p>
                <button
                  type="button"
                  onClick={() => setShowWritingGuide((value) => !value)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  {showWritingGuide ? "Hide guide" : "Show guide"}
                </button>
              </div>
              {showWritingGuide ? (
                <ul className="mt-3 space-y-1.5 text-xs leading-6">
                  <li><strong className="text-zinc-300">Body text:</strong> plain paragraphs, **bold**, [links](url), ## headings, &gt; quotes</li>
                  <li><strong className="text-zinc-300">Images:</strong> upload below, then click <em>Insert</em> — or use <code className="rounded bg-white/10 px-1">![caption](url)</code></li>
                  <li><strong className="text-zinc-300">Site images:</strong> <code className="rounded bg-white/10 px-1">![caption](/media/file.jpg)</code></li>
                  <li><strong className="text-zinc-300">Stat cards / lede / sources:</strong> use the insert buttons below (no HTML needed)</li>
                  <li><strong className="text-zinc-300">Video:</strong> only advanced blocks still use HTML — use Insert video if needed</li>
                </ul>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["Lede", blogSnippets.lede],
                  ["Stat card", blogSnippets.stat],
                  ["Image", blogSnippets.image],
                  ["Site image", blogSnippets.localImage],
                  ["Quote", blogSnippets.quote],
                  ["Section", blogSnippets.heading],
                  ["Sources", blogSnippets.sources],
                  ["Video", blogSnippets.video],
                ] as const
              ).map(([label, snippet]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => insertSnippet(snippet)}
                  className="rounded-full border border-dashed border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  + {label}
                </button>
              ))}
            </div>

            <label className="block cursor-pointer rounded-[10px] border border-dashed border-white/10 px-4 py-3 text-center text-sm hover:border-white/20">
              <Upload className="mx-auto mb-2 size-4" />
              {uploading ? "Uploading..." : "Upload images"}
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
            </label>

            {uploadedImages.length > 0 && (
              <div className="space-y-2">
                {uploadedImages.map((img) => (
                  <div key={img.url} className="rounded-[10px] border border-dashed border-white/10 p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1 truncate">{img.name}</span>
                    </div>
                    <p className="mt-2 truncate font-mono text-[11px] text-zinc-500">{img.url}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button type="button" size="sm" variant="outline" className="h-8 rounded-[8px] text-xs" onClick={() => insertUploadedImage(img)}>
                        Insert into post
                      </Button>
                      <Button type="button" size="sm" variant="outline" className="h-8 rounded-[8px] text-xs" onClick={() => insertUploadedImage(img, true)}>
                        Set as cover
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard.writeText(`![${img.name}](${img.url})`);
                          setUploadedImages((prev) => prev.map((item) => (item.url === img.url ? { ...item, copied: true } : item)));
                        }}
                        className="inline-flex h-8 items-center gap-1 rounded-[8px] border border-dashed border-white/10 px-3 text-xs text-zinc-300 hover:text-white"
                      >
                        {img.copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} Copy markdown
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write in Markdown. Example: ## Section title, **bold**, ![image caption](url), and use + Stat card / + Lede buttons for styled blocks."
              rows={16}
              className="admin-input font-mono text-sm leading-6"
            />

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="rounded-[10px]" onClick={() => setShowPreview((v) => !v)}>
                <Eye className="mr-2 size-4" /> {showPreview ? "Hide preview" : "Preview"}
              </Button>
              <Button type="button" variant="outline" className="rounded-[10px]" onClick={fixLatexDelimiters}>
                <Wand2 className="mr-2 size-4" /> Fix LaTeX
              </Button>
              <Button type="button" className="rounded-[10px]" onClick={handlePublish} disabled={publishing}>
                {publishing ? "Publishing..." : editingSlug ? "Update post" : "Publish post"}
              </Button>
            </div>

            {showPreview && (
              <div className="rounded-[14px] border border-dashed border-white/10 p-5">
                <MarkdownContent content={content || "*Nothing to preview yet.*"} variant="blog" />
              </div>
            )}
          </div>

          <div className="soft-card rounded-[14px] p-6">
            <h2 className="text-lg font-semibold">Published posts</h2>
            <div className="mt-4 space-y-3">
              {existingBlogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No Firebase posts yet.</p>
              ) : (
                existingBlogs.map((blog) => (
                  <div
                    key={blog.slug}
                    className={`flex items-center justify-between gap-3 rounded-[10px] border border-dashed px-4 py-3 ${
                      editingSlug === blog.slug ? "border-white/25 bg-white/[0.06]" : "border-white/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{blog.title}</p>
                      <p className="text-xs text-muted-foreground">{blog.date}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${blog.title}`}
                        disabled={loadingEditSlug === blog.slug}
                        onClick={() => void handleEdit(blog.slug)}
                        className="rounded p-2 hover:bg-white/5 disabled:opacity-50"
                      >
                        {loadingEditSlug === blog.slug ? (
                          <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        ) : (
                          <Edit className="size-4" />
                        )}
                      </button>
                      <button type="button" onClick={() => void handleDelete(blog.slug)} className="rounded p-2 hover:bg-white/5">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
