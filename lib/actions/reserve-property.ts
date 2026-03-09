'use server';

import {
  reservePropertyDialogSchema,
  ReservePropertyDialogFormData,
} from '@/schema/reserve-property-dialog';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { headers } from 'next/headers';
import prisma from '../prisma';
import { set } from 'date-fns';

export const reserveProperty = async (
  data: ReservePropertyDialogFormData,
  propertyId: string,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    const validatedData = reservePropertyDialogSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid form data');

    const { name, email, phoneNumber, date, timeRange } = validatedData.data;

    // Check if client has already reserved a viewing for the same property of the same day
    const reservation = await prisma.reservation.findFirst({
      where: {
        propertyId,
        userId: session.user.id,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (reservation) {
      throw new Error(
        'You already have an active reservation for this property.',
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

    // Else create a new reservation
    await prisma.reservation.create({
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

    return { success: true, message: 'Reservation has been requested.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
