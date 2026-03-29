import BlogForm from '@/components/admin/blogs/blog-form';
import AdminFormLayout from '@/components/shared/admin-form-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Blog',
  description: 'Create a new blog post for the agency.',
};

const CreateBlogPage = () => {
  return (
    <AdminFormLayout
      title='Add new Blog'
      subtitle='Add the blog details first. Content will be added in the next step.

'
    >
      <BlogForm type='add' />
    </AdminFormLayout>
  );
};

export default CreateBlogPage;
