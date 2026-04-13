import { Metadata } from 'next';
import TermsAndConditions from '@/components/markdown/terms-and-conditions.mdx';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for using Bayti and related services.',
};

const TermsAndConditionsPage = () => {
  return <TermsAndConditions />;
};

export default TermsAndConditionsPage;
