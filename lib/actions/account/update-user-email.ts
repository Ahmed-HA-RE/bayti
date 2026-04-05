'use server';

import { auth } from '@/lib/auth';
import { SERVER_URL } from '@/lib/constants';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const updateUserEmail = async (newEmail: string, password: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'USER') {
      return { success: false, message: 'Unauthorized to update email' };
    }

    if (session.user.email === newEmail) {
      return {
        success: false,
        message: 'New email cannot be the same as the current email',
      };
    }

    // Get the current user's password hash from the database
    const userPassword = await prisma.account.findFirst({
      where: { userId: session.user.id },
      select: { password: true },
    });

    if (!userPassword || !userPassword.password) {
      return { success: false, message: 'User password not found' };
    }

    const context = await auth.$context;
    const isSamePassword = await context.password.verify({
      hash: userPassword.password,
      password,
    });

    if (!isSamePassword) {
      return { success: false, message: 'Incorrect password' };
    }

    // Update the user's email in the database
    await auth.api.changeEmail({
      body: {
        newEmail,
        callbackURL: `${SERVER_URL}`,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: 'Please check your email to confirm the change',
    };
  } catch (error) {
    console.error('Error: ', error);
    return { success: false, message: 'Something went wrong' };
  }
};
