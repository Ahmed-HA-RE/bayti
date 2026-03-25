'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Role, User } from '@/lib/generated/prisma';
import { AdminUserFormData, adminUserSchema } from '@/schema/admin-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Suspense } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import { formatUploadThingError } from '@/lib/utils';
import { editUser } from '@/lib/actions/admin/users/edit-user';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const AdminEditUserForm = ({
  user,
}: {
  user: User & { accounts: { providerId: string }[] };
}) => {
  const router = useRouter();
  const querClient = useQueryClient();

  const form = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      name: user.name ?? '',
      email: user.email ?? '',
      phoneNumber: user.phoneNumber || undefined,
      role: user.role as Role,
      image: user.image ?? '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: AdminUserFormData) => {
    const res = await editUser(data, user.id);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    querClient.invalidateQueries({ queryKey: ['admin-users'] });
    router.push('/admin/users');
  };

  const isGoogleUser = user.accounts.some((acc) => acc.providerId === 'google');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldGroup className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
          {/* Name */}
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Full Name <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  type='text'
                  placeholder='Enter full name'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Email Address <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  type='email'
                  placeholder='Enter email address'
                  aria-invalid={fieldState.invalid}
                  disabled={isGoogleUser}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
          {/* Phone Number */}
          <Controller
            name='phoneNumber'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                <Input
                  id={field.name}
                  type='tel'
                  placeholder='Enter phone number'
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={field.value ?? ''}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* Role */}
          <Controller
            name='role'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Role <span className='text-destructive'>*</span>
                </FieldLabel>
                <NativeSelect
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                >
                  <NativeSelectOption value={Role.USER}>
                    User
                  </NativeSelectOption>
                  <NativeSelectOption value={Role.ADMIN}>
                    Admin
                  </NativeSelectOption>
                </NativeSelect>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        {/* Image URL */}
        <Controller
          name='image'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='!gap-6'>
              <FieldLabel htmlFor={field.name}>Profile Image URL</FieldLabel>
              <div className='flex items-center gap-6'>
                {/* Image */}
                <Avatar className='size-25'>
                  <Suspense
                    fallback={
                      <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    }
                  >
                    <Image
                      src={field.value}
                      alt={user.name}
                      width={100}
                      height={100}
                      className='rounded-full'
                    />
                  </Suspense>
                </Avatar>
                {/* Info */}
                <div className='flex flex-col items-start gap-2'>
                  <p className='text-sm text-muted-foreground'>
                    Recommended size: 32x32px.
                  </p>
                  <UploadButton
                    onUploadError={(error) => {
                      toast.error(
                        formatUploadThingError(error.message, 'single'),
                      );
                    }}
                    onClientUploadComplete={(res) => {
                      field.onChange(res[0].ufsUrl);
                      form.setValue('imageKey', res[0].key);
                      toast.success('Image uploaded successfully!');
                    }}
                    className='ut-button:bg-accent'
                    endpoint='profileImage'
                    content={{
                      allowedContent: ({ ready }) => {
                        if (ready) {
                          return 'Image up to 1MB';
                        }
                      },
                    }}
                  />
                </div>
              </div>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div className='flex justify-end gap-4'>
          <Button asChild variant='secondary'>
            <Link href='/admin/users'>Cancel</Link>
          </Button>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Spinner className='size-4' data-icon='inline-start' />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AdminEditUserForm;
