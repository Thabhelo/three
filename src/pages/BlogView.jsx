import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styles } from '../styles';
import { supabase } from '../lib/supabase';
import { MarkdownContent } from '../lib/markdown.jsx';
import { useAdminUnlock } from '../lib/adminUnlock';

const BlogView = () => {
  const { slug } = useParams();
  const [mdText, setMdText] = useState('');
  const [error, setError] = useState('');
  const { unlocked } = useAdminUnlock();

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
    <div className={`${styles.padding} mx-auto bg-white dark:bg-primary`}>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {unlocked && (
            <div className="mb-4 flex justify-end">
              <button
                className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs text-red-700 hover:bg-red-50"
                onClick={async () => {
                  if (!confirm('Delete this post? This cannot be undone.')) return;
                  const key = `posts/${slug}.md`;
                  const { error } = await supabase.storage.from('blog-md').remove([key]);
                  if (!error) window.location.href = '/blog';
                }}
              >
                Delete post
              </button>
            </div>
          )}
          <article className="paper-a3 md:paper-a4 prose prose-zinc max-w-none dark:prose-invert bg-white border border-zinc-200 rounded-lg p-6">
            <MarkdownContent content={content} />
          </article>
        </>
      )}
    </div>
  );
};

export default BlogView;


