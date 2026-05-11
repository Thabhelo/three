import { posts as basePosts } from "@/content/site";

export const posts = [
  {
    ...basePosts[0],
    imageQuery: "abstract chrome ring technology",
    imageFallback: "/media/blog-performance-ring.jpg",
  },
  {
    ...basePosts[1],
    imageQuery: "developer terminal setup",
    imageFallback: "/media/blog-terminal-setup.jpg",
  },
  {
    slug: "building-a-blog-from-scratch",
    title: "Build a Blog with Next.js and MDX from Scratch",
    date: "2026-03-11",
    excerpt:
      "File-based content, zero database, full control. A complete walkthrough of building a statically generated blog with MDX and gray-matter.",
    tags: ["Writing", "Developer Tools", "MDX"],
    readingTime: "11 min read",
    sections: [
      "A good writing system should make publishing feel boring in the best way.",
      "The core loop is content, metadata, rendering, and a little bit of taste around reading flow.",
    ],
    code: "const posts = getMdxPosts()\nreturn posts.sort(byDate)",
    imageQuery: "writing desk notebook",
    imageFallback: "/media/blog-mdx-writing.jpg",
  },
  {
    slug: "what-i-tell-myself-before-learning-to-code",
    title: "What I Tell Myself Before Learning to Code",
    date: "2025-12-04",
    excerpt:
      "The myths, mistakes, and mindset shifts that separate people who learn to code from people who quit.",
    tags: ["Career", "Learning", "Mindset"],
    readingTime: "10 min read",
    sections: [
      "Learning to code is mostly learning to stay with confusion long enough for patterns to appear.",
      "The best developers I know are not fearless. They are patient and precise.",
    ],
    code: "while confused:\n  read_error()\n  try_smaller_step()",
    imageQuery: "laptop learning code",
    imageFallback: "/media/blog-learning-code.jpg",
  },
];

export type BlogPostConfig = (typeof posts)[number];
