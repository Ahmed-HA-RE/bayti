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
import { ACCOUNT_DELETION_WARNINGS } from '@/lib/constants';

config();

const logoUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
    : `${process.env.NEXT_PUBLIC_DEV_EMAIL_URL}/static`;

const ConfirmAccountDeletion = ({
  userName,
  url,
}: {
  userName: string;
  url: string;
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
            Confirm your request to permanently delete your account.
          </Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl font-bold text-gray-900'>
                Account Deletion Confirmation
              </Heading>

              <Heading as='h3' className='text-black font-semibold'>
                Hi {userName},
              </Heading>

              <Text className='text-gray-700 text-base mt-4'>
                We&apos;re sorry to see you go. Please note once your account is
                deleted:
              </Text>

              <ul>
                {ACCOUNT_DELETION_WARNINGS.map((warning) => (
                  <li key={warning.id}>
                    <Text className='text-[15px] leading-[21px] text-[#3c3f44]'>
                      {warning.description}
                    </Text>
                  </li>
                ))}
              </ul>

              <Button
                href={url}
                className='bg-orange-500 text-white w-full py-2 inline-block text-center text-base my-6 font-bold'
              >
                Yes, I&apos;m sure
              </Button>

              <Text className='text-gray-700 text-sm mt-0'>
                This link will expire in 1 hour. If you changed your mind, you
                can safely ignore this email and your account will remain
                active.
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

ConfirmAccountDeletion.PreviewProps = {
  userName: 'John Doe',
  url: 'https://example.com/confirm-email-change',
};

export default ConfirmAccountDeletion;
