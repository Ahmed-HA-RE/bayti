'use client';
import DOMPurify from 'isomorphic-dompurify';

const BlogViewContent = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default BlogViewContent;
