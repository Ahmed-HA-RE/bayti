import BlogForm from '@/components/admin/blogs/blog-form';
import AdminFormLayout from '@/components/shared/admin-form-layout';
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
    title: `Edit Blog - ${blog.title}`,
    description: `Edit the details of ${blog.title} blog`,
  };
};

const EditBlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  if (!slug) {
    return redirect('/admin/blogs');
  }

  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!blog) {
    return redirect('/admin/blogs');
  }

  return (
    <AdminFormLayout
      title={`Edit Blog: ${blog.title}`}
      subtitle='Update the blog details'
    >
      <BlogForm blog={blog} type='update' />
    </AdminFormLayout>
  );
};

export default EditBlogPage;
