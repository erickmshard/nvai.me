import Markdown from 'react-markdown';

export default function MarkdownProse({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <article
      className={`prose mx-auto max-w-none prose-headings:text-black prose-a:text-[#2C2D36] prose-strong:text-black ${className || ''}`}
    >
      <Markdown>{markdown}</Markdown>
    </article>
  );
}
