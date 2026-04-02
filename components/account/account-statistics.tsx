import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LuNotepadText } from 'react-icons/lu';
import { GrFavorite } from 'react-icons/gr';
import { BsWatch } from 'react-icons/bs';

const AccountStatistics = async ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const cardStyles =
    'rounded-lg py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1';

  const [totalBookings, totalFavorites, upcomingBookings] = await Promise.all([
    prisma.booking.count({
      where: {
        userId: session.user.id,
      },
    }),
    prisma.favoriteProperty.count({
      where: {
        userId: session.user.id,
      },
    }),
    prisma.booking.count({
      where: {
        userId: session.user.id,
        status: 'PENDING',
      },
    }),
  ]);

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: <LuNotepadText className='size-5 text-blue-500' />,
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Total Favorites',
      value: totalFavorites,
      icon: <GrFavorite className='size-5 text-rose-500' />,
      iconBg: 'bg-rose-50',
    },
    {
      title: 'Upcoming Bookings',
      value: upcomingBookings,
      icon: <BsWatch className='size-5 text-slate-500' />,
      iconBg: 'bg-slate-100',
    },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      {stats.map((stat) => (
        <Card key={stat.title} className={cardStyles}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <span className={`rounded-md p-2 ${stat.iconBg}`}>{stat.icon}</span>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold tracking-tight'>
              {stat.value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountStatistics;
