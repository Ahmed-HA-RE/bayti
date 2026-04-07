'use client';

import { Account } from '@/lib/generated/prisma';
import SettingsCard from './settings-card';
import { FaDropbox } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Card, CardContent } from '@/components/ui/card';
import { APP_PROVIDERS } from '@/lib/constants';
import AccountLinkingCard from './account-linking-card';
import { useTransition } from 'react';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const providers = [
  {
    value: 'google',
    label: 'Google',
    icon: FcGoogle,
    color: 'text-transparent',
  },
  {
    value: 'dropbox',
    label: 'Dropbox',
    icon: FaDropbox,
    color: 'text-blue-600',
  },
];
const AccountLinking = ({ accounts }: { accounts: Account[] }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const oauthProviders = accounts.filter((a) => a.providerId !== 'credential');

  const linkedProviders = oauthProviders.filter((provider) => {
    return APP_PROVIDERS.includes(provider.providerId);
  });

  const unlinkedProviders = APP_PROVIDERS.filter((provider) =>
    oauthProviders.every((linked) => linked.providerId !== provider),
  );

  const getProviderIconData = (providerId: string) => {
    return providers.find((p) => p.value === providerId);
  };

  const handleUnlinkProvider = (providerId: string, accountId: string) => {
    startTransition(async () => {
      try {
        const res = await authClient.unlinkAccount({
          providerId,
          accountId,
        });

        if (res.error) {
          throw new Error(res.error.message || 'Failed to unlink account');
        }

        toast.success('Account unlinked successfully');
        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(errorMessage);
      }
    });
  };

  const handleLinkAccount = (provider: string) => {
    startTransition(async () => {
      try {
        const res = await authClient.linkSocial({
          provider,
          callbackURL: '/account/settings',
        });

        if (res.error) {
          throw new Error(res.error.message || 'Failed to link account');
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <SettingsCard
      title='Account Linking'
      subtitle='Manage your linked accounts and social logins'
    >
      <h4 className='text-xl font-medium mb-4'>Linked Accounts</h4>
      {linkedProviders.length === 0 ? (
        <Card className='rounded-md'>
          <CardContent className='text-center'>
            You have no linked accounts.
          </CardContent>
        </Card>
      ) : (
        // Linked Providers List
        <div className='grid grid-cols-1 gap-4'>
          {linkedProviders.map((account) => {
            const ProviderIcon = getProviderIconData(account.providerId);
            return (
              <AccountLinkingCard
                key={account.id}
                isLinked={true}
                ProviderIcon={ProviderIcon}
                provider={account.providerId}
                createdAt={account.createdAt}
                isPending={isPending}
                action={() =>
                  handleUnlinkProvider(account.providerId, account.accountId)
                }
              />
            );
          })}
        </div>
      )}
      {/* Unlinked Providers List */}
      {unlinkedProviders.length > 0 && (
        <div className='mt-8 space-y-4'>
          <h4 className='text-xl font-medium mt-8'>Link Other Accounts</h4>
          <div className='grid grid-cols-1 gap-4'>
            {unlinkedProviders.map((provider, index) => {
              const ProviderIcon = getProviderIconData(provider);
              return (
                <AccountLinkingCard
                  key={index}
                  isLinked={false}
                  ProviderIcon={ProviderIcon}
                  description={`Link your ${provider} account for easier login and enhanced security.`}
                  provider={provider}
                  action={() => handleLinkAccount(provider)}
                  isPending={isPending}
                />
              );
            })}
          </div>
        </div>
      )}
    </SettingsCard>
  );
};

export default AccountLinking;
