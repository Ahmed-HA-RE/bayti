import Footer from '@/components/footer';
import Header from '@/components/header/header';
import CtaSection from '@/components/home/cta-section';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      <main className='flex-grow overflow-hidden'>{children}</main>
      {/* Cta */}
      <CtaSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
