import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Manage all the agency blog posts. Add, edit, and preview posts with images, titles, and rich content in the dashboard.',
};

const BlogsPage = () => {
  return (
    <div className='space-y-8'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
        <h1 className='text-2xl font-semibold'>Manage Blogs</h1>
        <Button size='sm' asChild className='w-full md:w-auto'>
          <Link href='/admin/blogs/new'>
            Add New Blog
            <FaPlus className='size-3' />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogsPage;
