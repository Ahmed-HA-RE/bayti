'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const getMyBookings = async (page: number, limit = 1) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  const myBookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          address: true,
          propertyList: true,
          propertyImages: {
            select: {
              url: true,
            },
            take: 1,
          },
          agent: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalBookings = await prisma.booking.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalPages = Math.ceil(totalBookings / limit);

  return { myBookings, totalPages };
};
