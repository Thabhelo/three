import React, { useEffect, useMemo, useRef, useState } from 'react';
import { styles } from '../styles';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { MarkdownContent } from '../lib/markdown.jsx';
import { useTheme } from '../lib/theme.js';

const BlogNew = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState(localStorage.getItem('draft_content') || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('draft_content', content);
  }, [content]);

  useEffect(() => {
    const s = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(s);
  }, [title]);

  const previewContent = `# ${title || 'Untitled'}\n\n${content}`;

  // Split-pane sizing
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(520);
  const [dragging, setDragging] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const min = 280;
      const max = Math.max(min, rect.width - 360);
      const next = Math.min(max, Math.max(min, x));
      setLeftWidth(next);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp, { once: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  const publish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !slug) return;
    setSaving(true);
    setError('');
    try {
      const filePath = `posts/${slug}.md`;
      const blob = new Blob([`# ${title}\n\n${content}`], { type: 'text/markdown' });
      const { error } = await supabase.storage.from('blog-md').upload(filePath, blob, { upsert: false });
      if (error) throw error;
      localStorage.removeItem('draft_content');
      window.location.href = `/blog/${slug}`;
    } catch (e) {
      setError(e.message || 'Failed to publish.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${styles.padding} max-w-screen-2xl mx-auto`}>
      <h1 className="text-zinc-900 dark:text-white text-3xl font-black">New Post</h1>
      {!supabaseConfigured && (
        <div className="mt-4 text-xs text-amber-700 bg-amber-100 border border-amber-200 rounded-lg p-3">Publishing disabled: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.</div>
      )}
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
      <form onSubmit={publish} className="mt-6">
        <div className="blog-light">
          <div ref={containerRef} className="relative flex items-stretch gap-0">
          <div style={{ flexBasis: leftWidth }} className="min-w-[260px] max-w-[1200px] pr-3">
            <div className="space-y-3 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 bg-white/50 dark:bg-black/10">
          <input
            className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-white"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-white"
            placeholder="slug"
            value={slug}
            readOnly
          />
          <textarea
            className="min-h-[420px] w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 font-mono text-[14px] text-zinc-900 dark:text-white"
            placeholder={"Write Markdown here. Inline: $a^2+b^2=c^2$  |  Block: $$\\int_0^1 x^2 dx$$  |  Aligned: $$\\begin{aligned} ... \\end{aligned}$$"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <button disabled={!title || saving} className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white disabled:opacity-50">{saving ? 'Publishing…' : 'Publish'}</button>
          </div>
            </div>
          </div>
          <div
            onMouseDown={() => setDragging(true)}
            className={`w-1.5 mx-0 my-2 rounded cursor-col-resize ${dragging ? 'bg-zinc-400 dark:bg-zinc-500' : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600'}`}
            aria-label="Resize preview"
          />
          <div className="flex-1 pl-3 min-w-[260px]">
            <div className="text-zinc-700 dark:text-zinc-300 text-sm mb-2">Preview</div>
            <article className="prose prose-zinc max-w-none dark:prose-invert bg-white dark:bg-tertiary border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <MarkdownContent content={previewContent} />
            </article>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogNew;


