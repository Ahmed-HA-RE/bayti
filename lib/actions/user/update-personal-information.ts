'use server';

import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { UpdateUserFormData, updateUserSchema } from '@/schema/user';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const updatePersonalInformation = async (data: UpdateUserFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'USER') {
      return { success: false, message: 'Unauthorized access.' };
    }
    // Check if user is available
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    const validatedData = updateUserSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, message: 'Invalid data provided.' };
    }

    const { name, image, phoneNumber, imageKey } = validatedData.data;

    // Check if user uploaded a new image so we can delete the old one from the cloud storage
    if (imageKey && user.imageKey && imageKey !== user.imageKey) {
      const utapi = new UTApi();
      await utapi.deleteFiles([user.imageKey]);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        image,
        phoneNumber,
        imageKey: imageKey || Prisma.skip,
      },
    });
    revalidatePath('/account/settings');
    return { success: true, message: 'Updated successfully.' };
  } catch (error) {
    console.error('Error: ', error);
    return {
      success: false,
      message: 'Something went wrong while updating your information.',
    };
  }
};
