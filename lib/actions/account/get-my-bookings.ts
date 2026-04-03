'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const getMyBookings = async (
  userId: string,
  page: number,
  limit = 5,
) => {
  if (!userId) {
    return redirect('/login');
  }

  const myBookings = await prisma.booking.findMany({
    where: {
      userId,
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
      userId,
    },
  });

  const totalPages = Math.ceil(totalBookings / limit);

  return { myBookings, totalPages };
};
