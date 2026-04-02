'use server';

import {
  BookVisitDialogFormData,
  bookVisitDialogSchema,
} from '@/schema/book-visit-dialog';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { headers } from 'next/headers';
import prisma from '../prisma';
import { isSameDay, set } from 'date-fns';
import resend from '../resend';
import BookVisitConfirmationEmail from '@/emails/book-visit-confirmation';
import { toZonedTime } from 'date-fns-tz';

const domain = process.env.DOMAIN;

export const bookVisit = async (
  data: BookVisitDialogFormData,
  propertyId: string,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    // Disable admin from booking a visit
    if (session.user.role === 'ADMIN') {
      throw new Error('Admins are not allowed to book visits.');
    }

    const validatedData = bookVisitDialogSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid form data');

    const { name, email, phoneNumber, date, timeRange } = validatedData.data;

    // Convert the selected date to the Dubai timezone and compare it with the current date in the same timezone to prevent users from booking a visit for the same day. This is necessary because vercel functions dxb1 is out of range.
    const today = toZonedTime(new Date(), 'Asia/Dubai');
    const selectedDate = toZonedTime(date, 'Asia/Dubai');

    // Check if the selected date is same day
    if (isSameDay(today, selectedDate)) {
      throw new Error('You cannot book a visit for the same day.');
    }

    const [start, end] = timeRange.split('-');

    const startTime = set(new Date(date), {
      hours: Number(start.split(':')[0]),
      minutes: Number(start.split(':')[1]),
      seconds: 0,
      milliseconds: 0,
    });

    const endTime = set(new Date(date), {
      hours: Number(end.split(':')[0]),
      minutes: Number(end.split(':')[1]),
      seconds: 0,
      milliseconds: 0,
    });

    // Check if the requested time is in the future
    if (startTime.getTime() < Date.now())
      throw new Error('The selected time has already passed.');

    // Check if client has already requested a book visit for the same property of the same day and if the requested time slot overlaps with any existing reservations for the same property
    const bookVisitRequest = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        date: new Date(date),
        startTime,
        endTime,
      },
    });

    if (bookVisitRequest) {
      if (bookVisitRequest.userId === session.user.id) {
        throw new Error(
          'You have already requested a visit for this property on the same day.',
        );
      } else {
        throw new Error(
          'The selected time slot is not available. Please choose a different time.',
        );
      }
    }

    // Else create a new viewing request
    const newBooking = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          phoneNumber,
        },
      });

      return await tx.booking.create({
        data: {
          propertyId,
          userId: session.user.id,
          userName: name,
          userEmail: email,
          userPhoneNumber: phoneNumber,
          date,
          startTime,
          endTime,
        },
        include: {
          property: {
            select: {
              name: true,
              address: true,
              agent: {
                select: {
                  name: true,
                  email: true,
                  phoneNumber: true,
                },
              },
            },
          },
        },
      });
    });

    // Send confirmation email to the user
    void resend.emails
      .send({
        from: `Bayti Support <support@${domain}>`,
        to: email,
        replyTo: process.env.EMAIL,
        subject: 'We received your visit request!',
        react: BookVisitConfirmationEmail({
          booking: newBooking,
        }),
      })
      .catch((error) => {
        console.error('Failed to send confirmation email:', error);
      });

    revalidatePath(`/property/${propertyId}`);

    return { success: true, message: 'Your visit request has been submitted.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
};
