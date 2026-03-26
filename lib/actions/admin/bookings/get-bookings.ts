'use server';

import { auth } from '@/lib/auth';
import { Prisma, Status } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getBookings = async ({
  search,
  date,
  status,
  sort,
  page,
  limit = 10,
}: {
  page?: number;
  search?: string;
  date?: string;
  status?: Status;
  sort?: string;
  limit?: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return redirect('/login');
  }

  // Search Filter
  const searchFilter: Prisma.BookingWhereInput = search
    ? {
        OR: [
          {
            user: { name: { contains: search, mode: 'insensitive' } },
          },
          {
            property: { name: { contains: search, mode: 'insensitive' } },
          },
        ],
      }
    : {};

  // Date Filter
  const dateFilter: Prisma.BookingWhereInput = date
    ? {
        date: {
          gte: startOfDay(new Date(date)),
          lte: endOfDay(new Date(date)),
        },
      }
    : {};

  // Status Filter
  const statusFilter: Prisma.BookingWhereInput = status ? { status } : {};

  // Sort Filter
  const sortOption: Prisma.BookingOrderByWithRelationInput =
    sort && sort !== ''
      ? {
          date: sort === 'newest' ? 'desc' : 'asc',
        }
      : {};

  const bookings = await prisma.booking.findMany({
    where: {
      ...searchFilter,
      ...dateFilter,
      ...statusFilter,
    },
    include: {
      property: {
        select: {
          name: true,
          id: true,
          propertyImages: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
    take: limit,
    skip: page ? (page - 1) * limit : 0,
    orderBy: {
      ...sortOption,
    },
  });

  const totalCount = await prisma.booking.count({
    where: {
      ...searchFilter,
      ...dateFilter,
      ...statusFilter,
    },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return { bookings, totalPages };
};
