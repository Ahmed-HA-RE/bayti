'use client';

import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Agent } from '@/lib/generated/prisma';
import { AgentFormData, agentSchema } from '@/schema/agent';
import Image from 'next/image';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { CITIES, SOCIAL_MEDIA_PLATFORMS } from '@/lib/constants';
import { PlusIcon, Trash2Icon, LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type SocialMediaLink = {
  platform: string;
  url: string;
};

const AgentForm = ({ agent }: { agent?: Agent }) => {
  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: agent?.name || '',
      email: agent?.email || '',
      phoneNumber: agent?.phoneNumber || '',
      role: agent?.role || '',
      location: agent?.location || '',
      city: agent?.city || '',
      status: agent?.status || 'ACTIVE',
      socialMediaLinks: (agent?.socialMediaLinks as SocialMediaLink[]) || [],
    },
    mode: 'onChange',
  });

  const isImageUploaded = form.watch('image');

  const onSubmit = (data: AgentFormData) => {
    if (!isImageUploaded) {
      form.setError('image', {
        type: 'manual',
        message: 'Image is required',
      });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMediaLinks',
  });

  return (
    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
      {/* Personal Information */}
      <Card>
        <CardHeader className='border-b pb-4'>
          <div className='flex items-center gap-2'>
            <span className='bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
              1
            </span>
            <CardTitle className='text-base font-semibold'>
              Personal Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          <FieldGroup>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
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

              <Controller
                name='phoneNumber'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Phone Number <span className='text-destructive'>*</span>
                    </FieldLabel>
                    <div className='flex rounded-md'>
                      <span className='border-input inline-flex items-center rounded-l-md border px-3'>
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
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    <Input
                      id={field.name}
                      type='file'
                      accept='.jpg,.jpeg,.png'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      aria-invalid={fieldState.invalid}
                      className='file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Professional Details */}
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
                      Role / Title <span className='text-destructive'>*</span>
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

      {/* Social Media Links */}
      <Card>
        <CardHeader className='border-b pb-4'>
          <div className='flex items-center gap-2'>
            <span className='bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
              3
            </span>
            <div>
              <CardTitle className='text-base font-semibold'>
                Social Media Links
              </CardTitle>
              <CardDescription className='text-muted-foreground mt-0.5 text-xs'>
                Optional — add links to the agent&apos;s social profiles
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          {fields.length === 0 ? (
            <div className='border-border flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-10'>
              <div className='bg-muted flex size-10 items-center justify-center rounded-full'>
                <LinkIcon className='text-muted-foreground size-5' />
              </div>
              <div className='text-center'>
                <p className='text-foreground text-sm font-medium'>
                  No social links added
                </p>
                <p className='text-muted-foreground mt-0.5 text-xs'>
                  Click &quot;Add Link&quot; to add a social media profile
                </p>
              </div>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => append({ platform: '', url: '' })}
              >
                <PlusIcon className='size-3.5' />
                Add Link
              </Button>
            </div>
          ) : (
            <div className='space-y-6'>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='flex items-start gap-3'>
                    <div className='mt-8 flex size-7 shrink-0 items-center justify-center'>
                      <span className='text-muted-foreground text-xs font-medium'>
                        {index + 1}
                      </span>
                    </div>

                    <div className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2'>
                      <Controller
                        name={`socialMediaLinks.${index}.platform`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Platform{' '}
                              <span className='text-destructive'>*</span>
                            </FieldLabel>
                            <NativeSelect
                              id={field.name}
                              {...field}
                              aria-invalid={fieldState.invalid}
                            >
                              <NativeSelectOption value=''>
                                Select platform
                              </NativeSelectOption>
                              {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
                                <NativeSelectOption
                                  key={platform.value}
                                  value={platform.value}
                                >
                                  {platform.name}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />

                      <Controller
                        name={`socialMediaLinks.${index}.url`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Profile URL{' '}
                              <span className='text-destructive'>*</span>
                            </FieldLabel>
                            <Input
                              id={field.name}
                              type='url'
                              placeholder='https://'
                              {...field}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                    </div>

                    <div className='mt-8 shrink-0'>
                      <Button
                        type='button'
                        variant='secondary'
                        size='icon-sm'
                        onClick={() => remove(index)}
                        aria-label='Remove link'
                      >
                        <Trash2Icon className='size-3.5' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => append({ platform: '', url: '' })}
              >
                <PlusIcon className='size-3.5' />
                Add Another Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className='flex items-center justify-end gap-3 pb-4'>
        <Button asChild type='button' variant='outline'>
          <Link href='/admin/agents'>Cancel</Link>
        </Button>
        <Button type='submit'>Add Agent</Button>
      </div>
    </form>
  );
};

export default AgentForm;
