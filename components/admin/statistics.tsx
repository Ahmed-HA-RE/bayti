import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TbHomeStats } from 'react-icons/tb';
import {
  Users2Icon,
  CalendarClockIcon,
  ClipboardListIcon,
  UserCheck,
} from 'lucide-react';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import prisma from '@/lib/prisma';

const Statistics = async () => {
  const cardStyles =
    'rounded-lg py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1';

  const [
    totalProperties,
    totalUsers,
    totalBookings,
    totalUpcomingBookings,
    totalSoldProperties,
    totalAgents,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        date: {
          gt: new Date(),
        },
      },
    }),
    prisma.property.count({
      where: {
        status: 'SOLD',
      },
    }),
    prisma.agent.count(),
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
    {
      title: 'Total Agents',
      value: totalAgents,
      icon: <UserCheck className='size-5 text-yellow-700' />,
      iconBg: 'bg-yellow-50',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
