'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '@/schema/property';
import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IoImages } from 'react-icons/io5';
import { UploadDropzone } from '@/lib/uploadthing';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { cn, formatUploadThingError } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IoMdClose } from 'react-icons/io';

const PropertyFormMedia = ({
  form,
  isEdit,
  onRemoveImage,
}: {
  form: UseFormReturn<PropertyFormData>;
  isEdit: boolean;
  onRemoveImage: (imageKey: string) => void;
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

            {field.value.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2'>
                {field.value.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      'relative aspect-[3/2]',
                      field.value.length === 1 && 'col-span-2',
                    )}
                  >
                    <Image
                      key={index}
                      src={image.url}
                      alt={`Property Image ${index + 1}`}
                      fill
                      sizes='auto'
                      className='rounded-lg'
                    />
                    {isEdit && (
                      <Button
                        type='button'
                        onClick={() => onRemoveImage(image.key)}
                        className='absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-white'
                      >
                        <IoMdClose className='text-red-500' />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
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
                  const formattedRes = res.map((item) => ({
                    url: item.ufsUrl,
                    key: item.key,
                  }));
                  field.onChange(formattedRes);
                }}
                className={cn(
                  'border-solid ut-button:bg-accent cursor-pointer ut-upload-icon:text-orange-500 ut-label:text-accent ut-allowed-content:text-muted-foreground ut-button:ut-uploading:bg-accent/50',
                  fieldState.invalid
                    ? '!border-destructive'
                    : '!border-gray-200',
                )}
              />
            )}

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </CardFormStepsLayout>
  );
};

export default PropertyFormMedia;
