'use server';

import { auth } from '@/lib/auth';
import { PropertyStatus } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const changePropertyStatus = async (
  id: string,
  status: PropertyStatus,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    // Fetch the property
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) throw new Error('Property not found');

    // Update the property status
    await prisma.property.update({
      where: { id },
      data: {
        status,
      },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/properties');
    revalidatePath('/');

    return { success: true, message: 'Property status updated successfully' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
