import { Metadata } from 'next';
import PrivacyPolicy from '@/components/markdown/privacy-policy.mdx';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for using Bayti and related services.',
};

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
