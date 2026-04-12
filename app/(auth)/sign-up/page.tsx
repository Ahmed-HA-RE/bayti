import SignUp from '@/components/auth/sign-up-section';
import GoogleRecaptcha from '@/components/shared/google-recaptcha';
import HashLoader from '@/components/shared/hash-loader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

const SignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const callbackUrl = (await searchParams).callbackUrl || '/';

  return (
    <Suspense fallback={<HashLoader />}>
      <GoogleRecaptcha>
        <SignUp callbackUrl={callbackUrl} />
      </GoogleRecaptcha>
    </Suspense>
  );
};

export default SignUpPage;
