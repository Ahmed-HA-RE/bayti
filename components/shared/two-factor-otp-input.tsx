'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';

const TwoFactorOTPInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={value}
      onChange={(value) => onChange(value)}
    >
      <InputOTPGroup className='gap-2 *:data-[slot=input-otp-slot]:rounded-none *:data-[slot=input-otp-slot]:border'>
        <InputOTPSlot index={0} className='size-10' />
        <InputOTPSlot index={1} className='size-10' />
        <InputOTPSlot index={2} className='size-10' />
      </InputOTPGroup>
      <InputOTPSeparator className="[&_svg:not([class*='size-'])]:size-8 text-accent" />
      <InputOTPGroup className='gap-2 *:data-[slot=input-otp-slot]:rounded-none *:data-[slot=input-otp-slot]:border'>
        <InputOTPSlot index={3} className='size-10' />
        <InputOTPSlot index={4} className='size-10' />
        <InputOTPSlot index={5} className='size-10' />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default TwoFactorOTPInput;
