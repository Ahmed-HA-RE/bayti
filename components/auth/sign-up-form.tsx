'use client';

import { useState } from 'react';

import { CheckCircle2Icon, EyeIcon, EyeOffIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '../ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schema/auth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { FcGoogle } from 'react-icons/fc';
import { SignUpFormData } from '@/types/auth';
import signUpUser from '@/lib/actions/auth/sign-up-user';
import { Alert, AlertTitle } from '../ui/alert';

const SignUpForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const callbackUrl = useSearchParams().get('callbackUrl') || '/';

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const res = await signUpUser(data);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setSuccessMessage(res.message);
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
        <FieldSeparator className='text-foreground '>
          Or continue with
        </FieldSeparator>
        {/* Social Login */}
        <Button variant='outline' className='w-full text-sm'>
          <FcGoogle className='size-5' />
          Sign in with Google
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
