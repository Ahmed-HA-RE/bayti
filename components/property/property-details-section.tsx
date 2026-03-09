import { AMENITIES } from '@/lib/constants';
import { Property } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import LinkButton from '../shared/link-button';
import { ArrowRightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Suspense } from 'react';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { BsTelephone } from 'react-icons/bs';
import { LuMapPin } from 'react-icons/lu';
import AgentContactForm from './agent-contact-form';
import { FiMail } from 'react-icons/fi';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import ViewingRequestDialog from './book-visit-dialog';

const PropertyDetailsSection = async ({ property }: { property: Property }) => {
  const amentiesList = AMENITIES.filter((amenity) =>
    property.amenities.includes(amenity.name),
  );

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const requestViewingStatus = await prisma.viewingRequest.findFirst({
    where: {
      propertyId: property.id,
      userId: session?.user.id,
    },
    select: {
      status: true,
    },
  });

  return (
    <section className='pb-8 md:pb-12 lg:pb-14'>
      <div className='container'>
        <div className='flex flex-col md:flex-row gap-10 lg:gap-16'>
          {/* Left Side */}
          <MotionPreset
            fade
            slide={{ direction: 'left' }}
            blur
            className='flex flex-col gap-16 lg:col-span-2 md:flex-1/2'
            delay={0.5}
          >
            {/* Description */}
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl md:text-3xl'>Overview</h2>
              <p className='text-muted-foreground'>{property.description}</p>
            </div>
            {/* Amenities */}
            <div className='space-y-10'>
              <div className='flex flex-col gap-6'>
                <h2 className='text-2xl md:text-3xl'>Amenities</h2>
                <div className='grid grid-cols-2 lg:grid-cols-3 justify-between gap-6'>
                  {amentiesList.map((amenity, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <amenity.icon className='size-6' />
                      <span className='text-base'>{amenity.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <ViewingRequestDialog
                  property={property}
                  session={session}
                  reservationStatus={requestViewingStatus?.status}
                />
                <LinkButton
                  variant='secondary'
                  href='/contact-us'
                  className='group self-start'
                >
                  Ask for Details
                  <ArrowRightIcon className='transition-transform group-hover:translate-x-1' />
                </LinkButton>
              </div>
            </div>
          </MotionPreset>

          {/* Right Side */}
          <MotionPreset
            component='aside'
            fade
            slide={{ direction: 'right' }}
            blur
            delay={0.5}
            className='md:flex-1/9'
          >
            {/* Add fake agent data till real data is available */}
            <Card className='py-6'>
              <CardHeader>
                <div className='flex items-center gap-4'>
                  <Avatar className='size-16'>
                    <Suspense>
                      <Image
                        alt='User'
                        src='https://picsum.photos/id/1/64/64'
                        width={64}
                        height={64}
                        className='object-cover rounded-full'
                      />
                    </Suspense>
                  </Avatar>
                  <div className='flex flex-col gap-0.5'>
                    <h3 className='text-lg'>Bessie Copper</h3>
                    <span className='text-sm text-muted-foreground'>
                      Dubai, UAE
                    </span>
                  </div>
                </div>
              </CardHeader>
              <Separator className='my-4' />
              <CardContent className='px-8 flex flex-col gap-10'>
                <div className='space-y-4'>
                  {/* Email */}
                  <div className='flex items-center gap-2.5'>
                    <FiMail className='size-5' />
                    <a
                      href='mailto:bessie.copper@example.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline text-base'
                    >
                      bessie.copper@example.com
                    </a>
                  </div>
                  {/* Phone */}
                  <div className='flex items-center gap-2.5'>
                    <BsTelephone className='size-5' />
                    <a
                      href='tel:+1234567890'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline text-base'
                    >
                      +1 234 567 890
                    </a>
                  </div>
                  {/* Location */}
                  <div className='flex items-center gap-2.5'>
                    <LuMapPin className='size-5' />
                    <span className='text-base'>Dubai, UAE</span>
                  </div>
                </div>
                {/* Contact Form */}
                <AgentContactForm session={session} />
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsSection;
