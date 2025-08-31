import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styles } from '../styles';
import { supabase } from '../lib/supabase';
import { MarkdownContent } from '../lib/markdown.jsx';

const BlogView = () => {
  const { slug } = useParams();
  const [mdText, setMdText] = useState('');
  const [error, setError] = useState('');

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
    <div className={`${styles.padding} max-w-3xl mx-auto`}>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <article className="prose prose-zinc max-w-none dark:prose-invert bg-white dark:bg-tertiary border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
          <MarkdownContent content={content} />
        </article>
      )}
    </div>
  );
};

export default BlogView;


