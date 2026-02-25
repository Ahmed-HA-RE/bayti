'use server';

import { auth } from '@/lib/auth';
import { loginSchema } from '@/schema/auth';
import { LoginFormData } from '@/types/auth';
import { headers } from 'next/headers';

export const loginUser = async (data: LoginFormData) => {
  try {
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid Data');

    const { email, password, rememberMe } = validatedData.data;

    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export default loginUser;
