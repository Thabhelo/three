import React, { useEffect, useState } from 'react';
import { styles } from '../styles';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { useAdminUnlock } from '../lib/adminUnlock';
import { useTheme } from '../lib/theme.js';

const BlogIndex = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.storage.from('blog-md').list('posts', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
        if (error) throw error;
        setFiles((data || []).filter((f) => f.name.endsWith('.md')));
      } catch (e) {
        setError('Unable to load posts.');
      }
    })();
  }, []);
  const { unlocked } = useAdminUnlock();
  const { resolvedTheme, toggleTheme } = useTheme();

  const toSlug = (name) => name.replace(/\.md$/, '');

  return (
    <div className={`blog-light ${styles.padding} max-w-4xl mx-auto`}>
      <div className="flex items-center justify-between">
        <h1 className="text-zinc-900 dark:text-white text-3xl font-black">Blog</h1>
        {unlocked && (
          <a href="/blog/new" className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white bg-white hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700 transition-colors shadow-sm">New Post</a>
        )}
      </div>
      {!supabaseConfigured && (
        <div className="mt-4 text-xs text-amber-700 bg-amber-100 border border-amber-200 rounded-lg p-3">Read-only mode: configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable publishing.</div>
      )}
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
      <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-tertiary">
        {files.map((f) => (
          <li key={f.name} className="p-4 flex items-center justify-between">
            <a className="text-zinc-900 dark:text-white font-medium" href={`/blog/${toSlug(f.name)}`}>{toSlug(f.name)}</a>
            <span className="flex items-center gap-3 text-xs text-zinc-500">
              {unlocked && (
                <button
                  className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-700"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!confirm('Delete this post? This cannot be undone.')) return;
                    const key = `posts/${f.name}`;
                    const { error } = await supabase.storage.from('blog-md').remove([key]);
                    if (!error) setFiles((prev) => prev.filter((x) => x.name !== f.name));
                  }}
                >
                  Delete
                </button>
              )}
              {new Date(f.created_at || Date.now()).toLocaleDateString()}
            </span>
          </li>
        ))}
        {files.length === 0 && (
          <li className="p-6 text-zinc-600 dark:text-zinc-300">No posts yet.</li>
        )}
      </ul>
    </div>
  );
};

export default BlogIndex;


