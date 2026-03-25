'use server';

import { auth } from '@/lib/auth';
import { Prisma, Role } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { AdminUserFormData, adminUserSchema } from '@/schema/admin-user';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const editUser = async (data: AdminUserFormData, id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    const validatedData = adminUserSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid data');

    const { name, email, phoneNumber, role, image, imageKey } =
      validatedData.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: {
          select: {
            providerId: true,
          },
        },
      },
    });

    if (!user) throw new Error('User not found');
    if (
      user.accounts.some((acc) => acc.providerId !== 'credential') &&
      email !== user.email
    )
      throw new Error('Cannot change email of a Google user');

    // Check if image was updated and delete old one if exists
    if (user.imageKey && imageKey && user.imageKey !== imageKey) {
      const utApi = new UTApi();
      await utApi.deleteFiles([user.imageKey]);
    }

    // Update user
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phoneNumber: phoneNumber || null,
        role: role as Role,
        image,
        imageKey: imageKey || Prisma.skip,
      },
    });

    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.log(error);
    return { success: false, message: (error as Error).message };
  }
};
