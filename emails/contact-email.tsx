import { config } from 'dotenv';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  pixelBasedPreset,
  Tailwind,
  Text,
  Section,
} from '@react-email/components';
import { APP_NAME } from '@/lib/constants';
import React from 'react';
import { cn } from '@/lib/utils';

config();

const logoUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
    : `${process.env.NEXT_PUBLIC_DEV_EMAIL_URL}/static`;

const ContactEmail = ({
  name,
  email,
  phoneNumber,
  message,
}: {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Preview>{name} sent a message through the contact form.</Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading>New Inquiry Message from {name}</Heading>
              {[
                {
                  label: 'Sender',
                  value: name,
                },
                {
                  label: 'Email',
                  value: email,
                },
                {
                  label: 'Phone Number',
                  value: phoneNumber,
                },
                {
                  label: 'Message',
                  value: message,
                },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <Text className='text-sm text-black capitalize font-bold tracking-wide mb-1'>
                    {item.label}:
                  </Text>
                  <Text
                    className={cn(
                      item.label === 'Message' && 'whitespace-pre-wrap',
                      'text-base text-slate-800 mt-0 mb-4',
                    )}
                  >
                    {item.value}
                  </Text>
                </React.Fragment>
              ))}
            </Section>
            <Section className='text-center mt-6'>
              <Img
                className='mx-auto w-[120px]'
                src={`${logoUrl}/email-logo.png`}
              />
              <Text className='text-gray-400 text-sm my-3'>
                ©{new Date().getFullYear()} {APP_NAME}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactEmail.PreviewProps = {
  name: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '+971501234567',
  message:
    'I am interested in a property listing. Could you provide more details? like plaes add new details aookdwq dwqx qwd qwdwqd',
};

export default ContactEmail;
