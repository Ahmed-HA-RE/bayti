import ChangePasswordForm from './change-password-form';
import SettingsCard from './settings-card';
import { Account } from 'better-auth';
import SetupPassword from './setup-password';

const AccountPassword = ({
  userEmail,
  userAccounts,
}: {
  userEmail: string;
  userAccounts: Account[];
}) => {
  const hasPassword = userAccounts.some((a) => a.providerId === 'credential');

  return (
    <SettingsCard
      title='Account Password'
      subtitle='Manage your account password.'
    >
      {hasPassword ? (
        <ChangePasswordForm userEmail={userEmail} />
      ) : (
        <SetupPassword />
      )}
    </SettingsCard>
  );
};

export default AccountPassword;
