'use client';

import {
  TwoStepBackupCodeFormData,
  TwoStepBackupCodeOutputFormData,
  twoStepBackupCodeSchema,
} from '@/schema/two-step';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const BackUpCodeForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const router = useRouter();
  const form = useForm<
    TwoStepBackupCodeFormData,
    unknown,
    TwoStepBackupCodeOutputFormData
  >({
    resolver: zodResolver(twoStepBackupCodeSchema),
    defaultValues: {
      backupCode: '',
      trustDevice: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: TwoStepBackupCodeFormData) => {
    try {
      const { error } = await authClient.twoFactor.verifyBackupCode(
        {
          code: data.backupCode,
          trustDevice: data.trustDevice,
          disableSession: false,
        },
        {
          onSuccess: () => {
            toast.success('Backup code verified successfully');
            form.reset();
            router.push(callbackUrl);
          },
        },
      );
      if (error) {
        throw new Error(error.message);
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
        {/* Backup code */}
        <Controller
          name='backupCode'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
          {isSubmitting ? 'Verifying...' : 'Verify Backup Code'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default BackUpCodeForm;
