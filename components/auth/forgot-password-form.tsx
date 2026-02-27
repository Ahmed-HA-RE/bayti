'use client';

import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { ForgotPasswordFormData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schema/auth';
import { Button } from '../ui/button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { authClient } from '@/lib/authClient';
import { SERVER_URL } from '@/lib/constants';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  if (!executeRecaptcha) {
    return;
  }

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const token = await executeRecaptcha('forgot_password');
    const res = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: `${SERVER_URL}/reset-password`,
      fetchOptions: {
        headers: {
          'x-captcha-response': token,
        },
      },
    });
    if (res.error) {
      toast.error(
        res.error.message ||
          'An error occurred while requesting password reset',
      );
      return;
    }
    router.push('/forgot-password/sent');
  };

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
        <Button disabled={form.formState.isSubmitting} type='submit'>
          {form.formState.isSubmitting ? (
            <Spinner className='size-6' />
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </FieldGroup>
      <Link className='text-sm text-center mt-6 block' href='/login'>
        Back to login
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
