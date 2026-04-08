import PersonalInformation from '@/components/account/settings/personal-information';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SessionManagement from '@/components/account/settings/session-management';
import AccountLinking from '@/components/account/settings/account-linking';
import AccountDeletionDialog from '@/components/account/settings/account-deletion-dialog';
import AccountSecurity from '@/components/account/settings/account-security';

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

  const [userAccounts, allSessions] = await Promise.all([
    prisma.account.findMany({
      where: {
        userId: session.user.id,
      },
    }),
    auth.api.listSessions({
      headers: requestHeaders,
    }),
  ]);

  return (
    <AccountHeaderLayout
      title='Account Settings'
      subtitle='Manage your account information and preferences'
    >
      <div className='grid grid-cols-1 gap-12 pt-10 md:pt-14'>
        <PersonalInformation session={session} />
        <AccountSecurity
          userEmail={session.user.email}
          userAccounts={userAccounts}
        />
        <SessionManagement allSessions={allSessions} session={session} />
        <AccountLinking accounts={userAccounts} />
        <AccountDeletionDialog />
      </div>
    </AccountHeaderLayout>
  );
};

export default AccountSettingsPage;
