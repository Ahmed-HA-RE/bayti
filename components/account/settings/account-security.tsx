import ChangePasswordForm from './change-password-form';
import SettingsCard from './settings-card';
import { Account } from 'better-auth';
import TwoStepVerification from './two-step-verification';
import SetupPassword from './setup-password';
const AccountSecurity = ({
  userEmail,
  userAccounts,
}: {
  userEmail: string;
  userAccounts: Account[];
}) => {
  const hasPassword = userAccounts.some((a) => a.providerId === 'credential');

  return (
    <SettingsCard
      title='Account Security'
      subtitle='Manage your password and 2FA settings.'
    >
      {hasPassword ? (
        <div className='space-y-6'>
          <ChangePasswordForm userEmail={userEmail} />
          <TwoStepVerification />
        </div>
      ) : (
        <SetupPassword />
      )}
    </SettingsCard>
  );
};

export default AccountSecurity;
