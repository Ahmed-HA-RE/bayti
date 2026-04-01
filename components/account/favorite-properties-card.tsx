import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

const FavoritePropertiesCard = async ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const favoriteProperties = await prisma.favoriteProperty.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          propertyImages: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
    take: 2,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Card className='rounded-sm py-0 gap-0'>
      <CardHeader className='bg-gray-100 border-b rounded-none pt-4 px-6'>
        <h2 className='text-xl font-medium'>Your Favorites </h2>
      </CardHeader>
      <CardContent className='py-4'>
        {favoriteProperties.length === 0 ? (
          <p className='text-base text-muted-foreground py-4 h-32 flex items-center justify-center'>
            You have no favorite properties.
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {favoriteProperties.map((favorite) => (
              <Card
                key={favorite.property.id}
                className='pt-0 shadow-md border-0 gap-3 rounded-xs'
              >
                <CardHeader className='px-0'>
                  <Image
                    src={favorite.property.propertyImages[0].url}
                    alt={favorite.property.name}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='object-cover w-full'
                  />
                </CardHeader>
                <CardContent>
                  <h3 className='text-lg font-medium max-w-[250px] truncate'>
                    {favorite.property.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='bg-gray-100 border-t rounded-none py-4 flex justify-center'>
        <Button asChild className='group rounded-md py-2.5 px-5'>
          <Link href='/account/favorites'>
            View All Favorites
            <MdKeyboardArrowRight className='group-hover:translate-x-1 transition duration-300 size-5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavoritePropertiesCard;
