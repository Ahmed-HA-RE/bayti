import UpdateEmailForm from '@/components/account/settings/update-email-form';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Change Email Address',
  description: 'Update the email address associated with your account.',
};

const UpdateEmailPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  return (
    <AccountHeaderLayout
      title='Change your email address'
      subtitle='Update the email linked to your account'
    >
      <UpdateEmailForm userEmail={session.user.email} />
    </AccountHeaderLayout>
  );
};

export default UpdateEmailPage;
