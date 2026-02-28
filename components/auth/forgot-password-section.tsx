'use client';
import ForgotPasswordForm from './forgot-password-form';

const ForgotPassword = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Forgot Your Password?
          </h2>
          <p className='text-muted-foreground'>
            Don&apos;t worry, we&apos;ll help you reset it.
          </p>
        </div>

        {/* Forgot Password Form */}
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
