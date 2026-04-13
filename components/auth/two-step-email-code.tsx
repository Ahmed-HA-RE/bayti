'use client';

import { authClient } from '@/lib/authClient';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import TwoStepOTPForm from './two-step-otp-form';

const TwoStepEmailCode = ({ callbackUrl }: { callbackUrl: string }) => {
  const [steps, setSteps] = useState<'idle' | 'sent'>('idle');
  const [isPending, startTransition] = useTransition();

  const handleSendOTP = () => {
    startTransition(async () => {
      try {
        const { data, error } = await authClient.twoFactor.sendOtp();
        if (data) {
          setSteps('sent');
          toast.success('OTP sent to your email successfully');
        } else {
          throw new Error(
            error.message || 'Failed to send OTP. Please try again.',
          );
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        toast.error(errorMessage);
      }
    });
  };

  if (steps === 'sent') {
    return <TwoStepOTPForm callbackUrl={callbackUrl} mode='email-code' />;
  }

  if (steps === 'idle') {
    return (
      <div className='flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto'>
        {/* Info Section */}
        <div className='flex flex-col items-center text-center space-y-3'>
          {/* Icon */}
          <div className='relative'>
            <div className='relative bg-accent/10 p-4 rounded-full'>
              <Mail className='size-8 text-primary' />
            </div>
          </div>

          {/* Text Content */}
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-foreground'>
              Send verification code
            </h3>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              We&apos;ll send a one-time code to your email address. Use this
              code to securely sign in to your account.
            </p>
          </div>
        </div>

        {/* Send Button */}
        <Button
          disabled={isPending}
          className='w-full font-medium rounded-full'
          onClick={handleSendOTP}
          size='sm'
        >
          {isPending ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </div>
    );
  }
};

export default TwoStepEmailCode;
