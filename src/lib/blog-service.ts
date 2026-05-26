import { ref, listAll, getDownloadURL, getMetadata, getBytes, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

export interface BlogMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage?: string;
  tags?: string[];
}

export interface Blog extends BlogMetadata {
  content: string;
}

const blogsCache = new Map<string, { data: BlogMetadata[] | Blog | null; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

function parseTags(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
  } catch {
    return raw.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);
}

async function readBlogFile(slug: string): Promise<{ content: string; customMeta: Record<string, string>; fallbackDate?: string }> {
  if (!storage) {
    throw new Error("Firebase Storage not initialized");
  }

  const blogRef = ref(storage, `blogs/${slug}.md`);
  const storageTimeoutMs = 8_000;

  try {
    const [url, metadata] = await withTimeout(
      Promise.all([getDownloadURL(blogRef), getMetadata(blogRef)]),
      storageTimeoutMs,
      "blog download",
    );
    const response = await withTimeout(fetch(url), storageTimeoutMs, "blog fetch");
    if (!response.ok) {
      throw new Error(`Blog fetch failed with status ${response.status}`);
    }
    const content = await response.text();
    return {
      content,
      customMeta: metadata.customMetadata ?? {},
      fallbackDate: metadata.timeCreated,
    };
  } catch (downloadError) {
    console.warn(`Download URL fetch failed for ${slug}, trying getBytes:`, downloadError);
  }

  const [bytes, metadata] = await withTimeout(
    Promise.all([getBytes(blogRef), getMetadata(blogRef)]),
    storageTimeoutMs,
    "blog getBytes",
  );

  return {
    content: new TextDecoder().decode(bytes),
    customMeta: metadata.customMetadata ?? {},
    fallbackDate: metadata.timeCreated,
  };
}

function blogFromMetadata(slug: string, content: string, customMeta: Record<string, string>, fallbackDate?: string): Blog {
  return {
    slug,
    title: customMeta.title || slug.replace(/-/g, " "),
    excerpt: customMeta.excerpt || "",
    date: customMeta.date || fallbackDate || new Date().toISOString().split("T")[0],
    readTime: customMeta.readTime || "5 min read",
    coverImage: customMeta.coverImage || undefined,
    tags: parseTags(customMeta.tags),
    content,
  };
}

export async function getAllBlogs(): Promise<BlogMetadata[]> {
  const cacheKey = "all-blogs";
  const cached = blogsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as BlogMetadata[];
  }

  try {
    if (!storage) {
      return [];
    }

    const blogsRef = ref(storage, "blogs");
    const blogsList = await listAll(blogsRef);

    const blogs = await Promise.all(
      blogsList.items
        .filter((item) => item.name.endsWith(".md"))
        .map(async (item) => {
          try {
            const metadata = await getMetadata(item);
            const slug = item.name.replace(".md", "");
            const customMeta = metadata.customMetadata ?? {};

            return {
              slug,
              title: customMeta.title || slug.replace(/-/g, " "),
              excerpt: customMeta.excerpt || "",
              date: customMeta.date || metadata.timeCreated,
              readTime: customMeta.readTime || "5 min read",
              coverImage: customMeta.coverImage || undefined,
              tags: parseTags(customMeta.tags),
            } satisfies BlogMetadata;
          } catch (error) {
            console.error(`Error fetching metadata for ${item.name}:`, error);
            return null;
          }
        }),
    );

    const validBlogs = blogs
      .filter((blog): blog is NonNullable<typeof blog> => blog !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    blogsCache.set(cacheKey, { data: validBlogs, timestamp: Date.now() });
    return validBlogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string, options?: { bustCache?: boolean }): Promise<Blog | null> {
  const cacheKey = `blog-${slug}`;

  if (options?.bustCache) {
    blogsCache.delete(cacheKey);
  }

  const cached = blogsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as Blog | null;
  }

  try {
    if (!storage) {
      return null;
    }

    const { content, customMeta, fallbackDate } = await readBlogFile(slug);
    const blog = blogFromMetadata(slug, content, customMeta, fallbackDate);

    blogsCache.set(cacheKey, { data: blog, timestamp: Date.now() });
    return blog;
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}

export async function uploadBlog(
  slug: string,
  content: string,
  metadata: Omit<BlogMetadata, "slug">,
): Promise<boolean> {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized");
    }

    const blogRef = ref(storage, `blogs/${slug}.md`);
    const blob = new Blob([content], { type: "text/markdown" });

    await uploadBytes(blogRef, blob, {
      customMetadata: {
        title: metadata.title,
        excerpt: metadata.excerpt,
        date: metadata.date,
        readTime: metadata.readTime,
        coverImage: metadata.coverImage || "",
        tags: JSON.stringify(metadata.tags || []),
      },
    });

    blogsCache.delete("all-blogs");
    blogsCache.delete(`blog-${slug}`);
    return true;
  } catch (error) {
    console.error("Error uploading blog:", error);
    return false;
  }
}

export async function uploadImage(file: File, path: string): Promise<string | null> {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized");
    }

    const imageRef = ref(storage, `blog-images/${path}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function deleteBlog(slug: string): Promise<boolean> {
  try {
    if (!storage) {
      return false;
    }

    const blogRef = ref(storage, `blogs/${slug}.md`);
    await deleteObject(blogRef);
    blogsCache.delete("all-blogs");
    blogsCache.delete(`blog-${slug}`);
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
}

export function clearBlogCache(): void {
  blogsCache.clear();
}
