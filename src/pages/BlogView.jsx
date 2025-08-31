import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styles } from '../styles';
import { supabase } from '../lib/supabase';
import { MarkdownContent } from '../lib/markdown.jsx';
import { useAdminUnlock } from '../lib/adminUnlock';
import { useTheme } from '../lib/theme.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const BlogView = () => {
  const { slug } = useParams();
  const [mdText, setMdText] = useState('');
  const [error, setError] = useState('');
  const { unlocked } = useAdminUnlock();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const { data } = supabase.storage.from('blog-md').getPublicUrl(`posts/${slug}.md`);
        const res = await fetch(data.publicUrl);
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        setMdText(text);
      } catch (e) {
        setError('Post not found.');
      }
    })();
  }, [slug]);

  const content = mdText;

  return (
    <div className={`blog-light min-h-screen bg-white ${styles.padding}`}>
      <div className="max-w-3xl mx-auto">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {unlocked && (
            <div className="mb-4 flex justify-end gap-2">
              <a
                href={`/blog/new?edit=${encodeURIComponent(slug)}`}
                className="px-3 py-1 rounded border border-zinc-300 text-xs text-zinc-700 hover:bg-zinc-50"
                title="Edit this post"
              >
                <span className="inline-flex items-center gap-1">
                  <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
                  Edit
                </span>
              </a>
              <button
                className="px-3 py-1 rounded border border-zinc-300 text-xs text-red-700 hover:bg-red-50"
                onClick={async () => {
                  if (!confirm('Delete this post? This cannot be undone.')) return;
                  const key = `posts/${slug}.md`;
                  const { error } = await supabase.storage.from('blog-md').remove([key]);
                  if (!error) window.location.href = '/blog';
                }}
              >
                Delete
              </button>
            </div>
          )}
          <article className="paper-a3 md:paper-a4 prose prose-zinc max-w-none dark:prose-invert bg-white border border-zinc-200 rounded-lg p-6">
            <MarkdownContent content={content} />
          </article>
        </>
      )}
      </div>
    </div>
  );
};

export default BlogView;


