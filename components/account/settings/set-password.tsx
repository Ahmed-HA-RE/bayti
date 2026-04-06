'use client';

import { Controller, useForm } from 'react-hook-form';
import SettingsCard from './settings-card';
import { SetPasswordFormData, setPasswordSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { RxEyeClosed } from 'react-icons/rx';
import { FaRegEye } from 'react-icons/fa';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { setPassword } from '@/lib/actions/user/set-password';
import toast from 'react-hot-toast';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { GoAlertFill } from 'react-icons/go';

const SetPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SetPasswordFormData) => {
    const res = await setPassword(data);
    if (!res.success) {
      form.setError('root', { message: res.message });
      return;
    }
    toast.success(res.message);
    form.reset();
  };

  const isPending = form.formState.isSubmitting;

  return (
    <SettingsCard
      title='Set a Password'
      subtitle='Add a password so you can sign in with your email and password in addition to your social login.'
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
            {isPending ? <Spinner className='size-4' /> : 'Set Password'}
          </Button>
        </FieldGroup>
      </form>
    </SettingsCard>
  );
};

export default SetPassword;
