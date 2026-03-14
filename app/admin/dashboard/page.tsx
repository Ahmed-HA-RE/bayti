import Statistics from '@/components/admin/statistics';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import prisma from '@/lib/prisma';
import PropertiesPerCityChart from '@/components/admin/properties-per-city-chart';
import UsersGrowthChart from '@/components/admin/users-growth-chart';

const AdminHomePage = async () => {
  const [propertiesPerCity, newMonthlyUsers, newWeeklyUsers] =
    await Promise.all([
      prisma.property.groupBy({
        by: ['city'],
        where: {
          city: {
            not: '',
          },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          city: 'asc',
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth(new Date()),
            lte: endOfMonth(new Date()),
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfWeek(new Date()),
            lte: endOfWeek(new Date()),
          },
        },
      }),
    ]);

  return (
    <div className='space-y-8'>
      <Statistics />
      <PropertiesPerCityChart data={propertiesPerCity} />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <UsersGrowthChart
          newMonthlyUsers={newMonthlyUsers}
          newWeeklyUsers={newWeeklyUsers}
        />
      </div>
    </div>
  );
};

export default AdminHomePage;
