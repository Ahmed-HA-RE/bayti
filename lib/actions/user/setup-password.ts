'use server';

import { auth } from '@/lib/auth';
import { SetupPasswordFormData, setupPasswordSchema } from '@/schema/user';
import { headers } from 'next/headers';

export const setupPassword = async (data: SetupPasswordFormData) => {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      throw new Error('You are not authenticated to perform this action.');
    }

    const validatedData = setupPasswordSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(
        'Invalid form data. Please check your input and try again.',
      );
    }

    const { setPassword } = validatedData.data;

    await auth.api.setPassword({
      body: { newPassword: setPassword },
      headers: reqHeaders,
    });

    return { success: true, message: 'Password set successfully.' };
  } catch (error) {
    console.error('Error: ', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
    };
  }
};
