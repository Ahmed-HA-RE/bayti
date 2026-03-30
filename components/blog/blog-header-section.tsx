import { Blog } from '@/lib/generated/prisma';
import { CircleDot } from 'lucide-react';

const BlogHeaderSection = ({ blog }: { blog: Blog }) => {
  return (
    <div className='space-y-0.5'>
      <div className='flex items-center gap-1.5'>
        <CircleDot className='text-accent size-3.5' />
        <span className='uppercase text-sm'>{blog.tag}</span>
      </div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl leading-relaxed font-medium'>
        {blog.title}
      </h1>
    </div>
  );
};

export default BlogHeaderSection;
