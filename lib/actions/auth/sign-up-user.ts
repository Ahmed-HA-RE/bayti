'use server';

import { auth } from '@/lib/auth';
import { SERVER_URL } from '@/lib/constants';
import { signUpSchema } from '@/schema/auth';
import { SignUpFormData } from '@/types/auth';

const signUpUser = async (data: SignUpFormData) => {
  try {
    const validatedData = signUpSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid Data');

    const { name, email, password } = validatedData.data;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${SERVER_URL}/verify-email?email=${email}`,
      },
    });

    return {
      success: true,
      message:
        'Registered successfully. Please check your email to verify your account.',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

export default signUpUser;
