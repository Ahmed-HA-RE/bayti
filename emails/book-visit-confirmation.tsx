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

type BookVisitConfirmationEmailProps = {
  booking: Booking & { property: Property };
};

const BookVisitConfirmationEmail = ({
  booking,
}: BookVisitConfirmationEmailProps) => {
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
          <Preview>We&apos;ll confirm your visit shortly.</Preview>
          <Container className='mx-auto my-[40px] max-w-[600px]'>
            <Section className='rounded border border-[#eaeaea] border-solid px-6 py-4'>
              <Heading className='text-3xl md:text-4xl'>
                We received your visit request!
              </Heading>
              <Heading as='h3' className=' text-black font-semibold mt-10'>
                Dear {booking.userName},
              </Heading>
              <Text className='text-base text-gray-600 mb-6'>
                Thank you for your request to visit {booking.property.name}. Our
                team is currently reviewing your request and will update you
                within 24–48 hours.
              </Text>

              <Text className='text-xl font-semibold '>Booking Details:</Text>
              <ul className=' text-gray-600 pl-6 mb-6'>
                <li>
                  Reservation Date:{' '}
                  {format(booking.date, 'eeee, MMMM dd, yyyy')}
                </li>
                <li className='my-4'>
                  Reservation Time: {format(booking.startTime, 'hh:mm a')} -{' '}
                  {format(booking.endTime, 'hh:mm a')}
                </li>
                <li>
                  Property Location: {booking.property.address},{' '}
                  {booking.property.city}
                </li>
              </ul>

              {/* Add fake data till i implement agent crud operation */}
              <Text className='text-xl font-semibold '>Agent Details:</Text>
              <ul className=' text-gray-600 pl-6 mb-8'>
                <li>Agent Name: Bessie Copper</li>
                <li className='my-4'>Agent Email: bessie.copper@example.com</li>
                <li>Agent Phone Number: (123) 456-7890</li>
              </ul>

              <Text className='text-gray-600'>
                Please note that if the agent is unavailable or your request got
                declined, we will notify you promptly.
              </Text>
              <Text className='text-gray-600 mb-6'>
                If you want to cancel your request, please visit your account
                booking page.
              </Text>
              <Button
                href={`${serverUrl}/account/bookings`}
                className='bg-[#ff6b00] text-white py-3 px-7 text-center rounded text-base cursor-pointer'
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

BookVisitConfirmationEmail.PreviewProps = {
  booking: {
    userName: 'John Doe',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    property: {
      name: 'Luxurious Villa in Beverly Hills',
      address: 'Beverly Hills',
      city: 'Los Angeles',
    },
  },
};

export default BookVisitConfirmationEmail;
