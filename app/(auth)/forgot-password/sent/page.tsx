import LinkButton from '@/components/shared/link-button';
import ScaleIn from '@/components/shared/scale-in';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Reset Password Link Sent',
  description:
    'If an account with that email exists, a reset link has been sent.',
};

const ForgotPasswordSentPage = () => {
  return (
    <ScaleIn className='flex flex-col items-center justify-center gap-10 h-full'>
      <Image
        src='/svg/email-sent.svg'
        alt='Email Sent'
        width={100}
        height={100}
        className='rounded-full'
      />
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-4xl md:text-5xl font-semibold text-center'>
          Check your email
        </h2>
        <p className='text-muted-foreground text-center max-w-md'>
          We just sent an email to your inbox with a link to reset your
          password.
        </p>
        <LinkButton
          variant='ghost'
          className='group hover:bg-muted'
          href='/login'
        >
          <ArrowLeftIcon className='transition-transform duration-200 group-hover:-translate-x-0.5' />
          Back to Login
        </LinkButton>
      </div>
    </ScaleIn>
  );
};

export default ForgotPasswordSentPage;
