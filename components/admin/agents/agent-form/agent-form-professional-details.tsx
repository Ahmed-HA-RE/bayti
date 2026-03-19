'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { CITIES } from '@/lib/constants';
import { AgentFormData } from '@/schema/agent';
import { Controller, UseFormReturn } from 'react-hook-form';

const AgentFormProfessionalDetails = ({
  form,
}: {
  form: UseFormReturn<AgentFormData>;
}) => {
  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <div className='flex items-center gap-2'>
          <span className='bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
            2
          </span>
          <CardTitle className='text-base font-semibold'>
            Professional Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <Controller
              name='role'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Role <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type='text'
                    placeholder='e.g. Senior Agent, Property Consultant'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name='status'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Status <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <NativeSelect
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  >
                    <NativeSelectOption value=''>
                      Select status
                    </NativeSelectOption>
                    <NativeSelectOption value='ACTIVE'>
                      Active
                    </NativeSelectOption>
                    <NativeSelectOption value='INACTIVE'>
                      Inactive
                    </NativeSelectOption>
                  </NativeSelect>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name='location'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Location <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type='text'
                    placeholder='e.g. Downtown Dubai, Marina'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name='city'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    City <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <NativeSelect
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  >
                    <NativeSelectOption value=''>
                      Select city
                    </NativeSelectOption>
                    {CITIES.map((city) => (
                      <NativeSelectOption key={city.value} value={city.value}>
                        {city.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default AgentFormProfessionalDetails;
