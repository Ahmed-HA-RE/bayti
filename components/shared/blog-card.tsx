'use client';

import { Blog } from '@/lib/generated/prisma';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const BlogCard = ({ blog }: { blog: Blog }) => {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');

  return (
    <Link
      className='overflow-hidden group'
      href={isAdmin ? `/admin/blog/${blog.slug}/view` : `/blog/${blog.slug}`}
    >
      <Card className='rounded-lg pb-0 md:pt-8 gap-0 transition duration-300 overflow-hidden'>
        <CardHeader className='flex flex-col gap-2.5 md:px-6.5'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-sm font-normal'>
              {format(blog.createdAt, 'MMM dd, yyyy')}
            </span>
            <span className='text-sm text-muted-foreground'>{blog.tag}</span>
          </div>
          <CardTitle className='group-hover:text-primary transition-colors duration-300 text-xl'>
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent className='px-0'>
          <Button
            variant='link'
            className='md:px-6.5 px-4 mt-8 mb-10 underline underline-offset-4 gap-1.5'
          >
            {isAdmin ? 'View Blog' : 'Read More'}
            <ArrowUpRight className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform size-4.5' />
          </Button>
          <div className='overflow-hidden'>
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              width={0}
              height={0}
              sizes='100vw'
              className='object-cover w-full h-[250px] group-hover:scale-105 transition-transform duration-500'
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
