'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import { UpdateUserFormData, updateUserSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { cn, formatUploadThingError } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Suspense } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { updatePersonalInformation } from '@/lib/actions/user/update-personal-information';

const PersonalInformation = ({
  session,
  accountProviderId,
}: {
  session: typeof auth.$Infer.Session;
  accountProviderId: string;
}) => {
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: session.user.name,
      image: session.user.image,
      phoneNumber: session.user.phoneNumber,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UpdateUserFormData) => {
    const res = await updatePersonalInformation(data);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };

  const isNotAuthProvider = accountProviderId === 'credential';
  // ignore eslint-disable-next-line react-hooks/rules-of-hooks
  const userImage = form.watch('image') || session.user.image;
  const isPending = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='pt-14'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='space-y-0.5 flex-1/3'>
          <h2 className='text-xl font-medium'>Personal Information</h2>
          <p className='text-xs text-muted-foreground'>
            Update your personal information and contact details
          </p>
        </div>
        <Card className='flex-2/3 shadow-sm border-gray-50'>
          <CardContent className='px-6'>
            <FieldGroup>
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Name <span className='text-destructive'>*</span>
                    </FieldLabel>
                    <Input
                      type='name'
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your name'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <div className='flex items-center justify-between'>
                  <FieldLabel>
                    Email <span className='text-destructive'>*</span>
                  </FieldLabel>
                  {isNotAuthProvider && (
                    <Button
                      className='hover:text-accent py-1'
                      variant='ghost'
                      size='sm'
                      asChild
                    >
                      <Link href='/account/settings/email'>Change Email</Link>
                    </Button>
                  )}
                </div>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  value={session.user.email}
                  disabled
                />
              </Field>
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
                          'border-input inline-flex items-center rounded-l-md border px-3',
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
                        className='-ms-px rounded-l-none shadow-none'
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        aria-invalid={fieldState.invalid}
                      />
                    </div>
                    {fieldState.error && (
                      <FieldError
                        className='text-xs'
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
              <div className='flex flex-col gap-4'>
                <span className='font-medium'>Avatar</span>
                <div className='flex items-center gap-4'>
                  <Avatar className='size-20'>
                    <Suspense
                      fallback={
                        <AvatarFallback>
                          {session.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      }
                    >
                      <Image
                        src={userImage}
                        alt={`${session.user.name}'s Avatar`}
                        width={80}
                        height={80}
                        className='object-cover rounded-full'
                      />
                    </Suspense>
                  </Avatar>
                  <Controller
                    name='image'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <UploadButton
                          endpoint={'profileImage'}
                          onClientUploadComplete={(res) => {
                            const result = res[0];
                            field.onChange(result.ufsUrl);
                            form.setValue('imageKey', result.key);
                            toast.success('Avatar updated successfully');
                          }}
                          onUploadError={(error) => {
                            const customizedError = formatUploadThingError(
                              error.message,
                              'single',
                            );
                            toast.error(customizedError);
                          }}
                          className='ut-button:rounded-full ut-button:bg-transparent items-start flex-col-reverse gap-3 ut-button:border ut-button:border-input ut-button:h-9 ut-button:text-xs ut-button:text-foreground ut-button:w-30 uut-uploading:cursor-not-allowed ut-uploading:opacity-50 ut-allowed-content:text-sm ut-allowed-content:text-muted-foreground ut-button:hover:border-accent ut-button:transition-colors ut-button:duration-300'
                          content={{
                            button({ ready, isUploading }) {
                              if (isUploading) {
                                return <Spinner className='size-4.5' />;
                              } else if (!ready) {
                                return 'Preparing...';
                              }

                              return 'Change Avatar';
                            },
                            allowedContent({}) {
                              return 'Max file size: 1MB';
                            },
                          }}
                        />
                        {fieldState.error && (
                          <FieldError
                            className='text-xs'
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
              <Button
                type='submit'
                className='self-end rounded-full'
                size='sm'
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default PersonalInformation;
