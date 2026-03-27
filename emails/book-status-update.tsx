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
import { Booking, Property } from '@/lib/generated/prisma/client';
import { format } from 'date-fns/format';

config();

const logoUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
    : `${process.env.NEXT_PUBLIC_DEV_EMAIL_URL}/static`;

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

type BookStatusUpdateEmailProps = {
  booking: Pick<Booking, 'userName' | 'date' | 'status' | 'cancelReason'> & {
    property: Pick<Property, 'name'>;
  };
};

const BookStatusUpdateEmail = ({ booking }: BookStatusUpdateEmailProps) => {
  const isConfirmed = booking.status === 'CONFIRMED';

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
            Status update for your visit request to {booking.property.name}
          </Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl'>Visit Request Update</Heading>

              {/* Status Badge */}
              <Section className='my-4'>
                <span
                  className='capitalize'
                  style={{
                    display: 'inline-block',
                    backgroundColor: isConfirmed ? '#dcfce7' : '#fee2e2',
                    color: isConfirmed ? '#166534' : '#991b1b',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '5px 16px',
                    borderRadius: '9999px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {booking.status.toLowerCase()}
                </span>
              </Section>

              <Heading as='h3' className='text-black font-semibold mt-2'>
                Dear {booking.userName},
              </Heading>

              <Text className='text-gray-700 text-base mt-2 leading-7'>
                {isConfirmed
                  ? 'Great news! Your visit has been confirmed. Please make sure to arrive on time.'
                  : 'Unfortunately, your visit request has been declined. You may submit a new request for a different date or time.'}
              </Text>

              {booking.status === 'REJECTED' && booking.cancelReason && (
                <Text className='text-gray-700 text-base leading-7'>
                  <strong>Reason for Rejection:</strong> {booking.cancelReason}
                </Text>
              )}

              {/* Booking Details */}
              <Text className='text-base font-semibold mt-2 mb-2'>
                Booking Details:
              </Text>
              <ul className='text-gray-600 pl-6 mb-6'>
                <li>
                  <strong>Property:</strong> {booking.property.name}
                </li>
                <li className='mt-3'>
                  <strong>Scheduled Date:</strong>{' '}
                  {format(booking.date, 'EEEE, MMMM dd, yyyy')}
                </li>
              </ul>

              <Text className='text-gray-700 text-sm leading-7'>
                {isConfirmed
                  ? 'We look forward to welcoming you to the property. If you have any questions or need further assistance, please feel free to contact us. We are here to help.'
                  : 'We understand that this may be disappointing news. If you have any questions or would like to discuss alternative options, please do not hesitate to reach out to us.'}
              </Text>

              <Button
                href={`${serverUrl}/account/bookings`}
                className='bg-[#ff6b00] text-white py-3 px-7 text-center rounded text-base cursor-pointer mt-2'
              >
                View My Bookings
              </Button>
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

BookStatusUpdateEmail.PreviewProps = {
  booking: {
    userName: 'John Doe',
    status: 'REJECTED',
    cancelReason: 'The property is no longer available.',
    date: new Date(),
    property: {
      name: 'Modern Family Home with Pool',
    },
  },
};

export default BookStatusUpdateEmail;
