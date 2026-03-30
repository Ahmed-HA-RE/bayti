import { Blog } from '@/lib/generated/prisma';
import { format } from 'date-fns';
import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { GoDash } from 'react-icons/go';

const BlogDetailsSection = ({ blog }: { blog: Blog }) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='relative w-full h-[250px] md:h-[500px] lg:h-[650px] rounded-md'>
        <Image
          src={blog.coverImageUrl}
          alt={`Cover image for ${blog.title}`}
          fill
          className='object-cover rounded-md'
        />
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='flex items-center gap-2'>
          <FaRegCalendarAlt className='size-4.5' />
          <span className='text-sm'>
            {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
          </span>
        </span>
        <GoDash />
        <span className='flex items-center gap-2'>
          <FiClock className='size-4.5' />
          <span className='text-sm'>{blog.readTime} min read</span>
        </span>
      </div>
    </div>
  );
};

export default BlogDetailsSection;
