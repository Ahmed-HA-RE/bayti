'use client';
import { useQuery } from '@tanstack/react-query';

import { PropertyList } from '@/lib/generated/prisma';
import PropertyCard from '../shared/property-card';
import { Alert, AlertTitle } from '../ui/alert';
import { CircleAlertIcon } from 'lucide-react';

import Pagination from '../shared/pagination';
import { getProperties } from '@/lib/actions/get-properties';
import PropertySkeletonCard from '../shared/property-skeleton-card';

type PropertiesListProps = {
  search?: string;
  type?: string;
  location?: string;
  price?: string;
  listType?: PropertyList;
  page?: number;
};

const PropertiesList = ({
  search,
  type,
  location,
  price,
  listType,
  page,
}: PropertiesListProps) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['properties', { search, type, location, price, listType, page }],
    queryFn: () =>
      getProperties({ search, type, location, price, listType, page }),
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <section className='pb-8 sm:pb-14 lg:pb-20'>
      <div className='container'>
        {data && data.properties.length === 0 ? (
          <Alert className='max-w-2xl mx-auto border p-4 rounded-none bg-yellow-100 text-yellow-700 border-yellow-200'>
            <CircleAlertIcon className='size-5' />
            <AlertTitle className='text-base'>No properties found.</AlertTitle>
          </Alert>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
            {isFetching || isLoading ? (
              <PropertySkeletonCard length={8} />
            ) : (
              data?.properties.map((property) => (
                <div
                  className='h-[350px] md:h-[500px] overflow-hidden'
                  key={property.id}
                >
                  <PropertyCard property={property} key={property.id} />
                </div>
              ))
            )}
          </div>
        )}
        {data && data?.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} />
        )}
      </div>
    </section>
  );
};

export default PropertiesList;
