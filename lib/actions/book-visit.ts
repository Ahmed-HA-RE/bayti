'use server';

import {
  BookVisitDialogFormData,
  bookVisitDialogSchema,
} from '@/schema/book-visit-dialog';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { headers } from 'next/headers';
import prisma from '../prisma';
import { set } from 'date-fns';

export const bookVisit = async (
  data: BookVisitDialogFormData,
  propertyId: string,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    const validatedData = bookVisitDialogSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid form data');

    const { name, email, phoneNumber, date, timeRange } = validatedData.data;

    // Check if client has already requested a book visit for the same property of the same day
    const bookVisitRequest = await prisma.viewingRequest.findFirst({
      where: {
        propertyId,
        userId: session.user.id,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (bookVisitRequest) {
      throw new Error(
        'You already have an active book visit request for this property.',
      );
    }

    const start = timeRange.split(' - ')[0];
    const end = timeRange.split(' - ')[1];

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

    // Check if the requested time slot overlaps with any existing reservations for the same property
    const alreadyReserved = await prisma.viewingRequest.findFirst({
      where: {
        propertyId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        startTime,
        endTime,
      },
    });

    if (alreadyReserved)
      throw new Error(
        'The selected time slot is not available anymore. Please choose a different time.',
      );

    // Else create a new viewing request
    await prisma.viewingRequest.create({
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
    });

    revalidatePath(`/property/${propertyId}`);

    return { success: true, message: 'Your visit request has been submitted.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
