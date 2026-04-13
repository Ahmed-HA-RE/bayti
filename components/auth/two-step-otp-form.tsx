'use client';

import {
  TwoStepOtpFormData,
  TwoStepOtpOutputFormData,
  twoStepOtpSchema,
} from '@/schema/two-step';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TwoFactorOTPInput from '../shared/two-factor-otp-input';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { Checkbox } from '../ui/checkbox';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';

const TwoStepOTPForm = ({
  mode,
  callbackUrl,
}: {
  mode: 'totp' | 'email-code';
  callbackUrl: string;
}) => {
  const router = useRouter();
  const form = useForm<TwoStepOtpFormData, unknown, TwoStepOtpOutputFormData>({
    resolver: zodResolver(twoStepOtpSchema),
    defaultValues: {
      otp: '',
      trustDevice: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: TwoStepOtpOutputFormData) => {
    try {
      const { otp, trustDevice } = data;
      if (mode === 'totp') {
        const { error } = await authClient.twoFactor.verifyTotp(
          {
            code: otp,
            trustDevice,
          },
          {
            onSuccess: () => {
              toast.success('OTP verified successfully');
              form.reset();
              router.push(callbackUrl);
            },
          },
        );
        if (error) {
          throw new Error(error.message);
        }
      } else if (mode === 'email-code') {
        const { error } = await authClient.twoFactor.verifyOtp(
          {
            code: otp,
            trustDevice,
          },
          {
            onSuccess: () => {
              toast.success('OTP verified successfully');
              form.reset();
              router.push(callbackUrl);
            },
          },
        );
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='otp'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className='max-w-xs mx-auto'
              data-invalid={fieldState.invalid}
            >
              <TwoFactorOTPInput
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Trusted device */}
        <Controller
          name='trustDevice'
          control={form.control}
          render={({ field }) => (
            <Field orientation='horizontal' className='!gap-2'>
              <Checkbox
                className='size-4'
                id={field.name}
                aria-label='Trust this device'
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <FieldLabel
                htmlFor={field.name}
                className='text-sm cursor-pointer'
              >
                Trust this device
              </FieldLabel>
            </Field>
          )}
        />

        <Button
          size='sm'
          className='rounded-full'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default TwoStepOTPForm;
