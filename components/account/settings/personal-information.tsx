'use client';

import { Button } from '@/components/ui/button';
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
import { Suspense, useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import { updatePersonalInformation } from '@/lib/actions/user/update-personal-information';
import SettingsCard from './settings-card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { GoAlertFill } from 'react-icons/go';
import UpdateEmailDialog from './update-email-dialog';
import { TiPencil } from 'react-icons/ti';

const PersonalInformation = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const [openModal, setOpenModal] = useState(false);
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

  const userImage = form.watch('image') || session.user.image;
  const isPending = form.formState.isSubmitting;

  return (
    <SettingsCard
      title='Personal Information'
      subtitle='Update your personal information'
    >
      {form.formState.errors.root && (
        <Alert variant='error' className='mb-4'>
          <GoAlertFill />
          <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          {/* Email */}
          <Field>
            <div className='flex items-center justify-between'>
              <FieldLabel>Email</FieldLabel>
              <Button
                variant='ghost'
                size='sm'
                className='py-0 px-0 hover:text-accent'
                type='button'
                onClick={() => setOpenModal(true)}
              >
                <TiPencil />
                Change Email
              </Button>
            </div>
            <Input disabled value={session.user.email} />
            <p className='text-xs text-muted-foreground text-right'>
              This email is associated with your account
            </p>
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
      </form>
      <UpdateEmailDialog open={openModal} onOpenChange={setOpenModal} />
    </SettingsCard>
  );
};

export default PersonalInformation;
