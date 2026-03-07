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
import { FaCreditCard } from 'react-icons/fa6';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../../ui/separator';
import { PROPERTY_RESERVE_BULLET_POINTS } from '@/lib/constants';
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
        <FaCreditCard className='size-4' />
      </DialogTrigger>
      <DialogContent className='gap-0 px-0 sm:max-w-2xl'>
        <DialogHeader className='px-6 pb-8'>
          <DialogTitle className='text-2xl font-normal leading-tight'>
            Reserve <span className='font-semibold'>{property.name}</span>
          </DialogTitle>
          <DialogDescription className='text-sm'>
            Secure your preferred time to view this property.
          </DialogDescription>
        </DialogHeader>

        {/* Reservation Information */}
        <div className='space-y-5 px-6'>
          <h3 className='text-lg font-semibold tracking-tight'>
            What is Property Reservation?
          </h3>
          <ol className='ml-5 list-decimal space-y-3 text-sm leading-relaxed text-muted-foreground'>
            {PROPERTY_RESERVE_BULLET_POINTS.map((point, index) => (
              <li key={index} className='pl-1.5'>
                {point}
              </li>
            ))}
          </ol>

          <Link
            href='/reservation-info'
            className='inline-flex w-full items-center justify-end gap-1.5 pt-1 text-sm font-medium text-[#ff6b00] underline-offset-2 hover:underline'
          >
            Read more about reserving a property
            <ArrowRightIcon className='size-3.5' />
          </Link>
        </div>

        <Separator className='my-6' />

        <div className='space-y-6 px-6'>
          <div className='flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3'>
            <p className='text-sm font-medium text-muted-foreground'>
              Reservation Fee:
            </p>
            <span className='flex items-center gap-1 text-lg font-semibold'>
              <span className='dirham-symbol !font-light'>&#xea;</span>
              {property.reserveFees.toString()}
            </span>
          </div>

          <ReservePropertyDialogForm session={session} property={property} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservePropertyDialog;
