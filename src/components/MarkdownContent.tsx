import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { preprocessBlogMarkdown } from "@/lib/blog-markdown";
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
  className?: string;
  variant?: "default" | "blog";
}

const blogComponents: Components = {
  img: ({ alt, src }) => (
    <figure className="blog-media">
      <img src={src} alt={alt ?? ""} loading="lazy" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  ),
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="blog-table-wrap">
      <table>{children}</table>
    </div>
  ),
  pre: ({ children }) => (
    <div className="blog-code-well">
      <pre>{children}</pre>
    </div>
  ),
};

export default function MarkdownContent({ content, className, variant = "default" }: MarkdownContentProps) {
  const isBlog = variant === "blog";
  const renderedContent = isBlog ? preprocessBlogMarkdown(content) : content;

  return (
    <div className={className ?? (isBlog ? "blog-prose" : "prose prose-invert max-w-none prose-headings:font-editorial prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-8 prose-p:text-muted-foreground prose-p:leading-8 prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80 prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-100 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-white/10 prose-pre:bg-card prose-img:rounded-[14px] prose-blockquote:border-l-white/20 prose-blockquote:text-muted-foreground prose-li:text-muted-foreground")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={isBlog ? [rehypeRaw, rehypeKatex] : [rehypeKatex]}
        components={isBlog ? blogComponents : undefined}
      >
        {renderedContent}
      </ReactMarkdown>
    </div>
  );
}
