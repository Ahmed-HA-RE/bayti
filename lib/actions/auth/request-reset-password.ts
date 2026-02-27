'use server';

import { auth } from '@/lib/auth';
import { SERVER_URL } from '@/lib/constants';
import { headers } from 'next/headers';

const requestResetPassword = async (email: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) throw new Error('You are already logged in.');

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${SERVER_URL}/reset-password`,
      },
    });

    return {
      success: true,
      message:
        'If an account with that email exists, a reset link has been sent.',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export default requestResetPassword;
