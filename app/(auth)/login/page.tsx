import Login from '@/components/auth/login-section';
import GoogleRecaptcha from '@/components/shared/google-recaptcha';
import HashLoader from '@/components/shared/hash-loader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const callbackUrl = (await searchParams).callbackUrl || '/';

  return (
    <Suspense fallback={<HashLoader />}>
      <GoogleRecaptcha>
        <Login callbackUrl={callbackUrl} />
      </GoogleRecaptcha>
    </Suspense>
  );
};

export default LoginPage;
