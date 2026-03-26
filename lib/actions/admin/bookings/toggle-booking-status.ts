'use server';

import { auth } from '@/lib/auth';
import { Status } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const toggleBookingStatus = async (
  bookingId: string,
  status: Status,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    // Checl if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        property: {
          select: { id: true },
        },
      },
    });

    if (!booking) throw new Error('No booking found');

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    // Add later send email notification to user about status change only if status is confirmed or cancelled or rejected
    return { success: true, message: 'Booking status updated' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
