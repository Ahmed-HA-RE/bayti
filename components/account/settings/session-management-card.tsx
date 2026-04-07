'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SessionManagementCardProps = {
  browser: string;
  os: string;
  DeviceIcon: React.ElementType;
  createdAt: string;
  expiresAt: string;
  isCurrentSession?: boolean;
};

const SessionManagementCard = ({
  browser,
  os,
  DeviceIcon,
  createdAt,
  expiresAt,
  isCurrentSession,
}: SessionManagementCardProps) => {
  return (
    <Card className='bg-orange-50 border-accent/50 rounded-md gap-6.5'>
      <CardHeader className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
        <CardTitle className='text-accent text-lg font-semibold'>
          {browser}, {os}
        </CardTitle>
        {isCurrentSession && <Badge className='rounded'>Current Session</Badge>}
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2.5'>
          <DeviceIcon className='text-foreground size-9' />
          <div className='flex flex-col'>
            <p className='text-muted-foreground font-medium'>
              Created: {createdAt}
            </p>
            <p className='text-muted-foreground font-medium'>
              Expires: {expiresAt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManagementCard;
