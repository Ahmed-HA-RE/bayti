import FeaturedProperties from '@/components/home/featured-properties-section';
import HeroSection from '@/components/home/hero-section';
import HomeAboutSection from '@/components/home/home-about-section';
import HowItWorksSection from '@/components/home/how-it-works-section';
import LatestPropertiesSection from '@/components/home/latest-properties-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import TrustedBySection from '@/components/home/trusted-by-section';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturedProperties />
      <HomeAboutSection />
      <HowItWorksSection />
      <LatestPropertiesSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
