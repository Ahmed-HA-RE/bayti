'use server';

import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const adminGetAgents = async ({
  search,
  location,
  page,
  limit = 1,
}: {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return redirect('/login');
  }

  // Search filter
  const searchFilter: Prisma.AgentWhereInput = search
    ? {
        name: { contains: search, mode: 'insensitive' },
      }
    : {};

  // Location filter
  const locationFilter: Prisma.AgentWhereInput = location
    ? {
        location: { contains: location, mode: 'insensitive' },
      }
    : {};

  const agents = await prisma.agent.findMany({
    where: {
      ...searchFilter,
      ...locationFilter,
    },
    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },

    skip: page ? (page - 1) * limit : 0,
    take: limit,
  });

  const totalAgents = await prisma.agent.count({
    where: {
      ...searchFilter,
      ...locationFilter,
    },
  });

  const totalPages = Math.ceil(totalAgents / limit);

  return {
    agents,
    totalPages,
  };
};
