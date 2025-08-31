import MarkdownIt from 'markdown-it';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const preprocess = (text) =>
  (text || '')
    .replace(/^[ \t]*\[\s*$/gm, '$$\n')
    .replace(/^[ \t]*\]\s*$/gm, '\n$$')
    // Support \[ ... \] delimiters
    .replace(/\\\[/g, '$$')
    .replace(/\\\]/g, '$$');

export const MarkdownContent = ({ content }) => (
  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
    {preprocess(content)}
  </ReactMarkdown>
);

export const renderMarkdown = (text) => {
  const md = new MarkdownIt({ html: false, linkify: true, breaks: true });
  return md.render(preprocess(text));
};

export const createMarkdown = () => new MarkdownIt({ html: false, linkify: true, breaks: true });


