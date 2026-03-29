import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { RiArticleLine } from 'react-icons/ri';
import BlogContentForm from '@/components/admin/blogs/blog-content-form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { IoMdAlert } from 'react-icons/io';

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
    title: `Edit Blog Content - {blog.title}`,
    description: `Add content to ${blog.title} blog`,
  };
};

const BlogContentPage = async ({ params }: Props) => {
  const { slug } = await params;

  if (!slug) {
    return redirect('/admin/blogs');
  }

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
    select: {
      content: true,
      status: true,
      id: true,
      title: true,
    },
  });

  if (!blog) {
    return redirect('/admin/blogs');
  }

  return (
    <div className='flex flex-col gap-4'>
      <Link
        href='/admin/blogs'
        className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit'
      >
        <FiArrowLeft className='size-3.5' />
        Back to Blogs
      </Link>
      <div className='flex items-center gap-3'>
        <div className='p-2.5 rounded-lg bg-orange-50'>
          <RiArticleLine className='size-5 text-orange-500' />
        </div>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {blog.title}
          </h1>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Add or edit the content for this blog
          </p>
        </div>
      </div>
      {blog.status === 'DRAFT' && (
        <Alert variant='warning'>
          <IoMdAlert className='size-4' />
          <AlertTitle>
            This blog is currently a draft and will not be visible to users
            until it is published.
          </AlertTitle>
        </Alert>
      )}
      {/* Blog content form will go here */}
      <BlogContentForm blog={blog} />
    </div>
  );
};

export default BlogContentPage;
