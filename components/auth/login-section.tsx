'use client';

import LoginForm from '@/components/auth/login-form';
import FadeSlideIn from '../shared/fade-slide-in';

const Login = () => {
  return (
    <FadeSlideIn
      slideType='left'
      className='flex h-full flex-col items-center justify-center sm:px-5'
    >
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Welcome Back
          </h2>
          <p className='text-muted-foreground'>Continue to your account</p>
        </div>

        {/* Form */}
        <LoginForm />
      </div>
    </FadeSlideIn>
  );
};

export default Login;
