'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { formatCityName } from '@/lib/utils';
import { GoDotFill } from 'react-icons/go';

type PropertiesPerCityItem = {
  city: string;
  _count: {
    _all: number;
  };
};

type PropertiesPerCityChartProps = {
  data: PropertiesPerCityItem[];
};

const propertiesPerCityConfig = {
  properties: {
    label: 'Properties',
    color: 'var(--color-accent)',
  },
} satisfies ChartConfig;

const PropertiesPerCityChart = ({ data }: PropertiesPerCityChartProps) => {
  const chartData = data.map((item) => ({
    city: formatCityName(item.city),
    properties: item._count._all,
  }));

  const totalProperties = chartData.reduce(
    (acc, item) => acc + item.properties,
    0,
  );

  const totalCities = chartData.length;

  return (
    <Card className='gap-4 h-full'>
      <CardHeader className='border-b'>
        <div className='flex flex-col gap-1'>
          <CardTitle>Properties by Cities</CardTitle>
          <span className='text-muted-foreground text-sm'>
            Total properties listed in each city
          </span>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-10'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div className='flex items-center gap-6'>
            <div className='flex flex-col'>
              <span className='text-2xl font-semibold'>
                {totalProperties.toLocaleString()}
              </span>
              <span className='text-muted-foreground text-sm'>
                Total Properties
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl font-semibold'>
                {totalCities.toLocaleString()}
              </span>
              <span className='text-muted-foreground text-sm'>
                Total Cities
              </span>
            </div>
          </div>
          <span className='flex items-center gap-2'>
            <GoDotFill className='animate-pulse text-accent size-4' />
            <span className='text-sm text-muted-foreground'>
              Number of properties in each city
            </span>
          </span>
        </div>

        <ChartContainer
          config={propertiesPerCityConfig}
          className='max-h-80 min-h-44 w-full'
        >
          <BarChart accessibilityLayer data={chartData} margin={{ left: -12 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray='4'
              stroke='var(--border)'
            />
            <XAxis
              dataKey='city'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              minTickGap={24}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Bar
              dataKey='properties'
              fill='var(--color-accent)'
              barSize={30}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {chartData.length === 0 && (
          <p className='text-muted-foreground text-sm'>
            No properties found for city breakdown.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesPerCityChart;
