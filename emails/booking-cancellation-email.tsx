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
  Row,
  Column,
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
  booking: Pick<Booking, 'userName' | 'date' | 'startTime' | 'endTime'> & {
    property: Pick<Property, 'name' | 'id'>;
  };
};

const BookingCancellationEmail = ({ booking }: BookStatusUpdateEmailProps) => {
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
            Your visit to {booking.property.name} has been cancelled
          </Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl font-bold text-gray-900'>
                Booking Visit Cancelled
              </Heading>

              {/* Cancellation Badge */}
              <Section className='my-4'>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '5px 16px',
                    borderRadius: '9999px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancelled
                </span>
              </Section>

              <Heading as='h3' className='text-black font-semibold mt-4 mb-2'>
                Hi {booking.userName},
              </Heading>

              <Text className='text-gray-700 text-base mt-2 leading-7'>
                This email confirms that your booking has been successfully
                cancelled.
              </Text>

              {/* Booking Details */}
              <Section
                className='mt-6 mb-6'
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <Text className='text-base font-semibold mb-3 mt-0'>
                  Cancelled Booking Details:
                </Text>
                <ul className='text-gray-600 pl-6 mb-0'>
                  <li className='mb-2'>
                    <strong>Property:</strong> {booking.property.name}
                  </li>
                  <li className='mb-2'>
                    <strong>Visit Date:</strong>{' '}
                    {format(new Date(booking.date), 'EEEE, MMMM dd, yyyy')}
                  </li>
                  <li className='mb-2'>
                    <strong>Time Slot:</strong>{' '}
                    {format(new Date(booking.startTime), 'h:mm a')} -{' '}
                    {format(new Date(booking.endTime), 'h:mm a')}
                  </li>
                </ul>
              </Section>

              <Text className='text-gray-700 text-base leading-7'>
                We understand that plans can change. If you&apos;re still
                interested in viewing this property or would like to explore
                other options, we&apos;re here to help you find your perfect
                home.
              </Text>

              <Text className='text-gray-700 text-base leading-7 mt-4'>
                You can request another visit at a time that works better for
                you, or browse through our extensive collection of properties to
                find one that suits your needs.
              </Text>
              <Row>
                <Column align='center'>
                  <Row>
                    <td align='center' className='w-1/2 pr-10' colSpan={1}>
                      <Button
                        href={`${serverUrl}/property/${booking.property.id}`}
                        className='bg-[#ff6b00] text-white py-3 px-4 text-center rounded text-base cursor-pointer w-full'
                        style={{
                          display: 'inline-block',
                        }}
                      >
                        Book Another Visit
                      </Button>
                    </td>
                    <td align='center' className='w-1/2 pr-10' colSpan={1}>
                      <Button
                        href={`${serverUrl}/properties`}
                        className='bg-white text-[#ff6b00] py-3 px-4 text-center rounded text-base cursor-pointer border border-[#ff6b00] w-full'
                        style={{
                          display: 'inline-block',
                        }}
                      >
                        Browse Properties
                      </Button>
                    </td>
                  </Row>
                </Column>
              </Row>

              <Text className='text-gray-600 text-sm leading-6 mt-6'>
                If you have any questions or need assistance, please don&apos;t
                hesitate to reach out to our team. We&apos;re always happy to
                help!
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

BookingCancellationEmail.PreviewProps = {
  booking: {
    userName: 'John Doe',
    date: new Date('2026-04-15'),
    startTime: new Date('2026-04-15T10:00:00'),
    endTime: new Date('2026-04-15T11:00:00'),
    property: {
      name: 'Modern Family Home with Pool',
      id: 'property-123',
    },
  },
};

export default BookingCancellationEmail;
