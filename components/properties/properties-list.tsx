'use client';
import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/lib/actions/get-properties';
import { PropertyList } from '@/lib/generated/prisma/enums';
import PropertyCard from '../shared/property-card';
import { MotionPreset } from '../shared/motion-preset';
import { Alert, AlertTitle } from '../ui/alert';
import { CircleAlertIcon } from 'lucide-react';
import SkeletonPropertyCard from '../skeleton-property-card';
import Pagination from '../shared/pagination';

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
    <section>
      <div className='container'>
        {data && data?.properties?.length === 0 ? (
          <Alert className='max-w-2xl mx-auto border p-4 rounded-none bg-yellow-100 text-yellow-700 border-yellow-200'>
            <CircleAlertIcon className='size-5' />
            <AlertTitle className='text-base'>
              No properties found matching your criteria.
            </AlertTitle>
          </Alert>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {isFetching || isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonPropertyCard key={index} />
                ))
              : data?.properties.map((property, index) => (
                  <MotionPreset
                    fade
                    slide={{ direction: 'up' }}
                    blur
                    delay={index * 0.1}
                    key={property.id}
                  >
                    <PropertyCard property={property} />
                  </MotionPreset>
                ))}
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
