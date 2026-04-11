import BlogViewContent from '@/components/shared/blog-view-content';
import BlogDetailsSection from '@/components/blog/blog-details-section';
import BlogHeaderSection from '@/components/blog/blog-header-section';
import OtherBlogsSection from '@/components/blog/other-blogs.section';
import { MotionPreset } from '@/components/shared/motion-preset';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The blog you are looking for does not exist.',
    };
  }

  return {
    title: blog.title,
    description: 'Read this blog post about ' + blog.title,
    openGraph: {
      title: blog.title,
      description: 'Read this blog post about ' + blog.title,
      images: [
        {
          url: blog.coverImageUrl,
          alt: `Cover image for ${blog.title}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug, status: 'PUBLISHED' },
  });

  if (!blog) {
    return redirect('/blogs');
  }

  const otherBlogs = await prisma.blog.findMany({
    where: { slug: { not: slug }, status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <>
      {/* Blog Header */}
      <MotionPreset
        component='section'
        blur
        fade
        slide={{ direction: 'down' }}
        delay={0.1}
        className='section-header-spacing container'
      >
        <BlogHeaderSection blog={blog} />
      </MotionPreset>
      {/* Blog Details */}
      <MotionPreset
        component='section'
        blur
        fade
        slide={{ direction: 'down' }}
        delay={0.2}
        className='pt-8 md:pt-12 container'
      >
        <BlogDetailsSection blog={blog} />
      </MotionPreset>
      {/* Blog Content */}
      {blog.content && (
        <MotionPreset
          component='article'
          blur
          fade
          slide={{ direction: 'up' }}
          delay={0.3}
          className='section-spacing container'
        >
          <BlogViewContent content={blog.content} />
        </MotionPreset>
      )}
      {/* Other Blogs */}
      {otherBlogs.length > 0 && (
        <MotionPreset
          component='section'
          blur
          fade
          slide={{ direction: 'up' }}
          delay={0.4}
          className='section-spacing container'
        >
          <OtherBlogsSection blogs={otherBlogs} />
        </MotionPreset>
      )}
    </>
  );
};

export default BlogPage;
