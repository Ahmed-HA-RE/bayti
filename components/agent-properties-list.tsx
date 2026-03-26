'use client';

import { useFilters } from '@/hooks/useFilters';
import { getAgentProperties } from '@/lib/actions/get-agent-properties';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertTitle } from './ui/alert';
import { IoMdAlert } from 'react-icons/io';
import SkeletonPropertyCard from './skeleton-property-card';
import PropertyCard from './shared/property-card';
import Pagination from './shared/pagination';

const AgentPropertiesList = ({ agentId }: { agentId: string }) => {
  const [{ page }] = useFilters();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['agent-properties', agentId, page],
    queryFn: () => getAgentProperties(agentId, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {isLoading || isFetching ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonPropertyCard key={idx} />
          ))
        ) : data && data.properties.length === 0 ? (
          <Alert variant='warning' className='col-span-full max-w-sm mx-auto'>
            <IoMdAlert className='text-2xl' />
            <AlertTitle>No properties assigned for this agent</AlertTitle>
          </Alert>
        ) : (
          data?.properties.map((property) => (
            <div className='h-[350px] md:h-[500px]' key={property.id}>
              <PropertyCard property={property} isAgentListing />
            </div>
          ))
        )}
      </div>
      {data && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} />
      )}
    </>
  );
};

export default AgentPropertiesList;
