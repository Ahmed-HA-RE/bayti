'use client';

import { Property } from '@/lib/generated/prisma';
import { PropertyFormData, propertySchema } from '@/schema/property';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PropertyFormDetails from './property-form-details';
import PropertyFormSpecs from './property-form-price-and-area';
import { FieldGroup } from '@/components/ui/field';
import PropertyFormFeatures from './property-form-features';
import PropertyFormMedia from './property-form-media';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PropertyForm = ({
  type,
  property,
}: {
  type: 'add' | 'edit';
  property?: Property;
}) => {
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues:
      type === 'edit'
        ? property
        : {
            name: '',
            description: '',
            address: '',
            latitude: 0,
            longitude: 0,
            city: '',
            price: 0,
            area: 0,
            bedrooms: 0,
            bathrooms: 0,
            images: [{ url: '', key: '' }],
            isFeatured: false,
            propertyList: '',
            propertyType: '',
            amenities: [],
          },
    mode: 'onChange',
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = (data: PropertyFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='grid grid-cols-1 gap-4'>
        <PropertyFormDetails form={form} />
        <PropertyFormSpecs form={form} />
        <PropertyFormFeatures form={form} />
        <PropertyFormMedia form={form} />
        <div className='flex items-end justify-end gap-4 mt-4'>
          <Button asChild variant={'secondary'}>
            <Link href='/admin/properties'>Cancel</Link>
          </Button>
          <Button type='submit' className='self-end' disabled={isPending}>
            {isPending ? (
              <>
                <Spinner className='size-4 mr-2' />{' '}
                {type === 'add' ? 'Adding...' : 'Updating...'}
              </>
            ) : type === 'add' ? (
              'Add'
            ) : (
              'Update'
            )}{' '}
            Property
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default PropertyForm;
