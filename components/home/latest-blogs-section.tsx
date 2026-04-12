import prisma from '@/lib/prisma';
import BlogCard from '../shared/blog-card';
import { MotionPreset } from '../shared/motion-preset';
import SectionEyebrow from '../shared/section-eyebrow';

const LatestBlogsSection = async () => {
  const latestBlogs = await prisma.blog.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });

  if (!latestBlogs || latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className='section-spacing'>
      <div className='container'>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'left' }}
          className='mb-10 flex flex-col gap-4 items-center md:items-start'
        >
          <SectionEyebrow title='explore' />
          <h2 className='section-title'>Our Latest Blogs</h2>
          <p className='section-subtitle'>
            Stay updated with our latest insights, tips, and stories from the
            world of real estate. Explore our most recent blogs to discover
            valuable information and trends in the industry.
          </p>
        </MotionPreset>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {latestBlogs.map((blog, index) => (
            <MotionPreset
              blur
              fade
              slide={{ direction: 'left' }}
              delay={index * 0.1}
              key={blog.id}
            >
              <BlogCard key={blog.id} blog={blog} />
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;
