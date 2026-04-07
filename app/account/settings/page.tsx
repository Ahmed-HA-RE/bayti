import PersonalInformation from '@/components/account/settings/personal-information';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SetPassword from '@/components/account/settings/set-password';
import ChangePassword from '@/components/account/settings/change-password';
import SessionManagement from '@/components/account/settings/session-management';
import AccountLinking from '@/components/account/settings/account-linking';

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
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    return redirect('/login');
  }

  const userAccounts = await prisma.account.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const allSessions = await auth.api.listSessions({
    headers: requestHeaders,
  });

  const credentialsCount = userAccounts.filter(
    (a) => a.providerId === 'credential',
  ).length;

  return (
    <AccountHeaderLayout
      title='Account Settings'
      subtitle='Manage your account information and preferences'
    >
      <div className='grid grid-cols-1 gap-12 pt-10 md:pt-14'>
        <PersonalInformation session={session} />
        {credentialsCount === 0 && <SetPassword />}
        {credentialsCount !== 0 && (
          <ChangePassword userEmail={session.user.email} />
        )}
        <SessionManagement allSessions={allSessions} session={session} />
        <AccountLinking accounts={userAccounts} />
      </div>
    </AccountHeaderLayout>
  );
};

export default AccountSettingsPage;
