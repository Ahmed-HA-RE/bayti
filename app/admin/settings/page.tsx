import EditUser from '@/components/shared/edit-user';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings',
};

const SettingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  return <EditUser id={session.user.id} />;
};

export default SettingsPage;
