import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getAllBlogs, getBlogBySlug, type Blog, type BlogMetadata } from "@/lib/blog-service";
import { getMediumPosts, type MediumPost } from "@/lib/content-service";
import { mediumPosts as staticMediumPosts, nativePosts as staticNativePosts } from "@/config/blog";

export interface DisplayNativePost extends BlogMetadata {
  imageFallback?: string;
  content?: string;
  source: "firebase" | "static";
  channel: "native";
}

export interface DisplayMediumPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  coverImage?: string;
  imageFallback?: string;
  source: "firebase" | "static";
  channel: "medium";
}

function staticNativeToDisplay(post: (typeof staticNativePosts)[number]): DisplayNativePost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readingTime,
    coverImage: post.coverImage ?? post.imageFallback,
    imageFallback: post.imageFallback ?? post.coverImage,
    tags: post.tags,
    content: "content" in post ? post.content : undefined,
    source: "static",
    channel: "native",
  };
}

function mergeNativeMetadata(
  staticPost: (typeof staticNativePosts)[number],
  firebasePost?: BlogMetadata,
): DisplayNativePost {
  if (!firebasePost) return staticNativeToDisplay(staticPost);

  return {
    ...firebaseNativeToDisplay(firebasePost),
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    date: staticPost.date,
    readTime: staticPost.readingTime,
    tags: staticPost.tags,
    coverImage: staticPost.coverImage ?? firebasePost.coverImage,
    imageFallback: staticPost.imageFallback ?? staticPost.coverImage ?? firebasePost.coverImage,
  };
}

function mergeNativeBlog(
  staticPost: (typeof staticNativePosts)[number],
  firebasePost: Blog,
): Blog {
  return {
    ...firebasePost,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    date: staticPost.date,
    readTime: staticPost.readingTime,
    tags: staticPost.tags,
    coverImage: staticPost.coverImage ?? firebasePost.coverImage,
  };
}

function firebaseNativeToDisplay(post: BlogMetadata): DisplayNativePost {
  return {
    ...post,
    imageFallback: post.coverImage,
    source: "firebase",
    channel: "native",
  };
}

function staticMediumToDisplay(post: (typeof staticMediumPosts)[number]): DisplayMediumPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    url: post.url,
    tags: [...post.tags],
    coverImage: post.coverImage,
    imageFallback: post.coverImage,
    source: "static",
    channel: "medium",
  };
}

function firebaseMediumToDisplay(post: MediumPost): DisplayMediumPost {
  return {
    ...post,
    imageFallback: post.coverImage,
    source: "firebase",
    channel: "medium",
  };
}

export function useNativePosts() {
  const [posts, setPosts] = useState<DisplayNativePost[]>(staticNativePosts.map(staticNativeToDisplay));
  const [loading, setLoading] = useState(isFirebaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const fetched = await getAllBlogs();
        if (cancelled) return;

        const allowedSlugs = new Set(staticNativePosts.map((post) => post.slug));
        const firebaseBySlug = new Map(
          fetched.filter((post) => allowedSlugs.has(post.slug)).map((post) => [post.slug, post]),
        );

        setPosts(
          staticNativePosts.map((staticPost) => {
            const firebasePost = firebaseBySlug.get(staticPost.slug);
            return mergeNativeMetadata(staticPost, firebasePost);
          }),
        );
      } catch (err) {
        console.error("Failed to load native posts:", err);
        if (!cancelled) {
          setError("Could not load ML posts from Firebase.");
          setPosts(staticNativePosts.map(staticNativeToDisplay));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}

export function useMediumPosts() {
  const [posts, setPosts] = useState<DisplayMediumPost[]>(staticMediumPosts.map(staticMediumToDisplay));
  const [loading, setLoading] = useState(isFirebaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const fetched = await getMediumPosts();
        if (cancelled) return;

        if (fetched.length > 0) {
          setPosts(fetched.map(firebaseMediumToDisplay));
        } else {
          setPosts(staticMediumPosts.map(staticMediumToDisplay));
        }
      } catch (err) {
        console.error("Failed to load Medium posts:", err);
        if (!cancelled) {
          setError("Could not load Medium posts from Firebase.");
          setPosts(staticMediumPosts.map(staticMediumToDisplay));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<Blog | DisplayNativePost | null>(null);
  const [loading, setLoading] = useState(Boolean(slug && isFirebaseConfigured()));
  const [error, setError] = useState<string | null>(null);
  const [isMarkdown, setIsMarkdown] = useState(false);
  const staticPost = staticNativePosts.find((item) => item.slug === slug);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }

    const fallback = staticNativePosts.find((item) => item.slug === slug);
    if (!fallback) {
      setPost(null);
      setLoading(false);
      return;
    }

    const canonicalPost = fallback;

    if (!isFirebaseConfigured()) {
      setPost(staticNativeToDisplay(canonicalPost));
      setIsMarkdown(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      if (!slug) return;

      try {
        const fetched = await getBlogBySlug(slug);
        if (cancelled) return;

        if (fetched) {
          setPost(mergeNativeBlog(canonicalPost, fetched));
          setIsMarkdown(true);
        } else {
          setPost(staticNativeToDisplay(canonicalPost));
          setIsMarkdown(false);
        }
      } catch (err) {
        console.error(`Failed to load blog ${slug}:`, err);
        if (!cancelled) {
          setError("Could not load post from Firebase.");
          setPost(staticNativeToDisplay(canonicalPost));
          setIsMarkdown(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading, error, isMarkdown, staticPost };
}

export function getStaticSections(post: (typeof staticNativePosts)[number] | undefined): string[] {
  if (!post || !("sections" in post) || !Array.isArray(post.sections)) return [];
  return post.sections;
}

export function getStaticCode(post: (typeof staticNativePosts)[number] | undefined): string {
  if (!post || !("code" in post) || typeof post.code !== "string") return "";
  return post.code;
}

/** @deprecated Use useNativePosts or useMediumPosts */
export function useBlogPosts() {
  const native = useNativePosts();
  const medium = useMediumPosts();
  return {
    posts: [...native.posts, ...medium.posts],
    loading: native.loading || medium.loading,
    error: native.error ?? medium.error,
    usingFirebase: false,
  };
}
