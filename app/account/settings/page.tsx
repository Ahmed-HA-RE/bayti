import PersonalInformation from '@/components/account/settings/personal-information';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SetPassword from '@/components/account/settings/set-password';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      title: 'User not authenticated',
    };
  }
  const user = session.user;

  return {
    title: `${user.name}'s Account Settings`,
  };
};

const AccountSettingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  const credentialsCount = await prisma.account.count({
    where: {
      userId: session.user.id,
      providerId: { equals: 'credential' },
    },
  });

  return (
    <AccountHeaderLayout
      title='Account Settings'
      subtitle='Manage your account information and preferences'
    >
      <div className='grid grid-cols-1 gap-12 pt-10 md:pt-14'>
        <PersonalInformation session={session} />
        {credentialsCount === 0 && <SetPassword />}
      </div>
    </AccountHeaderLayout>
  );
};

export default AccountSettingsPage;
