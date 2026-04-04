import PersonalInformation from '@/components/account/settings/personal-information';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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

  const accountProviderId = await prisma.account.findFirst({
    where: { userId: session.user.id },
    select: { providerId: true },
  });

  if (!accountProviderId) {
    return redirect('/login');
  }

  console.log(accountProviderId);

  return (
    <AccountHeaderLayout
      title='Account Settings'
      subtitle='Manage your account information and preferences'
    >
      <div className='grid grid-cols-1 gap-4'>
        <PersonalInformation
          session={session}
          accountProviderId={accountProviderId.providerId}
        />
      </div>
    </AccountHeaderLayout>
  );
};

export default AccountSettingsPage;
