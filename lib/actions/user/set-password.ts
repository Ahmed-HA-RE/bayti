'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { SetPasswordFormData, setPasswordSchema } from '@/schema/user';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const setPassword = async (data: SetPasswordFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'USER') {
      return { success: false, message: 'Unauthorized to set password.' };
    }

    // Check if the user already has a password set and his provider is credential
    const account = await prisma.account.findFirst({
      where: { userId: session.user.id },
      select: { providerId: true, password: true },
    });

    if (!account) {
      return { success: false, message: 'Account not found.' };
    }

    if (account.password) {
      return {
        success: false,
        message: 'Password is already set for this account.',
      };
    }

    if (account.providerId === 'credential') {
      return {
        success: false,
        message: 'Password can only be set for OAuth accounts.',
      };
    }

    const validatedData = setPasswordSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message:
          'Please ensure the passwords match and meet the required criteria.',
      };
    }

    await auth.api.setPassword({
      body: {
        newPassword: validatedData.data.newPassword,
      },
      headers: await headers(),
    });

    revalidatePath('/account/settings');

    return {
      success: true,
      message: 'Password has been set successfully.',
    };
  } catch (error) {
    console.error('Error: ', error);
    return {
      success: false,
      message:
        'An error occurred while setting the password. Please try again.',
    };
  }
};
