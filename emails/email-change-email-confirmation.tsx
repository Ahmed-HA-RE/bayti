import { config } from 'dotenv';
import {
  Body,
  Button,
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

config();

const logoUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
    : `${process.env.NEXT_PUBLIC_DEV_EMAIL_URL}/static`;

const EmailChangeEmailConfirmation = ({
  userName,
  url,
  newEmail,
}: {
  userName: string;
  url: string;
  newEmail: string;
}) => {
  return (
    <Html>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Head>
          <style>
            {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
            *{
            font-family: 'Inter', sans-serif;
            }`}
          </style>
        </Head>
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Preview>
            Please confirm your new email address to complete the update.
          </Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl font-bold text-gray-900'>
                Email Change Confirmation
              </Heading>

              <Heading as='h3' className='text-black font-semibold'>
                Hi {userName},
              </Heading>

              <Text className='text-gray-700 text-base mt-4 leading-7'>
                You recently requested to change your email address for your{' '}
                {APP_NAME}&apos;s account. Click the button below to confirm
                your new email address and complete the update.
              </Text>

              <Text className='text-gray-700 text-base mt-4 mb-0 leading-7'>
                New Email:{' '}
                <span className='font-semibold text-black'>{newEmail}</span>
              </Text>

              <Button
                href={url}
                className='bg-orange-500 text-white px-6 py-4 rounded inline-block text-base my-6'
              >
                Confirm Change
              </Button>

              <Text className='text-gray-700 text-sm leading-6 mt-0'>
                If you did not request this change, please ignore this email or
                contact our support team if you have any concerns.
              </Text>
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

EmailChangeEmailConfirmation.PreviewProps = {
  userName: 'John Doe',
  url: 'https://example.com/confirm-email-change',
  newEmail: 'example@example.com',
};

export default EmailChangeEmailConfirmation;
