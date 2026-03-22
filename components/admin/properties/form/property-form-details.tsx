'use client';

import { Card, CardContent } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { PROPERTY_LIST_TYPES, PROPERTY_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PropertyFormData } from '@/schema/property';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import AssignAgentField from './assign-agent-field';
import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import PropertyLocationFields from './property-location-fields';
import { BsFillBuildingsFill } from 'react-icons/bs';

const PropertyFormDetails = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  const isChecked = form.watch('isFeatured');

  return (
    <CardFormStepsLayout
      icon={<BsFillBuildingsFill className='size-5' />}
      title='Property Details'
    >
      <FieldGroup className='grid lg:grid-cols-2 gap-4'>
        {/* Property Name */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Property Name <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                id={field.name}
                {...field}
                placeholder='eg. The Oakwood Residence'
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Assign Agent */}
        <AssignAgentField form={form} />
      </FieldGroup>

      {/* Address + City */}
      <FieldGroup className='grid lg:grid-cols-2 gap-4'>
        <PropertyLocationFields form={form} />
        {/* City */}
        <Controller
          name='city'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                City <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                value={field.value}
                disabled
                placeholder='City will be filled automatically'
              />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className='grid lg:grid-cols-2 gap-4'>
        {/* Property List */}
        <Controller
          name='propertyList'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Property List <span className='text-destructive'>*</span>
              </FieldLabel>
              <NativeSelect
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value}
                onChange={field.onChange}
              >
                <NativeSelectOption value={''}>
                  Select List Type
                </NativeSelectOption>
                {PROPERTY_LIST_TYPES.map((type) => (
                  <NativeSelectOption key={type.value} value={type.value}>
                    {type.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Property Type */}
        <Controller
          name='propertyType'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Property Type <span className='text-destructive'>*</span>
              </FieldLabel>
              <NativeSelect
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value}
                onChange={field.onChange}
              >
                <NativeSelectOption value={''}>Select Type</NativeSelectOption>
                {PROPERTY_TYPES.map((type) => (
                  <NativeSelectOption key={type.value} value={type.value}>
                    {type.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Property Description */}
      <Controller
        name='description'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Property Description <span className='text-destructive'>*</span>
            </FieldLabel>
            <Textarea
              id={field.name}
              {...field}
              placeholder='eg. A beautiful residence with modern amenities'
              aria-invalid={fieldState.invalid}
              className='bg-transparent'
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Property Featured */}
      <Card
        data-state={isChecked ? 'checked' : 'unchecked'}
        className={cn(
          'rounded-xl border group transition-colors duration-200',
          isChecked
            ? 'bg-accent/10 border-accent/30'
            : 'bg-muted/30 border-border',
        )}
      >
        <CardContent className='flex items-center justify-between gap-4 py-4'>
          <div className='flex items-center gap-3 flex-1 min-w-0'>
            {isChecked ? (
              <FaStar className='size-5 shrink-0 text-accent' />
            ) : (
              <FaRegStar className='size-5 shrink-0 text-muted-foreground' />
            )}
            <span className='flex flex-col gap-0.5 min-w-0'>
              <span className='font-medium text-sm text-foreground'>
                Featured Property
              </span>
              <span className='text-xs text-muted-foreground truncate'>
                Highlight this property in featured sections
              </span>
            </span>
          </div>
          <Controller
            name='isFeatured'
            control={form.control}
            render={({ field }) => (
              <div className='flex items-center gap-2 shrink-0'>
                <span
                  className={cn(
                    'text-sm font-medium cursor-pointer transition-colors',
                    !field.value ? 'text-foreground' : 'text-muted-foreground',
                  )}
                  onClick={() => field.onChange(false)}
                >
                  No
                </span>
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='cursor-pointer'
                />
                <span
                  className={cn(
                    'text-sm font-medium cursor-pointer transition-colors',
                    field.value ? 'text-accent' : 'text-muted-foreground',
                  )}
                  onClick={() => field.onChange(true)}
                >
                  Yes
                </span>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </CardFormStepsLayout>
  );
};

export default PropertyFormDetails;
