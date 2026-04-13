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

config();

const logoUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
    : `${process.env.NEXT_PUBLIC_DEV_EMAIL_URL}/static`;

const SendEmailOTP = ({
  userName,
  code,
}: {
  userName: string;
  code: string;
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
          <Preview>Use the code below to sign-in securely.</Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl md:text-4xl'>
                Sign in to your account
              </Heading>
              <Text className='text-lg font-medium text-black mt-2 mb-4'>
                Hi {userName},
              </Text>
              <Text className='text-base text-gray-600'>
                You&apos;re receiving this email because you recently requested
                a sign-in code for your {APP_NAME} account.
              </Text>
              <Text className='text-base text-gray-600 mb-0'>
                Use the code below to sign in to your account.
              </Text>
              <Section className='my-6 p-4 bg-gray-100 rounded'>
                <Text className='text-[#333] m-0 font-bold text-center text-[14px]'>
                  Verification code
                </Text>

                <Text className='text-[#333] text-[36px] my-[10px] mx-0 font-bold text-center'>
                  {code}
                </Text>
                <Text className='text-[#333] text-[14px] m-0 text-center'>
                  (This code is valid for 30 minutes)
                </Text>
              </Section>

              <span className='text-sm text-gray-600'>
                Please do not share this code with anyone. {APP_NAME} will never
                ask you for this code.
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

SendEmailOTP.PreviewProps = {
  userName: 'John Doe',
  code: '123456',
};

export default SendEmailOTP;
