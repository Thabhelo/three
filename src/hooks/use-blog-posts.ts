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
    coverImage: post.imageFallback,
    imageFallback: post.imageFallback,
    tags: post.tags,
    source: "static",
    channel: "native",
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

        if (fetched.length > 0) {
          setPosts(fetched.map(firebaseNativeToDisplay));
        } else {
          setPosts(staticNativePosts.map(staticNativeToDisplay));
        }
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

    if (!isFirebaseConfigured()) {
      setPost(fallback ? staticNativeToDisplay(fallback) : null);
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
          setPost(fetched);
          setIsMarkdown(true);
        } else if (fallback) {
          setPost(staticNativeToDisplay(fallback));
          setIsMarkdown(false);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error(`Failed to load blog ${slug}:`, err);
        if (!cancelled) {
          setError("Could not load post from Firebase.");
          setPost(fallback ? staticNativeToDisplay(fallback) : null);
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

export function getStaticSections(post: (typeof staticNativePosts)[number] | undefined) {
  return post?.sections ?? [];
}

export function getStaticCode(post: (typeof staticNativePosts)[number] | undefined) {
  return post?.code ?? "";
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
