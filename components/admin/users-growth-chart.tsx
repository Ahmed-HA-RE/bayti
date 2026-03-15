'use client';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsersGrowthTable = ({
  newMonthlyUsers,
  newWeeklyUsers,
}: {
  newMonthlyUsers: number;
  newWeeklyUsers: number;
}) => {
  const growthRate =
    newWeeklyUsers > 0
      ? ((newMonthlyUsers - newWeeklyUsers) / newWeeklyUsers) * 100
      : 0;

  const isGrowthPositive = growthRate >= 0;

  return (
    <Card className='gap-4 h-full'>
      <CardHeader>
        <div className='flex flex-col gap-1'>
          <CardTitle>Users Growth</CardTitle>
          <span className='text-muted-foreground text-sm'>
            New users this week versus this month
          </span>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <div className='overflow-hidden rounded-lg border'>
          <table className='w-full text-sm'>
            <thead className='bg-muted/50'>
              <tr>
                <th className='text-left px-4 py-2 font-medium'>Period</th>
                <th className='text-right px-4 py-2 font-medium'>Users</th>
              </tr>
            </thead>

            <tbody>
              <tr className='border-t'>
                <td className='px-4 py-3 flex items-center gap-2'>
                  <CalendarDaysIcon className='size-4' />
                  This Week
                </td>
                <td className='px-4 py-3 text-right font-semibold'>
                  {newWeeklyUsers.toLocaleString()}
                </td>
              </tr>

              <tr className='border-t'>
                <td className='px-4 py-3 flex items-center gap-2'>
                  <CalendarClockIcon className='size-4' />
                  This Month
                </td>
                <td className='px-4 py-3 text-right font-semibold'>
                  {newMonthlyUsers.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='flex items-center gap-2 text-sm'>
          {isGrowthPositive ? (
            <ArrowUpIcon className='size-4 text-green-600' />
          ) : (
            <ArrowDownIcon className='size-4 text-red-600' />
          )}
          <span className='font-medium'>
            {Math.abs(growthRate).toFixed(1)}%
          </span>
          <span className='text-muted-foreground'>
            growth comparing week vs month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersGrowthTable;
