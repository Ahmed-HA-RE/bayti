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
import { auth } from '@/lib/auth';
import LinkButton from '../shared/link-button';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { contactAgent } from '@/lib/actions/contact-agent';

const AgentContactForm = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const pathname = usePathname();
  const [message, setMessage] = useState('');

  const form = useForm<ContactAgentFormData>({
    resolver: zodResolver(contactAgentSchema),
    defaultValues: {
      name: session?.user.name || '',
      email: session?.user.email || '',
      phone: session?.user.phoneNumber || '',
    },
  });

  const onSubmit = async (data: ContactAgentFormData) => {
    const res = await contactAgent(data);
    setMessage(res.message);
  };

  return form.formState.isSubmitSuccessful ? (
    <Alert className='bg-foreground text-white rounded-none border-0 py-3 px-4 text-center'>
      <AlertTitle>{message}</AlertTitle>
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

        {!session ? (
          <LinkButton className='mt-2' href={`/login?callbackUrl=${pathname}`}>
            Login to Contact Agent
          </LinkButton>
        ) : (
          <Button
            disabled={form.formState.isSubmitting}
            size='default'
            type='submit'
            className='mt-2'
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Contact Agent'}
          </Button>
        )}
      </FieldGroup>
    </form>
  );
};

export default AgentContactForm;
