'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getAgentsForSelect = async (search: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return redirect('/login');
  }

  const agents = await prisma.agent.findMany({
    where: {
      name: { contains: search, mode: 'insensitive' },
      status: 'ACTIVE',
    },
    select: {
      id: true,
      name: true,
      role: true,
      image: true,
    },
    take: 5,
  });

  return agents;
};
