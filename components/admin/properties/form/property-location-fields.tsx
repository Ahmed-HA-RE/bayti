'use clinet';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { getLocations } from '@/lib/api/get-locations';
import { cn } from '@/lib/utils';
import { PropertyFormData } from '@/schema/property';
import { Location } from '@/types/location';
import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

const PropertyLocationFields = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(undefined);

  const { data, isFetching, error } = useQuery({
    queryKey: ['location-search', debouncedSearch],
    queryFn: () => getLocations(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    refetchOnMount: false,
  });

  return (
    <Controller
      name='address'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            Address <span className='text-destructive'>*</span>
          </FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className={cn(
                  'w-full justify-between pr-2 pl-3 text-muted-foreground font-normal',
                  fieldState.invalid && 'border-destructive',
                )}
              >
                {selectedLocation ? (
                  <span className='truncate'>
                    {selectedLocation.display_address}.
                  </span>
                ) : (
                  'Search Location...'
                )}
                <ChevronsUpDownIcon className='opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder='Search Location...'
                  className='h-9'
                  value={search}
                  onValueChange={(e) => setSearch(e)}
                />
                <CommandList>
                  <CommandGroup className='py-0'>
                    {isFetching ? (
                      <div className='flex items-center justify-center p-4'>
                        <Spinner />
                      </div>
                    ) : error ? (
                      <div className='flex items-center justify-center p-4'>
                        No Locations Found.
                      </div>
                    ) : (
                      data &&
                      data.length > 0 &&
                      data.map((location, index) => (
                        <CommandItem
                          key={index}
                          value={location.display_address}
                          className='cursor-pointer hover:text-accent hover:bg-orange-50'
                          onSelect={() => {
                            setSelectedLocation(location);
                            field.onChange(location.display_address);
                            form.setValue('city', location.city.toLowerCase());
                            form.setValue('longitude', location.longitude);
                            form.setValue('latitude', location.latitude);
                            setOpen(false);
                          }}
                        >
                          {location.display_address}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default PropertyLocationFields;
