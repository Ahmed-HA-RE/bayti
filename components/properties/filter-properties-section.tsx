'use client';

import { FunnelIcon, SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import {
  PROPERTY_CITIES,
  PROPERTY_LIST_TYPES,
  PROPERTY_PRICE_RANGES,
  PROPERTY_TYPES,
} from '@/lib/constants';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { MotionPreset } from '../shared/motion-preset';
import { useFilters } from '@/hooks/useFilters';

const FilterPropertiesSection = () => {
  const [{ search, listType, location, price, type }, setFilters] =
    useFilters();

  return (
    <section className='section-spacing'>
      <MotionPreset
        fade
        slide={{ direction: 'left' }}
        delay={0.3}
        className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'
      >
        {/* Header Row */}
        <div className='flex items-center gap-2.5 mb-4'>
          <span className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm'>
            <FunnelIcon className='size-4' />
          </span>
          <h2 className='text-lg font-semibold tracking-tight'>
            Find Your Property
          </h2>
        </div>

        {/* Filter Card */}
        <div className='rounded-2xl border border-border bg-card shadow-sm'>
          {/* Search Row */}
          <div className='border-b border-border p-4'>
            <InputGroup>
              <InputGroupInput
                value={search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder='Search by name or location...'
                className='bg-transparent'
              />
              <InputGroupAddon align='inline-start'>
                <SearchIcon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Selects Row */}
          <div className='grid grid-cols-1 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0'>
            <div className='p-4'>
              <p className='mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'>
                Type
              </p>
              <NativeSelect
                value={type}
                onChange={(e) => setFilters({ type: e.target.value })}
                className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
              >
                <NativeSelectOption value=''>All Types</NativeSelectOption>
                {PROPERTY_TYPES.map((t) => (
                  <NativeSelectOption key={t.value} value={t.value}>
                    {t.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className='p-4'>
              <p className='mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'>
                Location
              </p>
              <NativeSelect
                value={location}
                onChange={(e) => setFilters({ location: e.target.value })}
                className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
              >
                <NativeSelectOption value=''>All Locations</NativeSelectOption>
                {PROPERTY_CITIES.map((city) => (
                  <NativeSelectOption key={city.value} value={city.value}>
                    {city.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className='p-4'>
              <p className='mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'>
                Price Range
              </p>
              <NativeSelect
                value={price}
                onChange={(e) => setFilters({ price: e.target.value })}
                className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
              >
                <NativeSelectOption value=''>Any Price</NativeSelectOption>
                {PROPERTY_PRICE_RANGES.map((p) => (
                  <NativeSelectOption key={p.value} value={p.value}>
                    {p.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className='p-4'>
              <p className='mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'>
                Listing
              </p>
              <NativeSelect
                value={listType}
                onChange={(e) => setFilters({ listType: e.target.value })}
                className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
              >
                <NativeSelectOption value=''>Buy or Rent</NativeSelectOption>
                {PROPERTY_LIST_TYPES.map((t) => (
                  <NativeSelectOption key={t.value} value={t.value}>
                    {t.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>
        </div>
      </MotionPreset>
    </section>
  );
};

export default FilterPropertiesSection;
