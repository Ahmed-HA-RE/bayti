'use client';
import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/schema/property';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FaPenRuler } from 'react-icons/fa6';

const PropertyFormSpecs = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  return (
    <CardFormStepsLayout
      title='Property Specs'
      icon={<FaPenRuler className='size-5' />}
    >
      <FieldGroup className='grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6'>
        {/* Price */}
        <Controller
          name='price'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className='flex items-center justify-between'>
                <FieldLabel htmlFor={field.name}>
                  Price <span className='text-destructive'>*</span>
                </FieldLabel>
                <span className='text-muted-foreground text-xs'>(AED)</span>
              </div>
              <Input
                type='number'
                {...field}
                placeholder='Property Price...'
                aria-invalid={fieldState.invalid}
                min={0}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Area */}
        <Controller
          name='area'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className='flex items-center justify-between'>
                <FieldLabel htmlFor={field.name}>
                  Area <span className='text-destructive'>*</span>
                </FieldLabel>
                <span className='text-muted-foreground text-xs'>(sq ft)</span>
              </div>
              <Input
                type='number'
                {...field}
                placeholder='Property Area...'
                aria-invalid={fieldState.invalid}
                min={0}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Bedrooms */}
        <Controller
          name='bedrooms'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Bedrooms <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                type='number'
                {...field}
                placeholder='Number of Bedrooms...'
                aria-invalid={fieldState.invalid}
                min={0}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Bathrooms */}
        <Controller
          name='bathrooms'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Bathrooms <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                type='number'
                {...field}
                placeholder='Number of Bathrooms...'
                aria-invalid={fieldState.invalid}
                min={0}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </CardFormStepsLayout>
  );
};

export default PropertyFormSpecs;
