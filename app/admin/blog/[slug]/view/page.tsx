import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiArrowLeft } from 'react-icons/fi';
import { LuClock3 } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';
import { RiArticleLine } from 'react-icons/ri';
import { FaRegCalendar, FaRegEdit } from 'react-icons/fa';
import { format } from 'date-fns';
import { FaRegCircleDot } from 'react-icons/fa6';
import { BsCheckCircleFill } from 'react-icons/bs';
import BlogViewContent from '@/components/shared/blog-view-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `View Blog - ${blog.title}`,
    description: `View ${blog.title} blog`,
  };
};

const BlogViewPage = async ({ params }: Props) => {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!blog) {
    return redirect('/admin/blogs');
  }

  const isPublished = blog.status === 'PUBLISHED';

  const metaInfo = [
    {
      icon: isPublished ? (
        <BsCheckCircleFill className='text-green-600 size-4.5' />
      ) : (
        <FaRegEdit className='text-yellow-600 size-4.5' />
      ),
      text: blog.status,
    },
    {
      icon: <LuClock3 className='size-4.5' />,
      text: `${blog.readTime} min`,
    },
    {
      icon: <FaRegCalendar className='size-4.5' />,
      text: format(blog.createdAt, 'MMM dd, yyyy'),
    },
  ];

  return (
    <div className='flex flex-col gap-6'>
      {/* Back link */}
      <Link
        href='/admin/blogs'
        className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit'
      >
        <FiArrowLeft className='size-3.5' />
        Back to Blogs
      </Link>

      {/* Header */}
      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-4'>
        <div className='flex flex-col gap-2.5'>
          <div className='flex items-center gap-1.5 text-foreground'>
            <FaRegCircleDot className='size-3.5' />
            <h4 className='text-sm uppercase'>{blog.tag}</h4>
          </div>
          <h1 className='leading-tight text-2xl md:text-3xl font-semibold'>
            {blog.title}
          </h1>
        </div>
        {/* Right side: CTAs */}
        <div className='flex items-center gap-3'>
          <Button size='sm' asChild>
            <Link href={`/admin/blog/${blog.slug}/edit`}>
              <FiEdit className='size-3.5' />
              Edit Blog
            </Link>
          </Button>
          <Button variant='secondary' size='sm' asChild>
            <Link href={`/admin/blog/${blog.slug}/content`}>
              <RiArticleLine className='size-3.5' />
              Edit Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className='relative w-full aspect-video rounded-xl overflow-hidden border'>
        <Image
          src={blog.coverImageUrl}
          alt={blog.title}
          fill
          className='object-cover'
        />
      </div>

      {/* Meta info */}
      <div className='flex flex-col md:flex-row md:items-center gap-4 text-sm'>
        {metaInfo.map((info, index) => (
          <span key={index} className='flex items-center gap-2'>
            {info.icon}
            <span className='text-sm'>{info.text}</span>
          </span>
        ))}
      </div>

      {/* Content */}
      {blog.content && <BlogViewContent content={blog.content} />}
    </div>
  );
};

export default BlogViewPage;
