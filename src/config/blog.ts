import { posts as mlPosts } from "@/content/site";
import { mediumPosts } from "@/config/medium-posts";

/** Native ML teaching posts — hosted on this site (Firebase Storage markdown). */
export const nativePosts = [
  {
    ...mlPosts[0],
    imageFallback: "/media/blog-performance-ring.jpg",
    channel: "native" as const,
  },
  {
    ...mlPosts[1],
    imageFallback: "/media/blog-terminal-setup.jpg",
    channel: "native" as const,
  },
];

export { mediumPosts };

/** @deprecated Use nativePosts or mediumPosts */
export const posts = [...nativePosts, ...mediumPosts];

export type NativePostConfig = (typeof nativePosts)[number];
export type MediumPostConfig = (typeof mediumPosts)[number];
