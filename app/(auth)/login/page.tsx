import Login from '@/components/auth/login-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
