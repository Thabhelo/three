import React, { useEffect, useState } from 'react';
import { styles } from '../styles';
import { supabase } from '../lib/supabase';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (e) {
      setError('Unable to load posts.');
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setUploading(true);
    setError('');
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data: storageRes, error: storageErr } = await supabase.storage.from('blog-pdfs').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (storageErr) throw storageErr;

      const { data: publicUrl } = supabase.storage.from('blog-pdfs').getPublicUrl(storageRes.path);
      const { error: insertErr } = await supabase.from('blog_posts').insert({ title, description, pdf_url: publicUrl.publicUrl });
      if (insertErr) throw insertErr;

      setTitle('');
      setDescription('');
      setFile(null);
      await loadPosts();
    } catch (e) {
      setError(e.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`${styles.padding} max-w-6xl mx-auto`}>
      <h1 className="text-zinc-900 dark:text-white text-3xl font-black">Blog</h1>
      <p className="text-zinc-600 dark:text-zinc-300 mt-2">Share PDFs or switch to a LaTeX/Markdown editor later.</p>

      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

      <form onSubmit={onUpload} className="mt-6 grid gap-4 sm:grid-cols-3 bg-white dark:bg-tertiary border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="sm:col-span-1 bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="sm:col-span-1 bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-white"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="sm:col-span-1 text-sm text-zinc-700 dark:text-zinc-300"
        />
        <div className="sm:col-span-3">
          <button disabled={!file || !title || uploading} className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white disabled:opacity-50">
            {uploading ? 'Uploading…' : 'Upload PDF'}
          </button>
        </div>
      </form>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-tertiary">
            <h2 className="text-zinc-900 dark:text-white font-bold">{post.title}</h2>
            {post.description && <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1">{post.description}</p>}
            <div className="mt-3 flex gap-3">
              <a href={post.pdf_url} target="_blank" className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-600 text-sm text-zinc-900 dark:text-white">View</a>
              <a href={post.pdf_url} download className="px-3 py-1 rounded bg-zinc-900 dark:bg-zinc-800 text-white text-sm">Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;


