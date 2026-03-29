import BlogCard from '@/components/shared/blog-card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import prisma from '@/lib/prisma';

const BlogsList = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (blogs.length === 0) {
    <Alert variant={'info'}>
      <AlertTitle>No Blogs Found</AlertTitle>
    </Alert>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default BlogsList;
