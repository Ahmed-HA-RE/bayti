'use client';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { User2Icon, CalendarIcon } from 'lucide-react';
import { FiMail } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { auth } from '@/lib/auth';
import { Button } from '../../ui/button';
import { FaCreditCard } from 'react-icons/fa6';
import { Property } from '@/lib/generated/prisma/client';

type ReservePropertyDialogFormProps = {
  session: typeof auth.$Infer.Session;
  property: Property;
};

const ReservePropertyDialogForm = ({
  session,
  property,
}: ReservePropertyDialogFormProps) => {
  return (
    <form className='flex flex-col gap-5'>
      {/* Name */}
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium'>Full Name</label>
        <InputGroup>
          <InputGroupAddon>
            <User2Icon className='size-4' />
          </InputGroupAddon>
          <InputGroupInput
            placeholder='Enter your full name'
            defaultValue={session.user.name}
          />
        </InputGroup>
      </div>

      {/* Email */}
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium'>Email Address</label>
        <InputGroup>
          <InputGroupAddon>
            <FiMail className='size-4' />
          </InputGroupAddon>
          <InputGroupInput
            type='email'
            placeholder='Enter your email address'
            defaultValue={session.user.email}
          />
        </InputGroup>
      </div>

      {/* Phone */}
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium'>Phone Number</label>
        <InputGroup>
          <InputGroupAddon>
            <BsTelephone className='size-4' />
          </InputGroupAddon>
          <InputGroupInput
            type='tel'
            placeholder='Enter your phone number'
            defaultValue={session.user.phoneNumber || ''}
          />
        </InputGroup>
      </div>

      {/* Date Picker Placeholder */}
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium'>Preferred Visit Date</label>
        <InputGroup>
          <InputGroupAddon>
            <CalendarIcon className='size-4' />
          </InputGroupAddon>
          <InputGroupInput
            placeholder='Select a date for your property visit'
            readOnly
          />
        </InputGroup>
      </div>
      <Button type='submit' className='w-full max-w-md mx-auto'>
        <FaCreditCard className='size-4' />
        Proceed to Checkout
      </Button>
    </form>
  );
};

export default ReservePropertyDialogForm;
