import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import VerifyEmailActionButton from '@/components/verify-email-action-button';

export const metadata: Metadata = {
  title: 'Verify Email',
  description:
    'Verify your email address to complete the registration process.',
};

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { error, email } = await searchParams;

  if (!email) {
    return redirect('/sign-up');
  }

  return (
    <main>
      <section>
        <div className='container flex flex-col items-center justify-center h-full min-h-screen gap-6'>
          <Image
            src={`/svg/email-${error ? 'unverified' : 'verified'}.svg`}
            alt='Verification Status'
            width={80}
            height={80}
            className='rounded-full'
          />
          <h1 className='text-3xl md:text-4xl font-semibold'>
            {error ? 'Email verification link expired' : 'Account verified'}
          </h1>
          <p className='text-muted-foreground text-base text-center'>
            {error
              ? 'Looks like your verification link has expired. Please request a new one.'
              : `Congratulations! your email account ${email} has been verified.`}
          </p>
          <VerifyEmailActionButton email={email} error={error} />
        </div>
      </section>
    </main>
  );
};

export default VerifyEmailPage;
