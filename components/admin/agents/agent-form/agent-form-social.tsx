'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import { SOCIAL_MEDIA_PLATFORMS } from '@/lib/constants';
import { AgentFormData } from '@/schema/agent';
import { LinkIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';

type AgentFormSocialProps = {
  form: UseFormReturn<AgentFormData>;
};

const AgentFormSocial = ({ form }: AgentFormSocialProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMediaLinks',
  });

  const selectedSocialMediaLinks = form
    .watch('socialMediaLinks')
    ?.map((link) => link.platform)
    .filter((platform) => platform !== '');

  return (
    <Card className='xl:col-span-2'>
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
                            Platform <span className='text-destructive'>*</span>
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
                                disabled={selectedSocialMediaLinks?.includes(
                                  platform.value,
                                )}
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
  );
};

export default AgentFormSocial;
