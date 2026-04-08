'use client';

import { Controller, useForm } from 'react-hook-form';
import { SetupPasswordFormData, setupPasswordSchema } from '@/schema/user';
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
import toast from 'react-hot-toast';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { GoAlertFill } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { setupPassword } from '@/lib/actions/user/setup-password';

const SetupPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const router = useRouter();
  const form = useForm<SetupPasswordFormData>({
    resolver: zodResolver(setupPasswordSchema),
    defaultValues: {
      setPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SetupPasswordFormData) => {
    const res = await setupPassword(data);
    if (!res.success) {
      form.setError('root', { message: res.message });
      return;
    }
    toast.success(res.message);
    form.reset();
    router.refresh();
  };

  const isPending = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Set Password */}
        <Controller
          name='setPassword'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Set Password <span className='text-destructive'>*</span>
              </FieldLabel>
              <div className='relative'>
                <Input
                  id={field.name}
                  type={isVisible ? 'text' : 'password'}
                  placeholder='Set Password'
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
                  onClick={() => setIsConfirmVisible((prevState) => !prevState)}
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
  );
};

export default SetupPassword;
