import { config } from 'dotenv';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
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

const VerifyEmail = ({ name, url }: { name: string; url: string }) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
            *{
            font-family: 'Inter', sans-serif;
            }`}
        </style>
      </Head>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Preview>Almost done! Just one click to confirm your email.</Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading>Hi {name},</Heading>
              <Text className='text-base text-gray-600'>
                You&apos;re receiving this email to confirm your email address
                for your account.
              </Text>
              <Text className='text-base text-gray-600 mb-0'>
                Confirm your email address by clicking the button below. This
                helps keep your account secure.
              </Text>
              <Button
                href={url}
                className='bg-[#ff6b00] text-white py-3 px-7 text-center rounded text-base my-6 cursor-pointer'
              >
                Verify Email
              </Button>
              <Text className='text-base text-gray-600 my-0'>
                If you did not request this, you can safely ignore this email.
              </Text>
              <Hr className='border-gray-200 my-4' />
              <span className='text-sm text-gray-400'>
                This link will expire in 24 hours.
              </span>
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

VerifyEmail.PreviewProps = {
  name: 'John Doe',
  url: 'https://example.com/verify-email',
};

export default VerifyEmail;
