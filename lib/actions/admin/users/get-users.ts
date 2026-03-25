'use server';

import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUsers = async ({
  search,
  status,
  page,
  limit = 10,
}: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    redirect('login');
  }

  // Search Filter
  const searchFilter: Prisma.UserWhereInput = search
    ? {
        OR: [
          {
            name: { contains: search, mode: 'insensitive' },
          },
          {
            email: { contains: search, mode: 'insensitive' },
          },
        ],
      }
    : {};

  // Status Filter
  const statusFilter: Prisma.UserWhereInput = status
    ? {
        banned: status === 'banned' ? true : false,
      }
    : {};

  const users = await prisma.user.findMany({
    where: {
      ...searchFilter,
      ...statusFilter,
    },
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: page && (page - 1) * limit,
  });

  const totalUsers = await prisma.user.count({
    where: {
      ...searchFilter,
      ...statusFilter,
    },
  });

  const totalPages = Math.ceil(totalUsers / limit);

  return { users, totalPages };
};
