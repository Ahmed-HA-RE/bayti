import FeaturedProperties from '@/components/home/featured-properties';
import HeroSection from '@/components/home/hero-section';
import HomeAboutSection from '@/components/home/home-about-section';
import TrustedBySection from '@/components/home/trusted-by-section';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <HomeAboutSection />
      <FeaturedProperties />
    </>
  );
};

export default HomePage;
