import { mediumPosts } from "@/config/medium-posts";

export type FeaturedWritingItem = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  coverImage: string;
  href: string;
  channel: string;
  external: boolean;
};

function toFeatured(post: (typeof mediumPosts)[number]): FeaturedWritingItem {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    coverImage: post.coverImage,
    href: post.url,
    channel: "Medium",
    external: true,
  };
}

const sqlServerPost = mediumPosts.find((post) => post.slug.includes("microsoft-sql-server"));
const kaliPost = mediumPosts.find((post) => post.slug.includes("kali-linux-on-virtualbox"));
const automationPost = mediumPosts.find((post) => post.slug.includes("how-does-the-future-of-automation"));

export const featuredWriting: FeaturedWritingItem[] = [
  sqlServerPost,
  kaliPost,
  automationPost,
]
  .filter((post): post is (typeof mediumPosts)[number] => Boolean(post))
  .map(toFeatured);
