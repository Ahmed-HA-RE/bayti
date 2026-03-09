'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { User2Icon, CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { auth } from '@/lib/auth';
import { Button } from '../ui/button';
import { Property } from '@/lib/generated/prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { RESERVING_TIMES } from '@/lib/constants';
import toast from 'react-hot-toast';
import {
  bookVisitDialogSchema,
  BookVisitDialogFormData,
} from '@/schema/book-visit-dialog';
import { bookVisit } from '@/lib/actions/book-visit';
import { Spinner } from '../ui/spinner';

type BookVisitDialogFormProps = {
  session: typeof auth.$Infer.Session;
  property: Property;
  setOpenDialog: (open: boolean) => void;
};

const BookVisitDialogForm = ({
  session,
  property,
  setOpenDialog,
}: BookVisitDialogFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<BookVisitDialogFormData>({
    resolver: zodResolver(bookVisitDialogSchema),
    defaultValues: {
      name: session.user.name || '',
      email: session.user.email || '',
      phoneNumber: session?.user.phoneNumber || '',
      date: undefined,
      timeRange: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BookVisitDialogFormData) => {
    const res = await bookVisit(data, property.id);
    if (!res.success) {
      form.setError('root', { message: res.message });
      return;
    } else {
      setOpenDialog(false);
      toast.success(res.message);
    }
  };

  const { isSubmitting: isPending, isSubmitted } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {isSubmitted && form.formState.errors.root && (
        <Alert variant={'error'} className='max-w-2xl mx-auto mb-6'>
          <FiAlertTriangle />
          <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
        </Alert>
      )}
      <FieldGroup>
        {/* Name */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <User2Icon className='size-4' />
                </InputGroupAddon>
                <InputGroupInput
                  type='text'
                  id={field.name}
                  placeholder='Enter your full name'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Email */}
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <FiMail className='size-4' />
                </InputGroupAddon>
                <InputGroupInput
                  type='email'
                  id={field.name}
                  placeholder='Enter your email address'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Phone */}
        <Controller
          name='phoneNumber'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>

              <div className='flex rounded-md shadow-xs'>
                <span className='border-input inline-flex items-center rounded-l-md border px-3'>
                  <Image
                    src='/svg/uae-flag.svg'
                    alt='UAE Flag'
                    width={34}
                    height={34}
                  />
                </span>
                <Input
                  type='text'
                  id={field.name}
                  placeholder='Enter your phone number'
                  className='-ms-px rounded-l-none shadow-none'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Date Picker + Time */}
        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>
          <Controller
            name='date'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Preferred Viewing Date
                </FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant='ghost'
                        className='w-full justify-between font-normal border'
                        id='date'
                      >
                        <span className='flex items-center text-muted-foreground'>
                          <CalendarIcon className='mr-2' />
                          {field.value
                            ? field.value.toLocaleDateString()
                            : 'Pick a date'}
                        </span>
                        <ChevronDownIcon />
                      </Button>
                    }
                  />
                  <PopoverContent
                    side='top'
                    className='w-auto p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={field.value}
                      required
                      disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
                      onSelect={(date) => {
                        setOpen(false);
                        field.onChange(date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name='timeRange'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Preferred Time Range
                </FieldLabel>
                <NativeSelect
                  id={field.name}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
                >
                  <NativeSelectOption value={''}>
                    Select a time range
                  </NativeSelectOption>
                  {RESERVING_TIMES.map((t, index) => (
                    <NativeSelectOption key={index} value={t.value}>
                      {t.title}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        <Button disabled={isPending} type='submit' className='self-start'>
          {isPending ? (
            <>
              {' '}
              <Spinner /> Requesting...
            </>
          ) : (
            'Request Viewing'
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default BookVisitDialogForm;
