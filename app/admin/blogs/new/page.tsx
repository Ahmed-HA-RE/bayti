import BlogForm from '@/components/admin/blogs/blog-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Blog',
  description: 'Create a new blog post for the agency.',
};

const CreateBlogPage = () => {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold'>Add New Blog</h1>
        <p className='text-muted-foreground'>
          Add the blog details first. Content will be added in the next step.
        </p>
      </div>
      <BlogForm />
    </div>
  );
};

export default CreateBlogPage;
