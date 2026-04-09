'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateUserEmail } from '@/lib/actions/user/update-user-email';
import { UpdateUserEmailFormData, updateUserEmailSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoAlertFill } from 'react-icons/go';

const UpdateEmailDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<UpdateUserEmailFormData>({
    resolver: zodResolver(updateUserEmailSchema),
    defaultValues: {
      newEmail: '',
    },
  });

  const onSubmit = async (data: UpdateUserEmailFormData) => {
    const res = await updateUserEmail(data);
    if (!res.success) {
      form.setError('root', { message: res.message });
      return;
    }
    toast.success(res.message);
    form.reset();
    onOpenChange(false);
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update Email</DialogTitle>
            <DialogDescription>
              Enter your new email, you will receive a confirmation email for
              both your current and new email addresses to verify the change.
            </DialogDescription>
          </DialogHeader>
          {form.formState.errors.root && (
            <Alert variant='error' className='mt-4'>
              <GoAlertFill className='me-2' />
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          )}
          <FieldGroup className='py-4'>
            <Controller
              name='newEmail'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='space-y-0.5'
                >
                  <FieldLabel htmlFor={field.name}>New Email</FieldLabel>
                  <Input
                    id={field.name}
                    type='email'
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder='example@example.com'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <Button disabled={isPending} type='submit'>
              {isPending ? 'Sending...' : 'Send Confirmation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateEmailDialog;
