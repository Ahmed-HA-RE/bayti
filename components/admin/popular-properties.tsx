'use client';

import { EllipsisVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import Image from 'next/image';

const listItems = ['View All', 'Refresh'];

type Props = {
  populaProperties: {
    _count: { bookings: number };
    id: string;
    name: string;
    propertyImages: { url: string }[];
  }[];
};

const PopularPropertiesCard = ({ populaProperties }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setIsLoading(true);
    router.refresh();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const itemAction = (item: string) => {
    if (item === 'Refresh') {
      handleRefresh();
    } else if (item === 'View All') {
      router.push('/admin/properties');
    }
  };

  return (
    <Card className='gap-3'>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>Popular Properties</span>
          <span className='text-muted-foreground text-sm'>
            Top trending properties
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='text-muted-foreground size-6 rounded-full'
            >
              <EllipsisVerticalIcon />
              <span className='sr-only'>Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              {listItems.map((item, index) => (
                <DropdownMenuItem key={index} onClick={() => itemAction(item)}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-4'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <Spinner className='size-7' />
          </div>
        ) : populaProperties.length === 0 ? (
          <div className='flex items-center justify-center h-full py-3.5'>
            <span className='text-muted-foreground'>
              No popular properties found.
            </span>
          </div>
        ) : (
          populaProperties.map((property, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-2'
            >
              <div className='flex items-center justify-between gap-2'>
                <Image
                  src={property.propertyImages[0]?.url}
                  alt={property.name}
                  width={60}
                  height={60}
                  className='rounded'
                />
                <span className='font-medium max-w-[150px] md:max-w-[200px] lg:max-w-none truncate '>
                  The the the the{property.name}
                </span>
              </div>
              <span className='text-muted-foreground text-sm'>
                {property._count.bookings} Booking
                {property._count.bookings !== 1 ? 's' : ''}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PopularPropertiesCard;
