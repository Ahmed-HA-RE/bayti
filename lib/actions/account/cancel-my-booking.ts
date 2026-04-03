'use server';

import BookingCancellationEmail from '@/emails/booking-cancellation-email';
import { auth } from '@/lib/auth';
import { DOMAIN } from '@/lib/constants';
import prisma from '@/lib/prisma';
import resend from '@/lib/resend';
import { headers } from 'next/headers';

export const cancelMyBooking = async (bookingId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'USER') {
      return { success: false, message: 'Unauthorized' };
    }

    // Check if the booking belongs to the user
    const myBooking = await prisma.booking.findUnique({
      where: { userId: session.user.id, id: bookingId },
    });

    if (!myBooking) {
      return { success: false, message: 'Booking not found' };
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: myBooking.id, userId: myBooking.userId },
      data: { status: 'CANCELLED' },
      include: {
        property: {
          select: {
            name: true,
          },
        },
      },
    });

    // Send cancellation email to the user
    void resend.emails
      .send({
        from: `Bayti Support <support@${DOMAIN}>`,
        to: updatedBooking.userEmail,
        replyTo: process.env.EMAIL,
        subject: 'Cancellation Confirmed',
        react: BookingCancellationEmail({
          booking: {
            userName: updatedBooking.userName,
            date: updatedBooking.date,
            startTime: updatedBooking.startTime,
            endTime: updatedBooking.endTime,
            property: {
              id: updatedBooking.propertyId,
              name: updatedBooking.property.name,
            },
          },
        }),
      })
      .catch((error) => {
        console.error('Failed to send confirmation email:', error);
      });
    return { success: true, message: 'Booking cancelled successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
};
