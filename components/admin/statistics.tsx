import {
  getTotalBookings,
  getTotalProperties,
  getTotalUsers,
  getTotalUpcomingBookings,
  getTotalSoldProperties,
} from '@/lib/actions/admin/get-statistcs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TbHomeStats } from 'react-icons/tb';
import { Users2Icon, CalendarClockIcon, ClipboardListIcon } from 'lucide-react';
import { BiSolidPurchaseTag } from 'react-icons/bi';

const Statistics = async () => {
  const cardStyles = 'rounded-lg py-4';

  const [
    totalProperties,
    totalUsers,
    totalBookings,
    totalUpcomingBookings,
    totalSoldProperties,
  ] = await Promise.all([
    getTotalProperties(),
    getTotalUsers(),
    getTotalBookings(),
    getTotalUpcomingBookings(),
    getTotalSoldProperties(),
  ]);

  const stats = [
    {
      title: 'Total Properties',
      value: totalProperties,
      icon: <TbHomeStats className='size-5 text-orange-600' />,
      iconBg: 'bg-orange-50',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <Users2Icon className='size-5 text-green-700' />,
      iconBg: 'bg-green-50',
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: <ClipboardListIcon className='size-5 text-blue-700' />,
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Upcoming Bookings',
      value: totalUpcomingBookings,
      icon: <CalendarClockIcon className='size-5 text-purple-700' />,
      iconBg: 'bg-purple-50',
    },
    {
      title: 'Sold Properties',
      value: totalSoldProperties,
      icon: <BiSolidPurchaseTag className='size-5 text-red-700' />,
      iconBg: 'bg-red-50',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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

export default Statistics;
