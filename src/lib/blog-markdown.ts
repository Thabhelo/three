/** Converts author-friendly blog markdown extensions into HTML for rendering. */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdownToHtml(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function parseStatBlock(block: string): string {
  const fields: Record<string, string> = {};

  for (const line of block.trim().split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    fields[key] = value;
  }

  return `<div class="blog-stat">
  <span class="blog-stat-label">${inlineMarkdownToHtml(fields.label ?? "")}</span>
  <span class="blog-stat-value">${inlineMarkdownToHtml(fields.value ?? "")}</span>
  <span class="blog-stat-note">${inlineMarkdownToHtml(fields.note ?? "")}</span>
</div>`;
}

export function preprocessBlogMarkdown(input: string): string {
  return input
    .replace(/:::lede\n([\s\S]*?)\n:::/g, (_, body: string) => `<p class="blog-lede">${inlineMarkdownToHtml(body.trim())}</p>`)
    .replace(/:::stat\n([\s\S]*?)\n:::/g, (_, block: string) => parseStatBlock(block))
    .replace(
      /:::sources\n([\s\S]*?)\n:::/g,
      (_, body: string) => `<p class="blog-source"><strong>Sources consulted:</strong> ${inlineMarkdownToHtml(body.trim())}</p>`,
    );
}

export function insertIntoEditor(
  current: string,
  snippet: string,
  textarea: HTMLTextAreaElement | null,
  onChange: (next: string) => void,
): void {
  if (!textarea) {
    onChange(`${current}${snippet}`);
    return;
  }

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const next = `${current.slice(0, start)}${snippet}${current.slice(end)}`;
  onChange(next);

  requestAnimationFrame(() => {
    textarea.focus();
    const cursor = start + snippet.length;
    textarea.setSelectionRange(cursor, cursor);
  });
}

export const blogSnippets = {
  lede: `:::lede
Your opening hook — one strong paragraph that sets up the essay.
:::

`,
  stat: `:::stat
label: Company · metric name
value: 200M+ by 2026
note: One or two sentences of context. Add a [source link](https://example.com) if needed.
:::

`,
  image: `

![Short description of the image](https://your-image-url.jpg)

`,
  localImage: `

![Short description](/media/your-image.jpg)

`,
  quote: `
> A pull quote or key insight you want to stand out.

`,
  heading: `

## Section title

`,
  sources: `:::sources
[Source one](https://example.com), [Source two](https://example.com)
:::

`,
  video: `

<figure class="blog-media">
  <video controls playsinline preload="metadata" poster="/media/your-poster.jpg">
    <source src="/media/your-video.mp4" type="video/mp4" />
  </video>
  <figcaption>Caption · credit</figcaption>
</figure>

`,
} as const;
