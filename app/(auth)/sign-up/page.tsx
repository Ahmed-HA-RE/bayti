import SignUp from '@/components/auth/sign-up-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

const SignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { callbackUrl } = (await searchParams) || '/';

  return <SignUp callbackUrl={callbackUrl} />;
};

export default SignUpPage;
