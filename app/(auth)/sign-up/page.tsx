import SignUp from '@/components/auth/sign-up-section';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

const SignUpPage = async () => {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
};

export default SignUpPage;
