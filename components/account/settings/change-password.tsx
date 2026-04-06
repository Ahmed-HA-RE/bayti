'use client';

import { ChangePasswordFormData, changePasswordSchema } from '@/schema/user';
import SettingsCard from './settings-card';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RxEyeClosed } from 'react-icons/rx';
import { FaRegEye } from 'react-icons/fa';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { GoAlertFill } from 'react-icons/go';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/authClient';
import { SERVER_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

const ChangePassword = ({ userEmail }: { userEmail: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSendingReset, startTransition] = useTransition();
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(
      changePasswordSchema,
    ) as Resolver<ChangePasswordFormData>,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      revokeSession: false,
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const res = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: data.revokeSession,
    });
    if (res.error) {
      form.setError('root', { message: res.error.message });
      return;
    }
    toast.success('Password changed successfully');
    form.reset();
  };

  const handleForgotPassword = () => {
    startTransition(async () => {
      try {
        const { data, error } = await authClient.requestPasswordReset({
          email: userEmail,
          redirectTo: `${SERVER_URL}/reset-password`,
        });

        if (data && !error) {
          toast.success('Reset link sent. Please check your inbox.');
        } else if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
        );
      }
    });
  };

  const isPending = form.formState.isSubmitting;

  return (
    <SettingsCard
      title='Password'
      subtitle='Change your password. Leave blank to keep the same password.'
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Current Password */}
          <Controller
            name='currentPassword'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className='flex items-center justify-between'>
                  <FieldLabel htmlFor={field.name}>
                    Current Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <Button
                    variant='ghost'
                    size='sm'
                    disabled={isSendingReset}
                    className='px-2 py-0 text-accent underline underline-offset-2 text-sm'
                    type='button'
                    onClick={handleForgotPassword}
                  >
                    Forgot?
                  </Button>
                </div>
                <div className='relative'>
                  <Input
                    id={field.name}
                    type={isVisible ? 'text' : 'password'}
                    placeholder='Password'
                    className='pr-9 text-foreground'
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsVisible((prevState) => !prevState)}
                    className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} absolute top-2 right-0 rounded-l-none border-0 `}
                    type='button'
                  >
                    {isVisible ? <RxEyeClosed /> : <FaRegEye />}
                    <span className='sr-only'>
                      {isVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* New Password */}
          <Controller
            name='newPassword'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  New Password <span className='text-destructive'>*</span>
                </FieldLabel>
                <div className='relative'>
                  <Input
                    id={field.name}
                    type={isNewVisible ? 'text' : 'password'}
                    placeholder='New Password'
                    className='pr-9 text-foreground'
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsNewVisible((prevState) => !prevState)}
                    className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} absolute top-2 right-0 rounded-l-none border-0 `}
                    type='button'
                  >
                    {isNewVisible ? <RxEyeClosed /> : <FaRegEye />}
                    <span className='sr-only'>
                      {isNewVisible ? 'Hide password' : 'Show password'}
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
                <FieldLabel htmlFor={field.name}>
                  Confirm Password <span className='text-destructive'>*</span>
                </FieldLabel>
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
                    onClick={() =>
                      setIsConfirmVisible((prevState) => !prevState)
                    }
                    className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} absolute top-2 right-0 rounded-l-none border-0 `}
                    type='button'
                  >
                    {isConfirmVisible ? <RxEyeClosed /> : <FaRegEye />}
                    <span className='sr-only'>
                      {isConfirmVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Revoke other sessions */}
          <Controller
            name='revokeSession'
            control={form.control}
            render={({ field }) => (
              <Field orientation='horizontal'>
                <Checkbox
                  id={field.name}
                  className='cursor-pointer'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>
                  Log out of all other sessions
                </FieldLabel>
              </Field>
            )}
          />

          {form.formState.errors.root && (
            <Alert variant='error'>
              <GoAlertFill />
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          )}
          <Button
            type='submit'
            className='self-end rounded-full min-w-25'
            size='sm'
            disabled={isPending}
          >
            {isPending ? <Spinner className='size-4' /> : 'Change Password'}
          </Button>
        </FieldGroup>
      </form>
    </SettingsCard>
  );
};

export default ChangePassword;
