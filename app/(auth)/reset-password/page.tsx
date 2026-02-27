import ResetPassword from '@/components/auth/reset-password-section';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password to regain access to your account.',
};

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
