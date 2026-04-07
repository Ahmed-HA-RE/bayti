'use client';

import SettingsCard from './settings-card';
import { Session } from 'better-auth';
import { formatUAParser } from '@/lib/utils';
import { TbDeviceDesktop } from 'react-icons/tb';
import {
  HiMiniDeviceTablet,
  HiOutlineDevicePhoneMobile,
} from 'react-icons/hi2';
import { MdOutlineDeviceUnknown } from 'react-icons/md';
import SessionManagementCard from './session-management-card';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import RevokeSessionDialog from './revoke-session-dialog';

type SessionManagementProps = {
  session: Session;
  allSessions: Session[];
};

const SessionManagement = ({
  session,
  allSessions,
}: SessionManagementProps) => {
  const router = useRouter();

  const currentSession = allSessions.find((s) => s.token === session.token)!;

  const devicesIcons = {
    mobile: HiOutlineDevicePhoneMobile,
    tablet: HiMiniDeviceTablet,
    desktop: TbDeviceDesktop,
    unknown: MdOutlineDeviceUnknown,
  };

  const { browser, createdAt, expiresAt, os, device } =
    formatUAParser(currentSession);

  const currentDeviceIcon = devicesIcons[device as keyof typeof devicesIcons];

  const otherSessions = allSessions.filter(
    (s) => s.token !== currentSession.token,
  );

  const handleRevokeSession = async (token: string) => {
    try {
      const res = await authClient.revokeSession({ token });

      if (res.error) {
        throw new Error(res.error.message);
      }
      toast.success('Session revoked successfully');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred while revoking the session',
      );
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      const res = await authClient.revokeOtherSessions();

      if (res.error) {
        throw new Error(res.error.message);
      }
      toast.success('All sessions revoked successfully');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred while revoking all sessions',
      );
    }
  };

  return (
    <SettingsCard
      title='Session Management'
      subtitle='Manage your active sessions across devices.'
    >
      {/* Current Active Session */}
      <SessionManagementCard
        browser={browser}
        createdAt={createdAt}
        expiresAt={expiresAt}
        os={os}
        DeviceIcon={currentDeviceIcon}
        isCurrentSession={true}
      />
      {/* Other Active Sessions */}
      {otherSessions.length > 0 && (
        <div className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col justify-between xl:items-center gap-2 xl:flex-row'>
            <h4 className='text-lg font-medium'>Other Active Sessions</h4>
            <RevokeSessionDialog
              allSessions={true}
              onRevoke={handleRevokeAllSessions}
            />
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {otherSessions.map((sessionInfo, index) => {
              const { browser, createdAt, expiresAt, os, device } =
                formatUAParser(sessionInfo);

              return (
                <SessionManagementCard
                  browser={browser}
                  os={os}
                  DeviceIcon={devicesIcons[device as keyof typeof devicesIcons]}
                  key={index}
                  createdAt={createdAt}
                  expiresAt={expiresAt}
                  onRevoke={() => handleRevokeSession(sessionInfo.token)}
                />
              );
            })}
          </div>
        </div>
      )}
    </SettingsCard>
  );
};

export default SessionManagement;
