'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';

type AccountLinkingCardProps = {
  provider: string;
  description?: string;
  createdAt?: Date;
  isLinked: boolean;
  isPending: boolean;
  action: () => void;
  ProviderIcon?: {
    icon: IconType;
    color: string;
  };
};

const AccountLinkingCard = ({
  provider,
  description,
  createdAt,
  isLinked,
  isPending,
  ProviderIcon,
  action,
}: AccountLinkingCardProps) => {
  return (
    <Card className='rounded-md'>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {ProviderIcon ? (
              <ProviderIcon.icon className={`size-6 ${ProviderIcon.color}`} />
            ) : (
              <HiQuestionMarkCircle className='size-6 text-accent' />
            )}
            <div className='flex flex-col'>
              <h3 className='capitalize font-semibold text-base'>{provider}</h3>
              <p className='text-sm text-muted-foreground max-w-[250px] xl:max-w-none'>
                {isLinked && createdAt
                  ? `Linked on ${format(new Date(createdAt), 'M/d/yyyy')}`
                  : description}
              </p>
            </div>
          </div>
          <Button
            variant={isLinked ? 'destructive' : 'default'}
            size='sm'
            disabled={isPending}
            onClick={action}
          >
            {isLinked ? (
              <FaTrashAlt className='size-3' />
            ) : (
              <FaPlus className='size-3' />
            )}
            {isLinked ? 'Unlink' : 'Link'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountLinkingCard;
