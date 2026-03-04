'use client';

import { FunnelIcon, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import {
  PROPERTY_CITIES,
  PROPERTY_LIST_TYPES,
  PROPERTY_PRICE_RANGES,
  PROPERTY_TYPES,
} from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const FilterPropertiesSection = () => {
  return (
    <section className='section-spacing'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Card className='gap-6'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-xl'>
              <FunnelIcon className='size-6' />
              Find Your Property
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
            {/* Search Filter */}
            <div className='relative sm:col-span-4'>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <Search className='size-4' />
                <span className='sr-only'>Search</span>
              </div>
              <Input
                type='text'
                placeholder='Search property...'
                className='peer pl-9'
              />
            </div>
            {/* Property Type Filter */}
            <NativeSelect className='col-span-1 sm:col-span-2'>
              <NativeSelectOption value=''>Property Type</NativeSelectOption>
              {PROPERTY_TYPES.map((type) => (
                <NativeSelectOption key={type.value} value={type.value}>
                  {type.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property Location Filter */}
            <NativeSelect className='col-span-1 sm:col-span-2'>
              <NativeSelectOption value=''>Location</NativeSelectOption>
              {PROPERTY_CITIES.map((city) => (
                <NativeSelectOption key={city.value} value={city.value}>
                  {city.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property Price Filter */}
            <NativeSelect className='col-span-1 sm:col-span-2'>
              <NativeSelectOption value=''>Price Range</NativeSelectOption>
              {PROPERTY_PRICE_RANGES.map((price) => (
                <NativeSelectOption key={price.value} value={price.value}>
                  {price.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property List Type Filter */}
            <NativeSelect className='col-span-1 sm:col-span-2'>
              <NativeSelectOption value=''>List Type</NativeSelectOption>
              {PROPERTY_LIST_TYPES.map((type) => (
                <NativeSelectOption key={type.value} value={type.value}>
                  {type.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FilterPropertiesSection;
