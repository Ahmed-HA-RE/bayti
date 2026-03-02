import FeaturedProperties from '@/components/home/featured-properties-section';
import HeroSection from '@/components/home/hero-section';
import HomeAboutSection from '@/components/home/home-about-section';
import HowItWorksSection from '@/components/home/how-it-works-section';
import TrustedBySection from '@/components/home/trusted-by-section';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturedProperties />
      <HomeAboutSection />
      <HowItWorksSection />
    </>
  );
};

export default HomePage;
