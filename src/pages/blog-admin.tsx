import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
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
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, type User } from "firebase/auth";
import MarkdownContent from "@/components/MarkdownContent";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  uploadBlog,
  uploadImage,
  type BlogMetadata,
} from "@/lib/blog-service";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export default function BlogAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
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

  useEffect(() => {
    if (!auth) {
      setCheckingAuth(false);
      return;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setCheckingAuth(false);
      if (nextUser) void loadExistingBlogs();
    });
  }, []);

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
    if (!auth) return;
    await signOut(auth);
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

  async function handleEdit(postSlug: string) {
    const blog = await getBlogBySlug(postSlug);
    if (!blog) return;

    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setTags(blog.tags?.join(", ") ?? "");
    setReadTime(blog.readTime);
    setCoverImage(blog.coverImage ?? "");
    setContent(blog.content);
    setEditingSlug(postSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="soft-card space-y-4 rounded-[14px] p-6">
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
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover image URL" className="admin-input" />

            <label className="block cursor-pointer rounded-[10px] border border-dashed border-white/10 px-4 py-3 text-center text-sm hover:border-white/20">
              <Upload className="mx-auto mb-2 size-4" />
              {uploading ? "Uploading..." : "Upload images"}
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
            </label>

            {uploadedImages.length > 0 && (
              <div className="space-y-2">
                {uploadedImages.map((img, index) => (
                  <div key={img.url} className="flex items-center gap-2 rounded-[10px] border border-dashed border-white/10 px-3 py-2 text-sm">
                    <ImageIcon className="size-4 text-muted-foreground" />
                    <span className="flex-1 truncate">{img.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(`![${img.name}](${img.url})`);
                        setUploadedImages((prev) => prev.map((item, i) => (i === index ? { ...item, copied: true } : item)));
                      }}
                      className="rounded p-1 hover:bg-white/5"
                    >
                      {img.copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Markdown content (supports GFM + LaTeX with $...$ and $$...$$)"
              rows={16}
              className="admin-input font-mono text-sm"
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
                <MarkdownContent content={content || "*Nothing to preview yet.*"} />
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
                  <div key={blog.slug} className="flex items-center justify-between gap-3 rounded-[10px] border border-dashed border-white/10 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{blog.title}</p>
                      <p className="text-xs text-muted-foreground">{blog.date}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button type="button" onClick={() => void handleEdit(blog.slug)} className="rounded p-2 hover:bg-white/5">
                        <Edit className="size-4" />
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
