'use client';

import { auth } from '@/lib/auth';
import { ContactUsFormData, contactUsSchema } from '@/schema/contact-us';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

const ContactUsForm = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const form = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: session?.user.name || '',
      email: session?.user.email || '',
      phoneNumber: session?.user.phoneNumber || '',
      message: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ContactUsFormData) => {
    console.log(data);
  };

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name */}
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  type='text'
                  placeholder='Enter your full name'
                  {...field}
                  className='bg-gray-100 text-base placeholder:text-base border-gray-100 h-14'
                  aria-invalid={fieldState.invalid}
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
                  {...field}
                  className='bg-gray-100 text-base placeholder:text-base border-gray-100 h-14'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        {/* Phone */}
        <Controller
          name='phoneNumber'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
              <div className='flex rounded-md'>
                <span
                  className={cn(
                    'inline-flex items-center rounded-l-md px-3 bg-gray-100 border border-gray-100',
                    fieldState.invalid && 'border-destructive',
                  )}
                >
                  <Image
                    src='/svg/uae-flag.svg'
                    alt='UAE Flag'
                    width={34}
                    height={34}
                  />
                </span>
                <Input
                  type='tel'
                  placeholder='Enter your phone number'
                  className='-ms-px rounded-l-none shadow-none bg-gray-100 text-base placeholder:text-base border-gray-100 border-l-gray-200 h-14'
                  id={field.name}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.error && (
                <FieldError className='text-xs' errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        {/* Message */}
        <Controller
          name='message'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Message</FieldLabel>
              <Textarea
                id={field.name}
                placeholder='Tell us about your inquiry or how we can assist you...'
                {...field}
                aria-invalid={fieldState.invalid}
                className='min-h-50 bg-gray-100 text-base placeholder:text-base p-4 border-gray-100 '
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button disabled={isSubmitting} type='submit'>
          {isSubmitting ? (
            <>
              <Spinner className='size-4' /> Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ContactUsForm;
