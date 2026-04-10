'use client';

import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AgentFormData } from '@/schema/agent';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiFileUserFill } from 'react-icons/ri';
import slugify from 'slugify';

type AgentFormPersonalDetailsProps = {
  form: UseFormReturn<AgentFormData>;
  existingImage: string;
  setExistingImage: Dispatch<SetStateAction<string>>;
};

const AgentFormPersonalDetails = ({
  form,
  existingImage,
  setExistingImage,
}: AgentFormPersonalDetailsProps) => {
  return (
    <CardFormStepsLayout
      icon={<RiFileUserFill className='size-5' />}
      title='Personal Details'
    >
      <FieldGroup>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
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
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name='slug'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className='flex items-center justify-between'>
                  <FieldLabel htmlFor={field.name}>
                    Slug <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <small>This will be used in the URL</small>
                </div>
                <ButtonGroup>
                  <Input
                    disabled
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className={
                      fieldState.invalid ? 'border-destructive' : 'border-input'
                    }
                    aria-label='Generate Slug'
                    onClick={() => {
                      const agentName = form.getValues('name');
                      if (agentName) {
                        const slug = slugify(agentName, { lower: true });
                        toast.success('Slug generated successfully');
                        field.onChange(slug);
                      }
                    }}
                  >
                    Generate
                  </Button>
                </ButtonGroup>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

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
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <Controller
            name='phoneNumber'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Phone Number <span className='text-destructive'>*</span>
                </FieldLabel>
                <div className='flex rounded-md'>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-l-md border px-3',
                      fieldState.invalid
                        ? 'border-destructive'
                        : 'border-input',
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
                    placeholder='Enter phone number'
                    className='-ms-px rounded-l-none shadow-none'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='image'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Profile Image <span className='text-destructive'>*</span>
                </FieldLabel>
                {existingImage ? (
                  <div className='border-input flex h-12 items-center gap-3 rounded-lg border px-3'>
                    <Image
                      src={existingImage}
                      alt='Profile image'
                      width={30}
                      height={30}
                      className='size-8 shrink-0 rounded-full object-cover'
                    />
                    <span className='text-secondary flex-1 truncate text-sm'>
                      Current profile image
                    </span>
                    <Button
                      type='button'
                      variant='secondary'
                      size='sm'
                      className='h-7 shrink-0 text-xs'
                      onClick={() => {
                        setExistingImage('');
                        field.onChange(undefined);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    type='file'
                    accept='.jpg,.jpeg,.png'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                    className='file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic cursor-pointer'
                    aria-invalid={fieldState.invalid}
                  />
                )}
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <Controller
          name='description'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Description <span className='text-destructive'>*</span>
              </FieldLabel>
              <Textarea
                id={field.name}
                placeholder='Enter a brief description about the agent'
                {...field}
                aria-invalid={fieldState.invalid}
                className='min-h-42'
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>
    </CardFormStepsLayout>
  );
};

export default AgentFormPersonalDetails;
