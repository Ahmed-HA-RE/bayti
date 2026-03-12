'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const getTotalProperties = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return notFound();
  }

  const totalProperties = await prisma.property.count();

  return totalProperties;
};

export const getTotalUsers = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return notFound();
  }

  const totalUsers = await prisma.user.count();

  return totalUsers;
};

export const getTotalBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return notFound();
  }

  const totalBookings = await prisma.booking.count();

  return totalBookings;
};

export const getTotalUpcomingBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return notFound();
  }

  const upcomingBookings = await prisma.booking.count({
    where: {
      status: 'CONFIRMED',
      date: {
        gte: new Date(),
      },
    },
  });

  return upcomingBookings;
};

export const getTotalSoldProperties = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return notFound();
  }

  const soldProperties = await prisma.property.count({
    where: {
      status: 'SOLD',
    },
  });

  return soldProperties;
};

// Add later total agents
