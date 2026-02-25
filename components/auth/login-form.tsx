'use client';

import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '../ui/field';
import { LoginFormData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/auth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import loginUser from '@/lib/actions/auth/login-user';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const callbackUrl = useSearchParams().get('callbackUrl') || '/';
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await loginUser(data);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    router.push(callbackUrl);
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
                  className={`${fieldState.error ? 'text-destructive' : 'text-foreground'} focus-visible:ring-ring/50 absolute top-2 right-0 rounded-l-none hover:bg-transparent`}
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
        <div className='flex items-center justify-between'>
          {/* Remember Me */}
          <Controller
            name='rememberMe'
            control={form.control}
            render={({ field }) => (
              <Field orientation='horizontal' className='w-auto'>
                <Checkbox
                  id={field.name}
                  className='data-[state=checked]:bg-primary'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name} className='text-sm'>
                  Remember Me
                </FieldLabel>
              </Field>
            )}
          />
          <Link
            href={'/forgot-password'}
            className='text-foreground hover:underline cursor-pointer text-sm text-right w-auto'
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner className='size-6' data-icon='inline-start' />
          ) : (
            'Sign In'
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
          Don&apos;t have any account?{' '}
          <Link
            href={`/signup?callbackUrl=${callbackUrl}`}
            className='text-foreground hover:underline'
          >
            Sign Up
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
