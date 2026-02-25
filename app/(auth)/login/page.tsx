import Login from '@/components/auth/login-section';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
