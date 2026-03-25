'use client';

import { Property, PropertyImage } from '@/lib/generated/prisma';
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
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addProperty } from '@/lib/actions/admin/properties/add-property';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { editProperty } from '@/lib/actions/admin/properties/edit-property';

export type RemovedImage = {
  url: string;
  key: string;
};

const PropertyForm = ({
  type,
  property,
}: {
  type: 'add' | 'edit';
  property?: Property & { propertyImages: PropertyImage[] };
}) => {
  const [removedImages, setRemovedImages] = useState<RemovedImage[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

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
            propertyImages: [],
            bedrooms: 0,
            bathrooms: 0,
            isFeatured: false,
            propertyList: '',
            propertyType: '',
            amenities: [],
          },
    mode: 'onSubmit',
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (data: PropertyFormData) => {
    const res =
      type === 'edit' && property
        ? await editProperty(data, removedImages, property.id)
        : await addProperty(data);

    if (!res.success) {
      toast.error(res.message);
      return;
    } else {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['properties', 'admin-properties'],
      });
      router.push('/admin/properties');
    }
  };

  const handleRemoveImage = (imageKey: string) => {
    const removedImage = form
      .getValues('propertyImages')
      .find((img) => img.key === imageKey);

    if (removedImage) {
      setRemovedImages((prev) => [...prev, removedImage]);
      const updatedImages = form
        .getValues('propertyImages')
        .filter((img) => img.key !== imageKey);
      form.setValue('propertyImages', updatedImages);
      toast.success('Image removed successfully');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='grid grid-cols-1 gap-4'>
        <PropertyFormDetails form={form} />
        <PropertyFormSpecs form={form} />
        <PropertyFormFeatures form={form} />
        <PropertyFormMedia
          form={form}
          isEdit={type === 'edit'}
          onRemoveImage={handleRemoveImage}
        />
        <div className='flex items-end justify-end gap-4 mt-4'>
          <Button asChild variant={'secondary'}>
            <Link href='/admin/properties'>Cancel</Link>
          </Button>
          <Button type='submit' className='self-end' disabled={isPending}>
            {isPending ? (
              <>
                <Spinner className='size-4' />{' '}
                {type === 'add' ? 'Adding...' : 'Updating...'}
              </>
            ) : type === 'add' ? (
              'Add Property'
            ) : (
              'Update Property'
            )}{' '}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default PropertyForm;
