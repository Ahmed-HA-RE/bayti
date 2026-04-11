import { MotionPreset } from '@/components/shared/motion-preset';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { formatAgentRole, formatCityName } from '@/lib/utils';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
} from 'react-icons/fa6';
import Link from 'next/link';
import PropertyCard from '@/components/shared/property-card';
import { Badge } from '@/components/ui/badge';
import TestimonialsSection from '@/components/home/testimonials-section';

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const agent = await prisma.agent.findUnique({
    where: { slug },
  });

  if (!agent) return {};

  return {
    title: `${agent.name} | Real Estate Agent in UAE`,
    description: agent.description,
  };
};

const AgentPage = async ({ params }: Props) => {
  const { slug } = await params;

  const agent = await prisma.agent.findUnique({
    where: { slug },
    include: {
      properties: {
        include: {
          propertyImages: true,
        },
      },
    },
  });

  if (!agent) {
    return redirect('/agents');
  }

  const agentDetails = [
    {
      icon: FiPhone,
      label: 'Phone',
      value: (
        <a
          className='hover:underline underline-offset-2'
          href={`tel:${agent.phoneNumber}`}
        >
          {agent.phoneNumber}
        </a>
      ),
    },
    {
      icon: FiMail,
      label: 'Email',
      value: (
        <a
          className='hover:underline underline-offset-2'
          href={`mailto:${agent.email}`}
        >
          {agent.email}
        </a>
      ),
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: <span>{formatCityName(agent.city)}, UAE</span>,
    },
  ];

  const icons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    threads: FaThreads,
  };

  return (
    <>
      {/* Hero Name */}
      <section className='section-top-spacing'>
        <div className='container'>
          <MotionPreset
            component='h1'
            fade
            slide={{ direction: 'down' }}
            delay={0.1}
            className='text-3xl md:text-4xl font-medium'
          >
            {agent.name}
          </MotionPreset>
        </div>
      </section>

      {/* Agent Profile */}
      <section className='pt-8 md:pt-10'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-10 xl:grid-cols-11 gap-10'>
            {/* Left - Image */}
            <MotionPreset
              fade
              slide={{ direction: 'left' }}
              delay={0.2}
              className='lg:col-span-5 xl:col-span-4'
            >
              <Image
                src={agent.image}
                alt={agent.name}
                width={0}
                height={0}
                sizes='100vw'
                className='object-cover w-full max-lg:max-w-md mx-auto rounded-lg'
              />
            </MotionPreset>

            {/* Right - Details */}
            <div className='flex flex-col justify-between gap-8 lg:col-span-5 xl:col-span-7'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  {/* Role */}
                  <MotionPreset
                    fade
                    slide={{ direction: 'right' }}
                    delay={0.25}
                  >
                    <Badge>{formatAgentRole(agent.role)}</Badge>
                  </MotionPreset>

                  {/* Name */}
                  <MotionPreset fade slide={{ direction: 'right' }} delay={0.3}>
                    <h2 className='text-3xl md:text-4xl font-semibold'>
                      {agent.name}
                    </h2>
                  </MotionPreset>
                </div>

                {/* Description */}
                <MotionPreset fade slide={{ direction: 'right' }} delay={0.35}>
                  <p className='text-muted-foreground leading-relaxed text-base md:text-lg'>
                    {agent.description}
                  </p>
                </MotionPreset>
              </div>

              {/* Contact Details */}
              <MotionPreset fade slide={{ direction: 'right' }} delay={0.4}>
                <div className='space-y-4'>
                  {agentDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div key={index} className='flex items-center gap-4'>
                        <div className='flex items-center justify-center size-10 rounded-full bg-muted shrink-0'>
                          <Icon className='size-4.5 text-foreground' />
                        </div>
                        <div>
                          <p className='text-xs text-muted-foreground uppercase tracking-wide'>
                            {detail.label}
                          </p>
                          <div className='text-sm font-medium'>
                            {detail.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MotionPreset>

              {/* Social Links */}
              {agent.socialMediaLinks.length > 0 && (
                <MotionPreset
                  fade
                  slide={{ direction: 'right' }}
                  delay={0.5}
                  className='flex items-center gap-2'
                >
                  <span>Follow me on:</span>
                  <div className='flex items-center gap-3'>
                    {agent.socialMediaLinks.map((media, indx) => {
                      const Icon = icons[media.platform as keyof typeof icons];
                      return (
                        <Button
                          key={indx}
                          variant='outline'
                          asChild
                          size='icon'
                          className='rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300'
                        >
                          <Link
                            href={media.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Icon className='size-4' />
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </MotionPreset>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Properties */}
      {agent.properties.length > 0 && (
        <section className='section-spacing'>
          <div className='container'>
            <MotionPreset
              component='h3'
              fade
              slide={{ direction: 'up' }}
              delay={0.1}
              className='text-3xl md:text-4xl font-semibold mb-8 tracking-wide'
            >
              My Properties
            </MotionPreset>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {agent.properties.map((property, index) => (
                <MotionPreset
                  key={property.id}
                  fade
                  slide={{ direction: 'up' }}
                  delay={0.15 + index * 0.1}
                  className='h-[350px] md:h-[500px] overflow-hidden'
                >
                  <PropertyCard property={property} />
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>
      )}
      <TestimonialsSection />
    </>
  );
};

export default AgentPage;
