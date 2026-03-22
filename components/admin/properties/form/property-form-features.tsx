import CardFormStepsLayout from '@/components/shared/card-form-steps-layout';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { AMENITIES } from '@/lib/constants';
import { PropertyFormData } from '@/schema/property';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FaListCheck } from 'react-icons/fa6';

const PropertyFormFeatures = ({
  form,
}: {
  form: UseFormReturn<PropertyFormData>;
}) => {
  return (
    <CardFormStepsLayout
      title='Property Features'
      icon={<FaListCheck className='size-5' />}
    >
      <h2 className='text-xl font-medium text-center mb-10'>Amenities</h2>
      <Controller
        name='amenities'
        control={form.control}
        render={({ field, fieldState }) => (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 justify-between'>
            {AMENITIES.map((amenity) => (
              <Field
                key={amenity.name}
                data-invalid={fieldState.invalid}
                orientation='horizontal'
              >
                <Checkbox
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value.includes(amenity.name)}
                  onCheckedChange={(e) => {
                    const isChecked = e;
                    if (isChecked) {
                      field.onChange([...field.value, amenity.name]);
                    } else {
                      field.onChange(
                        field.value.filter((value) => value !== amenity.name),
                      );
                    }
                  }}
                />
                <FieldLabel htmlFor={amenity.name}>{amenity.title}</FieldLabel>
              </Field>
            ))}
            {fieldState.error && (
              <FieldError
                className='col-span-full'
                errors={[fieldState.error]}
              />
            )}
          </div>
        )}
      />
    </CardFormStepsLayout>
  );
};

export default PropertyFormFeatures;
