import Footer from '@/components/footer';
import Header from '@/components/header/header';
import CtaSection from '@/components/home/cta-section';
import FAQ from '@/components/shared/faq-section';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
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
