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
import LinkButton from '../shared/main-link-button';
import { FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import BookVisitDialogForm from './book-visit-dialog-form';

type BookVisitDialogProps = {
  property: Property;
  session: typeof auth.$Infer.Session | null;
  booking?: Status;
};

const BookVisitDialog = ({
  property,
  session,
  booking,
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
    booking !== 'PENDING' && booking !== 'CONFIRMED';

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger render={<Button />}>
        {!isAllowedToRequestViewing ? 'View Booking' : 'Book a Visit'}
        <FaCalendarAlt className='size-4' />
      </DialogTrigger>
      <DialogContent className='gap-6 px-6 sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl md:text-2xl font-normal leading-tight mb-0.5'>
            Schedule a visit for{' '}
            <span className='font-semibold'>{property.name}</span>
          </DialogTitle>
          <DialogDescription className='text-sm md:text-base'>
            Choose your preferred date and time to arrange a property visit.
          </DialogDescription>
        </DialogHeader>
        {!isAllowedToRequestViewing ? (
          <Alert variant='success'>
            <FaCalendarAlt className='size-5' />
            <AlertTitle>
              You have a {booking?.toLowerCase()} reservation for this property.
              Please check your <Link href='/account/bookings'>bookings</Link>{' '}
              in your account for more details.
            </AlertTitle>
          </Alert>
        ) : (
          <div className='space-y-6 pt-2'>
            <BookVisitDialogForm
              session={session}
              property={property}
              setOpenDialog={setOpenDialog}
            />
            <Link
              href='/booking-info'
              className='text-xs md:text-sm font-medium block text-center text-muted-foreground'
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
