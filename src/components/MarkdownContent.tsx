import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={
        className ??
        "prose prose-invert max-w-none prose-headings:font-editorial prose-headings:font-semibold prose-h2:mt-12 prose-h3:mt-8 prose-p:text-muted-foreground prose-p:leading-8 prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80 prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-100 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-950 prose-img:rounded-[14px] prose-blockquote:border-l-white/20 prose-blockquote:text-muted-foreground prose-li:text-muted-foreground"
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
