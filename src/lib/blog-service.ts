import { ref, listAll, getDownloadURL, getMetadata, uploadBytes, deleteObject } from "firebase/storage";
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
              tags: customMeta.tags ? JSON.parse(customMeta.tags) : [],
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

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const cacheKey = `blog-${slug}`;
  const cached = blogsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as Blog | null;
  }

  try {
    if (!storage) {
      return null;
    }

    const blogRef = ref(storage, `blogs/${slug}.md`);
    const [url, metadata] = await Promise.all([getDownloadURL(blogRef), getMetadata(blogRef)]);

    const response = await fetch(url);
    const content = await response.text();
    const customMeta = metadata.customMetadata ?? {};

    const blog: Blog = {
      slug,
      title: customMeta.title || slug.replace(/-/g, " "),
      excerpt: customMeta.excerpt || "",
      date: customMeta.date || metadata.timeCreated,
      readTime: customMeta.readTime || "5 min read",
      coverImage: customMeta.coverImage || undefined,
      tags: customMeta.tags ? JSON.parse(customMeta.tags) : [],
      content,
    };

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
