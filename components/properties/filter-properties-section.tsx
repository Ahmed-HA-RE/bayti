'use client';

import { FunnelIcon, SearchIcon, XIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import {
  PROPERTY_CITIES,
  PROPERTY_LIST_TYPES,
  PROPERTY_PRICE_RANGES,
  PROPERTY_TYPES,
} from '@/lib/constants';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Button } from '../ui/button';
import { MotionPreset } from '../shared/motion-preset';

const FilterPropertiesSection = () => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString
      .withOptions({ shallow: false, limitUrlUpdates: debounce(300) })
      .withDefault(''),
  );
  const [type, setType] = useQueryState(
    'type',
    parseAsString.withOptions({ shallow: false }).withDefault(''),
  );
  const [location, setLocation] = useQueryState(
    'location',
    parseAsString.withOptions({ shallow: false }).withDefault(''),
  );
  const [price, setPrice] = useQueryState(
    'price',
    parseAsString.withOptions({ shallow: false }).withDefault(''),
  );
  const [listType, setListType] = useQueryState(
    'listType',
    parseAsString.withOptions({ shallow: false }).withDefault(''),
  );

  const isAnyFilterActive = search || type || location || price || listType;

  const clearAll = () => {
    setSearch('');
    setType('');
    setLocation('');
    setPrice('');
    setListType('');
  };

  return (
    <section className='section-spacing'>
      <MotionPreset
        fade
        slide={{ direction: 'left' }}
        delay={0.3}
        className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'
      >
        {/* Header Row */}
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <span className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm'>
              <FunnelIcon className='size-4' />
            </span>
            <h2 className='text-lg font-semibold tracking-tight'>
              Find Your Property
            </h2>
          </div>

          {isAnyFilterActive && (
            <Button
              variant='ghost'
              onClick={clearAll}
              className='flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground transition hover:text-red-500 p-0'
            >
              <XIcon className='size-3.5' />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filter Card */}
        <div className='rounded-2xl border border-border bg-card shadow-sm'>
          {/* Search Row */}
          <div className='border-b border-border p-4'>
            <InputGroup>
              <InputGroupInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                onChange={(e) => setType(e.target.value)}
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
                onChange={(e) => setLocation(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setListType(e.target.value)}
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
