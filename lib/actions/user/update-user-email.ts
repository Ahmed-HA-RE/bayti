'use server';

import { auth } from '@/lib/auth';
import { SERVER_URL } from '@/lib/constants';
import { UpdateUserEmailFormData, updateUserEmailSchema } from '@/schema/user';
import { headers } from 'next/headers';

export const updateUserEmail = async (data: UpdateUserEmailFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'USER') {
      throw new Error('Unauthorized to update email.');
    }

    const validatedData = updateUserEmailSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error('Invalid email address');
    }

    const { newEmail } = validatedData.data;

    if (session.user.email === newEmail) {
      throw new Error('New email cannot be the same as the current one');
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
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
