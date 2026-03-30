'use client';

import { getBlogs } from '@/lib/actions/get-blogs';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertTitle } from './ui/alert';
import { IoMdAlert } from 'react-icons/io';
import { LuTriangleAlert } from 'react-icons/lu';
import BlogSkeletonCard from './shared/blog-skeleton-card';
import BlogCard from './shared/blog-card';
import Pagination from './shared/pagination';
import { useSearchParams } from 'next/navigation';

const BlogsListSection = () => {
  const page = useSearchParams().get('page');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', page],
    queryFn: async () => await getBlogs(Number(page)),
  });

  return (
    <section className='section-spacing container'>
      {data && data.blogs.length === 0 ? (
        <Alert variant='warning' className='max-w-md mx-auto'>
          <IoMdAlert />
          <AlertTitle>No Blogs have been published yet.</AlertTitle>
        </Alert>
      ) : isError ? (
        <Alert variant='error' className='max-w-md mx-auto'>
          <LuTriangleAlert />
          <AlertTitle>{error.message || 'Something went wrong.'}</AlertTitle>
        </Alert>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading ? (
            <BlogSkeletonCard length={6} />
          ) : (
            data?.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          )}
        </div>
      )}
      {data && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} />
      )}
    </section>
  );
};

export default BlogsListSection;
