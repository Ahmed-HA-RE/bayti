'use client';
import DOMPurify from 'dompurify';

const BlogViewContent = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default BlogViewContent;
