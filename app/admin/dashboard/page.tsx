import Statistics from '@/components/admin/statistics';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import prisma from '@/lib/prisma';
import PropertiesPerCityChart from '@/components/admin/properties-per-city-chart';
import UsersGrowthChart from '@/components/admin/users-growth-chart';
import PropertiesTable from '@/components/admin/properties-table';

const AdminHomePage = async () => {
  const [propertiesPerCity, newMonthlyUsers, newWeeklyUsers, recentProperties] =
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
          role: 'USER',
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfWeek(new Date()),
            lte: endOfWeek(new Date()),
          },
          role: 'USER',
        },
      }),

      prisma.property.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          images: true,
          city: true,
          price: true,
          createdAt: true,
          status: true,
          propertyList: true,
        },
        take: 5,
      }),
    ]);

  return (
    <div className='space-y-6'>
      {/* Statistics Cards - Top Section */}
      <Statistics />

      {/* Main Dashboard Grid - Asymmetric Layout */}
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
        {/* Primary Chart - Takes 8 columns on large screens */}
        <div className='xl:col-span-8'>
          <PropertiesPerCityChart data={propertiesPerCity} />
        </div>

        {/* Secondary Chart - Takes 4 columns (sidebar style) */}
        <div className='xl:col-span-4'>
          <UsersGrowthChart
            newMonthlyUsers={newMonthlyUsers}
            newWeeklyUsers={newWeeklyUsers}
          />
        </div>
      </div>

      {/* Properties Table - Full Width Bottom Section */}
      <PropertiesTable data={recentProperties} />
    </div>
  );
};

export default AdminHomePage;
