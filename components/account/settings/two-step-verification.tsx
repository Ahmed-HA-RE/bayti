'use client';

import { Badge } from '@/components/ui/badge';
import SettingsCard from './settings-card';
import { auth } from '@/lib/auth';
import { useForm, Controller } from 'react-hook-form';
import {
  ConfirmTwoFactorFormData,
  confirmTwoFactorSchema,
} from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { LuTriangleAlert } from 'react-icons/lu';
import { authClient } from '@/lib/authClient';
import QrCodeDialog from './qr-code-dialog';

const TwoStepVerification = ({
  user,
}: {
  user: typeof auth.$Infer.Session.user;
}) => {
  const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);
  const [totpURI, setTotpURI] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTwoFactorEnabled, setHasTwoFactorEnabled] = useState(
    user.twoFactorEnabled,
  );

  const form = useForm<ConfirmTwoFactorFormData>({
    resolver: zodResolver(confirmTwoFactorSchema),
    defaultValues: {
      currentPassword: '',
    },
  });

  const onSubmit = async (data: ConfirmTwoFactorFormData) => {
    try {
      if (!hasTwoFactorEnabled) {
        const { data: res, error } = await authClient.twoFactor.enable({
          password: data.currentPassword,
        });

        if (error) {
          throw new Error(error.message);
        } else {
          setTotpURI(res.totpURI);
          setBackupCodes(res.backupCodes);
          setOpenQrCodeDialog(true);
        }
      } else {
        const { error } = await authClient.twoFactor.disable({
          password: data.currentPassword,
        });
        if (error) {
          throw new Error(error.message);
        }
        toast.success('Two-factor authentication has been disabled');
        setHasTwoFactorEnabled(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong.';
      form.setError('root', { message: errorMessage });
    }
  };

  const isPending = form.formState.isSubmitting;

  return (
    <SettingsCard
      title='Two-Step Verification'
      subtitle='Add an extra layer of security to your account by enabling two-step verification.'
    >
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Status:</h3>
          <Badge variant={hasTwoFactorEnabled ? 'success' : 'destructive'}>
            {hasTwoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='currentPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${field.name}-2fa`}>
                    Current Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={`${field.name}-2fa`}
                      {...field}
                      type={isVisible ? 'text' : 'password'}
                      placeholder='Enter your current password'
                      aria-invalid={fieldState.invalid}
                    ></InputGroupInput>
                    <InputGroupAddon align='inline-end'>
                      <InputGroupButton
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <RiEyeCloseLine className='size-4' />
                        ) : (
                          <FaRegEye className='size-4' />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {form.formState.errors.root && (
              <Alert variant='error'>
                <LuTriangleAlert />
                <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
              </Alert>
            )}

            <div className='flex items-center justify-end gap-2'>
              <QrCodeDialog
                totpURI={totpURI}
                backupCodes={backupCodes}
                openQrCodeDialog={openQrCodeDialog}
                setOpenQrCodeDialog={setOpenQrCodeDialog}
                hasTwoFactorEnabled={hasTwoFactorEnabled}
                setHasTwoFactorEnabled={setHasTwoFactorEnabled}
              />
              <Button
                variant={hasTwoFactorEnabled ? 'destructive' : 'default'}
                type='submit'
                size='sm'
                disabled={isPending}
              >
                {isPending
                  ? 'Processing...'
                  : hasTwoFactorEnabled
                    ? 'Disable 2FA'
                    : 'Enable 2FA'}{' '}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </SettingsCard>
  );
};

export default TwoStepVerification;
