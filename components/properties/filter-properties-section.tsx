'use client';

import { FunnelIcon, SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import {
  PROPERTY_CITIES,
  PROPERTY_LIST_TYPES,
  PROPERTY_PRICE_RANGES,
  PROPERTY_TYPES,
} from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
      .withOptions({
        shallow: false,
        limitUrlUpdates: debounce(300),
      })
      .withDefault(''),
  );

  const [type, setType] = useQueryState(
    'type',
    parseAsString
      .withOptions({
        shallow: false,
      })
      .withDefault(''),
  );
  const [location, setLocation] = useQueryState(
    'location',
    parseAsString
      .withOptions({
        shallow: false,
      })
      .withDefault(''),
  );
  const [price, setPrice] = useQueryState(
    'price',
    parseAsString
      .withOptions({
        shallow: false,
      })
      .withDefault(''),
  );
  const [listType, setListType] = useQueryState(
    'listType',
    parseAsString
      .withOptions({
        shallow: false,
      })
      .withDefault(''),
  );

  const isAnyFilterActive = search || type || location || price || listType;

  return (
    <section className='section-spacing'>
      <MotionPreset
        fade
        slide={{ direction: 'left' }}
        delay={0.3}
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
      >
        <Card className='gap-6'>
          <CardHeader className='flex items-center justify-between '>
            <CardTitle className='flex items-center gap-2 text-xl'>
              <FunnelIcon className='size-6' />
              Find Your Property
            </CardTitle>
            {isAnyFilterActive && (
              <Button
                className='text-sm text-red-500 py-0'
                onClick={() => {
                  setSearch('');
                  setType('');
                  setLocation('');
                  setPrice('');
                  setListType('');
                }}
                variant={'ghost'}
              >
                Clear Filters
              </Button>
            )}
          </CardHeader>
          <CardContent className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
            {/* Search Filter */}
            <InputGroup className='sm:col-span-4'>
              <InputGroupInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search Property..'
              />
              <InputGroupAddon align='inline-start'>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {/* Property Type Filter */}
            <NativeSelect
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='col-span-1 sm:col-span-2'
            >
              <NativeSelectOption value=''>Property Type</NativeSelectOption>
              {PROPERTY_TYPES.map((type) => (
                <NativeSelectOption key={type.value} value={type.value}>
                  {type.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property Location Filter */}
            <NativeSelect
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='col-span-1 sm:col-span-2'
            >
              <NativeSelectOption value=''>Location</NativeSelectOption>
              {PROPERTY_CITIES.map((city) => (
                <NativeSelectOption key={city.value} value={city.value}>
                  {city.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property Price Filter */}
            <NativeSelect
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='col-span-1 sm:col-span-2'
            >
              <NativeSelectOption value=''>Price Range</NativeSelectOption>
              {PROPERTY_PRICE_RANGES.map((price) => (
                <NativeSelectOption key={price.value} value={price.value}>
                  {price.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {/* Property List Type Filter */}
            <NativeSelect
              value={listType}
              onChange={(e) => setListType(e.target.value)}
              className='col-span-1 sm:col-span-2'
            >
              <NativeSelectOption value=''>List Type</NativeSelectOption>
              {PROPERTY_LIST_TYPES.map((type) => (
                <NativeSelectOption key={type.value} value={type.value}>
                  {type.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </CardContent>
        </Card>
      </MotionPreset>
    </section>
  );
};

export default FilterPropertiesSection;
