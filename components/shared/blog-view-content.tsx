'use client';
import DOMPurify from 'isomorphic-dompurify';

const BlogViewContent = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <span
      className='prose max-w-none prose-ul:marker:text-foreground prose-ol:marker:text-foreground mt-6 overflow-x-auto'
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default BlogViewContent;
