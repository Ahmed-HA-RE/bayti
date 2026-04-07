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
import { Button } from '@/components/ui/button';

type SessionManagementProps = {
  session: Session;
  allSessions: Session[];
};

const SessionManagement = ({
  session,
  allSessions,
}: SessionManagementProps) => {
  const currentSession = allSessions.filter(
    (s) => s.token === session.token,
  )[0];

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

  const formatOtherSessions = otherSessions.map((s) => formatUAParser(s));

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
      {formatOtherSessions.length > 0 && (
        <div className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col justify-between xl:items-center gap-2 xl:flex-row'>
            <h4 className='text-lg font-medium'>Other Active Sessions</h4>
            <Button
              className='bg-red-500 text-white hover:bg-red-600'
              size='sm'
            >
              Revoke Other Sessions
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-2'>
            {formatOtherSessions.map((sessionInfo, index) => (
              <SessionManagementCard
                browser={sessionInfo.browser}
                os={sessionInfo.os}
                DeviceIcon={
                  devicesIcons[sessionInfo.device as keyof typeof devicesIcons]
                }
                key={index}
                createdAt={sessionInfo.createdAt}
                expiresAt={sessionInfo.expiresAt}
              />
            ))}
          </div>
        </div>
      )}
    </SettingsCard>
  );
};

export default SessionManagement;
