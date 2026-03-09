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
import LinkButton from '../shared/link-button';
import { FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import ViewingRequestDialogForm from './book-visit-dialog-form';

type BookVisitDialogProps = {
  property: Property;
  session: typeof auth.$Infer.Session | null;
  reservationStatus?: Status;
};

const BookVisitDialog = ({
  property,
  session,
  reservationStatus,
}: BookVisitDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const pathname = usePathname();

  // If no session, show login link
  if (!session) {
    return (
      <LinkButton href={`/login?callbackUrl=${pathname}`} className='group'>
        Book a Visit
        <FaCalendarAlt className='size-4' />
      </LinkButton>
    );
  }

  const isAllowedToRequestViewing =
    reservationStatus !== 'PENDING' && reservationStatus !== 'CONFIRMED';

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger render={<Button />}>
        {!isAllowedToRequestViewing ? 'View Booking' : 'Book a Visit'}
        <FaCalendarAlt className='size-4' />
      </DialogTrigger>
      <DialogContent className='gap-6 px-6 sm:max-w-2xl'>
        <DialogHeader className=''>
          <DialogTitle className='text-3xl font-normal leading-snug mb-2'>
            Book a visit for:{' '}
            <span className='font-semibold'>{property.name}</span>
          </DialogTitle>
          <DialogDescription className='text-base'>
            Submit your preferred date and time to schedule a property viewing.
          </DialogDescription>
        </DialogHeader>
        {!isAllowedToRequestViewing ? (
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
            <ViewingRequestDialogForm
              session={session}
              property={property}
              setOpenDialog={setOpenDialog}
            />
            <Link
              href='/booking-info'
              className='text-sm font-medium block text-center text-muted-foreground'
            >
              Not sure?{' '}
              <span className='text-[#ff6b00] underline-offset-2 hover:underline'>
                Learn how booking a property works.
              </span>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookVisitDialog;
