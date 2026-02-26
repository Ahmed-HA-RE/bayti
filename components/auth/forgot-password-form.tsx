'use client';

import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { ForgotPasswordFormData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schema/auth';
import { Button } from '../ui/button';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Email */}
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type='email'
                placeholder='Enter your email address'
                className='text-foreground'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type='submit'>Send Reset Link</Button>
      </FieldGroup>
      <Link className='text-sm text-center mt-6 block' href='/login'>
        Back to login
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
