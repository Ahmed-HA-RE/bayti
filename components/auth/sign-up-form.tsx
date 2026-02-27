'use client';

import { useState } from 'react';
import { CheckCircle2Icon, EyeIcon, EyeOffIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schema/auth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Spinner } from '../ui/spinner';
import { SignUpFormData } from '@/types/auth';
import { Alert, AlertTitle } from '../ui/alert';
import { authClient } from '@/lib/authClient';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SignUpForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  if (!executeRecaptcha) {
    return;
  }

  const onSubmit = async (data: SignUpFormData) => {
    const token = await executeRecaptcha('sign_up');

    const res = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: callbackUrl,
      fetchOptions: {
        headers: {
          'x-captcha-response': token,
        },
      },
    });
    if (res.error) {
      toast.error(res.error.message || 'An error occurred during sign up');
      return;
    }
    setSuccessMessage(
      'Account created successfully! Please check your email to verify your account.',
    );
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {successMessage && (
        <Alert className='rounded-lg border-l-6 border-green-400 bg-white text-green-400 mb-4 flex items-start justify-between'>
          <CheckCircle2Icon className='size-5' />
          <AlertTitle className='text-slate-700 flex-1'>
            {successMessage}
          </AlertTitle>
          <button
            className='cursor-pointer ml-4'
            onClick={() => setSuccessMessage('')}
          >
            <X className='size-4 text-slate-700' />
          </button>
        </Alert>
      )}

      <FieldGroup>
        {/* Name */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                type='text'
                placeholder='Enter your full name'
                className='text-foreground'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        {/* Password */}
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
            <Spinner className='size-6' data-icon='inline-start' />
          ) : (
            'Sign Up'
          )}
        </Button>

        <p className='text-muted-foreground text-center mt-2 text-sm'>
          Have an account?{' '}
          <Link
            href={`/login?callbackUrl=${callbackUrl}`}
            className='text-foreground hover:underline'
          >
            Login
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
};

export default SignUpForm;
