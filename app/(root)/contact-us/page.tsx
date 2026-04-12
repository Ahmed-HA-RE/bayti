import ContactUsForm from '@/components/contact-us-form';
import SectionEyebrow from '@/components/shared/section-eyebrow';
import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Contact Us`,
  description: `Have questions or need help with your property search? Contact ${APP_NAME} to get expert guidance, explore your options, and move forward with confidence.`,
};

const ContactUsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className='pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-38 lg:pb-26'>
      <div className='container grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:items-start'>
        {/* Left Col */}
        <div className='flex flex-col gap-8 md:gap-12 lg:gap-14'>
          <div className='space-y-4'>
            <SectionEyebrow title='Talk to Us' />
            <h1 className='text-4xl md:text-5xl'>Send Us a Message</h1>
          </div>
          {/* Contact Form */}
          <ContactUsForm session={session} />
        </div>

        {/* Right Col */}
        <div className='h-full relative rounded-xl max-lg:hidden overflow-hidden'>
          <Image
            src='/images/contact-us.jpg'
            alt='Contact Us'
            fill
            className='object-cover rounded-xl brightness-90'
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
