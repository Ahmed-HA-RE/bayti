'use client';
import { useForm, Controller } from 'react-hook-form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Button } from '../ui/button';
import {
  FieldGroup,
  Field,
  FieldSet,
  FieldTitle,
  FieldError,
} from '../ui/field';
import {
  ContactAgentFormData,
  contactAgentSchema,
} from '@/schema/contact-agent';
import { zodResolver } from '@hookform/resolvers/zod';
import { User2Icon } from 'lucide-react';
import { FiMail } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { Alert, AlertTitle } from '../ui/alert';

const AgentContactForm = () => {
  const form = useForm<ContactAgentFormData>({
    resolver: zodResolver(contactAgentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return form.formState.isSubmitSuccessful ? (
    <Alert className='bg-foreground text-white rounded-none border-0 py-3 px-4 text-center'>
      <AlertTitle>Thank you! Your submission has been received.</AlertTitle>
    </Alert>
  ) : (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='gap-4'>
        <FieldSet>
          <FieldTitle>Contact Details</FieldTitle>
        </FieldSet>
        {/* Name */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupAddon>
                  <User2Icon />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  placeholder='Full Name'
                  aria-invalid={fieldState.invalid}
                  type='text'
                />
              </InputGroup>
              {fieldState.error && (
                <FieldError className='text-xs' errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        {/* Email */}
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupAddon>
                  <FiMail />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  placeholder='Email Address'
                  aria-invalid={fieldState.invalid}
                  type='email'
                />
              </InputGroup>
              {fieldState.error && (
                <FieldError className='text-xs' errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        {/* Phone */}
        <Controller
          name='phone'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupAddon>
                  <BsTelephone />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  placeholder='Phone Number'
                  aria-invalid={fieldState.invalid}
                  type='tel'
                />
              </InputGroup>
              {fieldState.error && (
                <FieldError className='text-xs' errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          size='default'
          type='submit'
          className='self-start mt-2 w-full'
        >
          {form.formState.isSubmitting ? 'Sending...' : 'Contact Agent'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default AgentContactForm;
