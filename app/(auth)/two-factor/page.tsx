import OTPInputForm from '@/components/auth/otp-input-form';
import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiPhoneLockLine } from 'react-icons/ri';
import { LuKeyRound } from 'react-icons/lu';
import BackUpCodeForm from '@/components/auth/backup-code-form';

export const metadata: Metadata = {
  title: 'Two-Factor Authentication (2FA)',
  description:
    'Enable two-factor authentication (2FA) to add an extra layer of security to your account. Protect your data with OTP verification and backup codes for safe login.',
};

const TwoFactorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const callbackUrl = (await searchParams).callbackUrl || '/';

  const tabs = [
    {
      name: 'Authenticator App',
      value: 'authenticator-app',
      icon: RiPhoneLockLine,
      content: <OTPInputForm callbackUrl={callbackUrl} />,
    },
    {
      name: 'Backup Codes',
      value: 'backup-codes',
      icon: LuKeyRound,
      content: <BackUpCodeForm callbackUrl={callbackUrl} />,
    },
  ];
  return (
    <div className='flex flex-col items-center justify-center h-full gap-6 px-5'>
      <div className='space-y-1.5'>
        <h1 className='text-3xl font-semibold text-center'>
          Two-Factor Authentication
        </h1>
        <p className='text-muted-foreground text-sm max-w-md text-center'>
          Enter the 6-digit code from your authenticator app, or use one of your
          backup codes if you can&apos;t access the app.
        </p>
      </div>
      {/* Tabs */}
      <Tabs defaultValue='authenticator-app' className='gap-6'>
        <TabsList className='group-data-[orientation=horizontal]/tabs:h-fit bg-muted p-1.5 rounded-xl'>
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex flex-col items-center gap-1 px-6 py-3 cursor-pointer rounded-lg transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground  data-[state=active]:shadow-sm [&>svg]:size-5 data-[state=inactive]:text-muted-foreground hover:text-foreground'
            >
              <Icon />
              <span className='text-sm font-medium'>{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TwoFactorPage;
