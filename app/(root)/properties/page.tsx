import FilterPropertiesSection from '@/components/properties/filter-properties-section';
import PropertiesList from '@/components/properties/properties-list';
import SectionHeader from '@/components/shared/section-header';
import { APP_NAME } from '@/lib/constants';
import { PropertyList } from '@/lib/generated/prisma';
import { loadSearchParams } from '@/lib/searchParams';
import { Metadata } from 'next';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Properties',
  description:
    'Explore our extensive collection of properties, featuring detailed listings, high-quality images, and comprehensive information to help you find your perfect home or investment opportunity.',
};

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { search, type, location, price, listType, page } =
    await loadSearchParams(searchParams);

  return (
    <>
      <SectionHeader
        eyebrowTitle='Explore Our Properties'
        title='Discover Our Modern Properties for Sale & Rent'
        subtitle={`Every ${APP_NAME} property is thoughtfully designed for comfort, style and modern living. Explore our curated selection of premium homes — each crafted to meet the highest standards of quality and elegance.`}
      />
      <Suspense>
        <FilterPropertiesSection />
      </Suspense>
      <PropertiesList
        search={search}
        type={type}
        location={location}
        price={price}
        listType={listType as PropertyList}
        page={page}
      />
    </>
  );
};

export default PropertiesPage;
