import { posts as mlPosts } from "@/content/site";
import { mediumPosts } from "@/config/medium-posts";

/** Native ML teaching posts, hosted on this site (Firebase Storage markdown). */
export const nativePosts = [
  {
    ...mlPosts[0],
    imageFallback: mlPosts[0].coverImage ?? "/media/blog-highway-aerial.jpg",
    channel: "native" as const,
  },
];

export { mediumPosts };

/** @deprecated Use nativePosts or mediumPosts */
export const posts = [...nativePosts, ...mediumPosts];

export type NativePostConfig = (typeof nativePosts)[number];
export type MediumPostConfig = (typeof mediumPosts)[number];
