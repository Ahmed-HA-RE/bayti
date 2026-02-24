import Banner from '@/components/banner';
import Footer from '@/components/footer';
import Header from '@/components/header/header';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Banner />
      {/* Header */}
      <Header />
      <main className='flex-grow'>{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
