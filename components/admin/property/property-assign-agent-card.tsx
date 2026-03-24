import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { MdRealEstateAgent } from 'react-icons/md';
import Image from 'next/image';
import { FiMail } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { LuMapPin } from 'react-icons/lu';
import { Agent, Property } from '@/lib/generated/prisma';

const PropertyAssignedAgentCard = ({
  property,
}: {
  property: Property & { agent: Agent };
}) => {
  const agentStatusStyles = {
    ACTIVE: 'bg-green-50 text-green-700 border-green-200',
    INACTIVE: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0'>
        <CardTitle className='text-base flex items-center gap-2'>
          <MdRealEstateAgent className='size-4' />
          Assigned Agent
        </CardTitle>
        <Link
          href={`/admin/agents/${property.agent.id}/edit`}
          className='inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border rounded-md px-2.5 py-1.5 transition-colors'
        >
          <PencilIcon className='size-3' />
          Edit Agent
        </Link>
      </CardHeader>
      <Separator className='mb-2' />
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <Avatar className='size-12 rounded-full overflow-hidden shrink-0'>
              <Suspense>
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  width={48}
                  height={48}
                  className='object-cover'
                />
              </Suspense>
            </Avatar>
            <div className='flex flex-col gap-0.5 min-w-0'>
              <p className='font-medium text-sm truncate'>
                {property.agent.name}
              </p>
              <p className='text-xs text-muted-foreground'>
                {property.agent.role}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border w-fit mt-0.5 ${agentStatusStyles[property.agent.status]}`}
          >
            {property.agent.status}
          </span>
        </div>

        <div className='space-y-2.5 text-sm'>
          <a
            href={`mailto:${property.agent.email}`}
            className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
          >
            <FiMail className='size-4 shrink-0' />
            <span className='truncate'>{property.agent.email}</span>
          </a>
          <a
            href={`tel:${property.agent.phoneNumber}`}
            className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
          >
            <BsTelephone className='size-4 shrink-0' />
            <span>{property.agent.phoneNumber}</span>
          </a>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <LuMapPin className='size-4 shrink-0' />
            <span>{property.agent.city}, UAE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAssignedAgentCard;
