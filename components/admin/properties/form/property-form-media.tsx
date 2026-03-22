'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '@/schema/property';
import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IoImages } from 'react-icons/io5';
import { UploadDropzone } from '@/lib/uploadthing';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { formatUploadThingError } from '@/lib/utils';

const PropertyFormMedia = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  return (
    <CardFormStepsLayout
      title='Property Media'
      icon={<IoImages className='size-5' />}
    >
      {successMsg && (
        <Alert variant='success'>
          <AlertTitle>{successMsg}</AlertTitle>
        </Alert>
      )}
      <Controller
        name='images'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Property Images <span className='text-destructive'>*</span>
            </FieldLabel>

            <UploadDropzone
              endpoint={'propertyImages'}
              onUploadError={(error) => {
                const formattedError = formatUploadThingError(
                  error.message,
                  'multiple',
                );
                form.setError('images', { message: formattedError });
              }}
              onClientUploadComplete={(res) => {
                setSuccessMsg('Images uploaded successfully!');
                console.log(res);
              }}
              className='border-solid !border-gray-200 ut-button:bg-accent cursor-pointer ut-upload-icon:text-orange-500 ut-label:text-accent ut-allowed-content:text-muted-foreground ut-button:ut-uploading:bg-accent/50'
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </CardFormStepsLayout>
  );
};

export default PropertyFormMedia;
