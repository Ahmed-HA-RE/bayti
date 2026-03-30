import { Blog } from '@/lib/generated/prisma';
import SectionEyebrow from '../shared/section-eyebrow';
import { APP_NAME } from '@/lib/constants';
import { MotionPreset } from '../shared/motion-preset';
import BlogCard from '../shared/blog-card';
import { Button } from '../ui/button';
import Link from 'next/link';

const OtherBlogsSection = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex md:items-end gap-4 justify-between'>
        <div className='space-y-3'>
          <SectionEyebrow title={`More from ${APP_NAME}`} />
          <h1 className='section-title'>
            Explore More Perspectives on Modern Living
          </h1>
          <p className='section-subtitle'>
            Discover curated insights on real estate trends, smart investments,
            and the art of modern home design — thoughtfully written for
            today&apos;s discerning homeowners.
          </p>
        </div>
        <Button asChild className='lg:inline-flex hidden'>
          <Link href='/blogs'>View All Blogs</Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog, index) => (
          <MotionPreset
            key={blog.id}
            fade
            blur
            slide={{ direction: 'up' }}
            delay={index * 0.1}
          >
            <BlogCard blog={blog} />
          </MotionPreset>
        ))}
      </div>
      <Button asChild className='lg:hidden self-end'>
        <Link href='/blogs'>View All Blogs</Link>
      </Button>
    </div>
  );
};

export default OtherBlogsSection;
