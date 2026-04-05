'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateUserEmail } from '@/lib/actions/account/update-user-email';
import { UpdateEmailFormData, updateEmailSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoAlertFill } from 'react-icons/go';

const UpdateEmailForm = ({ userEmail }: { userEmail: string }) => {
  const form = useForm<UpdateEmailFormData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: '',
      password: '',
    },
  });

  const onSubmit = async (data: UpdateEmailFormData) => {
    const res = await updateUserEmail(data.newEmail, data.password);
    if (!res.success) {
      form.setError('root', {
        message: res.message,
      });
      return;
    }
    toast.success(res.message);
    form.reset();
  };

  const isPending = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className='border-gray-50 shadow-sm py-6'>
        {form.formState.errors.root && (
          <CardHeader>
            <Alert variant='error'>
              <GoAlertFill />
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          </CardHeader>
        )}
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Current Email</FieldLabel>
              <Input value={userEmail} disabled />
            </Field>
            {/* New Email */}
            <Controller
              name='newEmail'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    New Email <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='example@example.com'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Password */}
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <div className='relative'>
                    <Input
                      id={field.name}
                      type='password'
                      placeholder='Enter your password'
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              disabled={isPending}
              type='submit'
              className='w-full md:w-auto md:self-end'
            >
              {isPending ? 'Sending...' : 'Send Confirmation Email'}
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
};

export default UpdateEmailForm;
