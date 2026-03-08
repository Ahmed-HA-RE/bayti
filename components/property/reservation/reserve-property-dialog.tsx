'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { auth } from '@/lib/auth';
import { Property } from '@/lib/generated/prisma/client';
import { usePathname } from 'next/navigation';
import LinkButton from '../../shared/link-button';
import { ArrowRightIcon } from 'lucide-react';
import { FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import ReservePropertyDialogForm from './reserve-property-dialog-form';

type ReservePropertyDialogProps = {
  property: Property;
  session: typeof auth.$Infer.Session | null;
};

const ReservePropertyDialog = ({
  property,
  session,
}: ReservePropertyDialogProps) => {
  const pathname = usePathname();

  // If no session, show login link
  if (!session) {
    return (
      <LinkButton href={`/login?callbackUrl=${pathname}`} className='group'>
        Reserve Now
        <ArrowRightIcon className='transition-transform group-hover:translate-x-1' />
      </LinkButton>
    );
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        Reserve Now
        <FaCalendarAlt className='size-4' />
      </DialogTrigger>
      <DialogContent className='gap-6 px-6 sm:max-w-2xl'>
        <DialogHeader className=''>
          <DialogTitle className='text-3xl font-normal leading-tight mb-0.5'>
            Reserve <span className='font-semibold'>{property.name}</span>
          </DialogTitle>
          <DialogDescription className='text-base'>
            Secure your preferred time to view this property.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 pt-2'>
          <ReservePropertyDialogForm session={session} property={property} />
        </div>
        <Link
          href='/reservation-info'
          className='text-sm font-medium text-center'
        >
          Not sure?{' '}
          <span className='hover:text-[#ff6b00] underline-offset-2 hover:underline'>
            Learn how property viewings work.
          </span>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default ReservePropertyDialog;
