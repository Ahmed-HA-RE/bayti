import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Blog',
  description: 'Create a new blog post for the agency.',
};

const CreateBlogPage = () => {
  return (
    <div className='space-y-8'>
      <h1 className='text-2xl font-semibold'>Add New Blog</h1>
    </div>
  );
};

export default CreateBlogPage;
