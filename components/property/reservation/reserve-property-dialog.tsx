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
import { Property, Status } from '@/lib/generated/prisma/client';
import { usePathname } from 'next/navigation';
import LinkButton from '../../shared/link-button';
import { ArrowRightIcon } from 'lucide-react';
import { FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import ReservePropertyDialogForm from './reserve-property-dialog-form';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

type ReservePropertyDialogProps = {
  property: Property;
  session: typeof auth.$Infer.Session | null;
  reservationStatus?: Status;
};

const ReservePropertyDialog = ({
  property,
  session,
  reservationStatus,
}: ReservePropertyDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);

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

  const isAllowedToReserve =
    reservationStatus !== 'PENDING' && reservationStatus !== 'CONFIRMED';

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger render={<Button />}>
        {!isAllowedToReserve ? 'View Reservation' : 'Reserve Now'}
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
        {!isAllowedToReserve ? (
          <Alert variant='success'>
            <FaCalendarAlt className='size-5' />
            <AlertTitle>
              You have a {reservationStatus.toLowerCase()} reservation for this
              property. Please check your{' '}
              <Link href='/account/reservations'>reservations</Link> in your
              account settings for details.
            </AlertTitle>
          </Alert>
        ) : (
          <div className='space-y-6 pt-2'>
            <ReservePropertyDialogForm
              session={session}
              property={property}
              setOpenDialog={setOpenDialog}
            />
            <Link
              href='/reservation-info'
              className='text-sm font-medium block text-center text-muted-foreground'
            >
              Not sure?{' '}
              <span className='text-[#ff6b00] underline-offset-2 hover:underline'>
                Learn how property viewings work.
              </span>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservePropertyDialog;
