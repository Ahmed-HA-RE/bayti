'use client';

import { Property } from '@/lib/generated/prisma';
import { PropertyFormData, propertySchema } from '@/schema/property';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PropertyFormDetails from './property-form-details';

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
            images: [],
            isFeatured: false,
            propertyList: '',
            propertyType: '',
            amenities: [],
          },
    mode: 'onChange',
  });

  const onSubmit = (data: PropertyFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
        <PropertyFormDetails form={form} />
      </div>
    </form>
  );
};

export default PropertyForm;
