'use client';

import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { LoginFormData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/auth';
import Link from 'next/link';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {};

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
        <Button type='submit' className='w-full'>
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
