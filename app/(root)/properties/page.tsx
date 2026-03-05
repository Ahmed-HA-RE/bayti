import FilterPropertiesSection from '@/components/properties/filter-properties-section';
import SectionHeader from '@/components/shared/section-header';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Properties',
  description:
    'Explore our extensive collection of properties, featuring detailed listings, high-quality images, and comprehensive information to help you find your perfect home or investment opportunity.',
};

const PropertiesPage = () => {
  return (
    <Suspense>
      <SectionHeader
        title='Discover Our Modern Properties for Sale & Rent'
        subtitle={`Every ${APP_NAME} property is thoughtfully designed for comfort, style and modern living. Explore our curated selection of premium homes — each crafted to meet the highest standards of quality and elegance.`}
      />
      <FilterPropertiesSection />
    </Suspense>
  );
};

export default PropertiesPage;
