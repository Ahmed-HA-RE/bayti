import { Alert, AlertTitle } from '@/components/ui/alert';
import prisma from '@/lib/prisma';

const BlogsList = async () => {
  const blogs = await prisma.blog.findMany();

  if (blogs.length === 0) {
    <Alert variant={'info'}>
      <AlertTitle>No Blogs Found</AlertTitle>
    </Alert>;
  }

  return blogs.map((blog) => <div key={blog.id}></div>);
};

export default BlogsList;
