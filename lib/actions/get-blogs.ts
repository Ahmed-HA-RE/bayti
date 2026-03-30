'use server';

import prisma from '../prisma';

export const getBlogs = async (page?: number, limit: number = 6) => {
  const blogs = await prisma.blog.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: page ? (page - 1) * limit : 0,
  });

  const totalBlogs = await prisma.blog.count({
    where: { status: 'PUBLISHED' },
  });

  const totalPages = Math.ceil(totalBlogs / limit);

  return {
    blogs,
    totalPages,
  };
};
