import Login from '@/components/auth/login-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { callbackUrl } = (await searchParams) || '/';

  return <Login callbackUrl={callbackUrl} />;
};

export default LoginPage;
