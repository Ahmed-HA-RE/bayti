'use client';

import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Spinner } from '../ui/spinner';
import { resetPasswordSchema } from '@/schema/auth';
import { ResetPasswordFormData } from '@/types/auth';
import { authClient } from '@/lib/authClient';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const token = useSearchParams().get('token');
  const router = useRouter();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (token) {
      const res = await authClient.resetPassword({
        newPassword: data.newPassword,
        token,
      });

      if (res.error) {
        if (res.error.code === 'INVALID_TOKEN') {
          toast.error(
            'Invalid or expired url. Please request a new password reset.',
          );
        } else {
          toast.error('User not found');
        }
        return;
      }

      toast.success('Password reset successfully!');

      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Password */}
        <Controller
          name='newPassword'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <div className='relative'>
                <Input
                  id={field.name}
                  type={isVisible ? 'text' : 'password'}
                  placeholder='New Password'
                  className='pr-9 text-foreground'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsVisible((prevState) => !prevState)}
                  className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} absolute top-2 right-0 rounded-l-none border-0 `}
                >
                  {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>
                    {isVisible ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Confirm Password */}
        <Controller
          name='confirmPassword'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <div className='relative'>
                <Input
                  id={field.name}
                  type={isConfirmVisible ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  className='pr-9 text-foreground'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsConfirmVisible((prevState) => !prevState)}
                  className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} absolute top-2 right-0 rounded-l-none border-0 `}
                >
                  {isConfirmVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>
                    {isConfirmVisible ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner className='size-6' />
          ) : (
            'Reset Password'
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
