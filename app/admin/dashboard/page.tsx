import Statistics from '@/components/admin/statistics';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import prisma from '@/lib/prisma';
import PropertiesPerCityChart from '@/components/admin/properties-per-city-chart';
import UsersGrowthChart from '@/components/admin/users-growth-chart';
import PropertiesTable from '@/components/admin/properties/table/admin-properties-table';
import PopularPropertiesCard from '@/components/admin/popular-properties';

const AdminHomePage = async () => {
  const [
    propertiesPerCity,
    newMonthlyUsers,
    newWeeklyUsers,
    popularProperties,
  ] = await Promise.all([
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
      where: {
        bookings: {
          some: {
            status: 'COMPLETED',
          },
        },
      },
      select: {
        id: true,
        name: true,
        propertyImages: {
          select: {
            url: true,
          },
          take: 1,
        },

        _count: {
          select: {
            bookings: {
              where: {
                status: 'COMPLETED',
              },
            },
          },
        },
      },
      orderBy: {
        bookings: {
          _count: 'desc',
        },
      },
      take: 5,
    }),
  ]);

  return (
    <div className='space-y-6'>
      {/* Statistics Cards - Top Section */}
      <Statistics />

      <PropertiesPerCityChart data={propertiesPerCity} />

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <UsersGrowthChart
          newMonthlyUsers={newMonthlyUsers}
          newWeeklyUsers={newWeeklyUsers}
        />
        <PopularPropertiesCard populaProperties={popularProperties} />
      </div>

      {/* Properties Table - Full Width Bottom Section */}
      <PropertiesTable />
    </div>
  );
};

export default AdminHomePage;
