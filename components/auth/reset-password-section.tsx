'use client';
import ResetPasswordForm from './reset-password-form';

const ResetPassword = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Reset Your Password
          </h2>
          <p className='text-muted-foreground'>
            Set a new password to regain access to your account.
          </p>
        </div>

        {/* Reset Password Form */}
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
