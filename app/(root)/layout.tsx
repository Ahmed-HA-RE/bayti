import Footer from '@/components/footer';
import Header from '@/components/header/header';
import CtaSection from '@/components/home/cta-section';
import FAQ from '@/components/shared/faq-section';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header session={session} />
      <main className='flex-grow overflow-hidden'>{children}</main>
      {/* FAQ */}
      <FAQ />
      {/* Cta */}
      <CtaSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
