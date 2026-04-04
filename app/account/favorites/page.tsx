import AccountHeaderLayout from '@/components/shared/account-header-layout';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import prisma from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GoAlertFill } from 'react-icons/go';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TfiRulerAlt2 } from 'react-icons/tfi';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      title: 'Unauthorized',
    };
  }

  return {
    title: `${session.user.name}'s Favorites Properties`,
    description: `View and manage all your favorite properties in your ${APP_NAME}'s account.`,
  };
};

const AccountFavorites = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  const favoriteProperties = await prisma.favoriteProperty.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          address: true,
          area: true,
          bedrooms: true,
          bathrooms: true,
          price: true,
          propertyList: true,
          propertyImages: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <AccountHeaderLayout
      title='Favorited Properties'
      subtitle='View and manage all your favorite properties in your account.'
    >
      {favoriteProperties.length === 0 ? (
        <Alert variant='info'>
          <GoAlertFill />
          <AlertTitle>You have no favorite properties.</AlertTitle>
        </Alert>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {favoriteProperties.map((fav) => (
            <Card
              key={fav.id}
              className='pt-0 border-0 shadow-lg rounded-lg gap-0'
            >
              <CardContent className='px-0'>
                <Link
                  href={`/property/${fav.property.id}`}
                  className='aspect-video relative overflow-hidden block'
                >
                  <Image
                    src={fav.property.propertyImages[0].url}
                    alt='Banner'
                    className='object-cover hover:scale-110 duration-500 transition-transform'
                    fill
                  />
                </Link>
              </CardContent>
              <CardHeader className='space-y-0.5 py-4'>
                <CardTitle className='text-lg font-bold'>
                  {fav.property.name}
                </CardTitle>
                <p className='text-muted-foreground text-sm max-w-sm truncate overflow-hidden'>
                  {fav.property.address}
                </p>
              </CardHeader>
              <CardContent className='self-end pb-2.5'>
                <div className='flex items-baseline gap-0.5'>
                  <span className='dirham-symbol text-lg font-bold text-accent leading-none'>
                    &#xea;
                  </span>
                  <span className='text-lg font-bold tracking-tight'>
                    {formatPrice(fav.property.price)}{' '}
                    {fav.property.propertyList === 'RENT' && (
                      <span className='text-xs text-muted-foreground font-normal'>
                        /month
                      </span>
                    )}
                  </span>
                </div>
              </CardContent>
              <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
                {/* Beds */}
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <IoBedOutline className='size-5' />
                  <h4>
                    {fav.property.bedrooms}{' '}
                    {fav.property.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </h4>
                </div>
                {/* Bathrooms */}
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <LuBath className='size-5' />
                  <h4>
                    {fav.property.bathrooms}{' '}
                    {fav.property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </h4>
                </div>
                {/* Area */}
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <TfiRulerAlt2 className='size-5' />
                  <h4>{fav.property.area} sq ft</h4>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </AccountHeaderLayout>
  );
};

export default AccountFavorites;
