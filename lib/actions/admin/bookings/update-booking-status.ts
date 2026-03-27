'use server';

import BookStatusUpdateEmail from '@/emails/book-status-update';
import { auth } from '@/lib/auth';
import { DOMAIN } from '@/lib/constants';
import { Status } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import resend from '@/lib/resend';
import { headers } from 'next/headers';

export const updateBookingStatus = async (
  bookingId: string,
  status: Status,
  cancelReason?: string,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new Error('No booking found');

    // Check if status is the same as current status
    if (booking.status === status) {
      throw new Error('Booking is already in this status');
    }

    if (booking.status !== 'PENDING' && status === 'REJECTED') {
      throw new Error('Only pending bookings can be rejected');
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status, cancelReason: cancelReason === '' ? null : cancelReason },
      include: {
        property: {
          select: {
            name: true,
          },
        },
      },
    });

    // Send email notification to user about status change only if status is confirmed or rejected
    if (
      updatedBooking.status === 'CONFIRMED' ||
      updatedBooking.status === 'REJECTED'
    ) {
      resend.emails
        .send({
          from: `Bayti Support <support@${DOMAIN}>`,
          to: updatedBooking.userEmail,
          replyTo: process.env.EMAIL,
          subject: 'Update on Your Visit Request',
          react: BookStatusUpdateEmail({
            booking: {
              userName: updatedBooking.userName,
              date: updatedBooking.date,
              status: updatedBooking.status,
              cancelReason: updatedBooking.cancelReason,
              property: {
                name: updatedBooking.property.name,
              },
            },
          }),
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    }

    return { success: true, message: 'Booking status updated' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
