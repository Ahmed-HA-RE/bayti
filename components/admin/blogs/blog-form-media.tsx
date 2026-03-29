'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { UploadDropzone } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { BlogFormData } from '@/schema/blog';
import { Controller, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

const BlogFormMedia = ({ form }: { form: UseFormReturn<BlogFormData> }) => {
  return (
    <Controller
      name='coverImageUrl'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            Cover Image URL <span className='text-destructive'>*</span>
          </FieldLabel>
          <UploadDropzone
            endpoint='blogCoverImage'
            className={cn(
              'ut-upload-icon:text-accent ut-label:text-foreground ut-button:bg-accent cursor-pointer ut-uploading:opacity-50 ut-uploading:cursor-not-allowed',
              fieldState.invalid && ' border-red-500',
            )}
            onClientUploadComplete={(res) => {
              const imageData = res[0];
              field.onChange(imageData.ufsUrl);
              form.setValue('coverImageKey', imageData.key);
              toast.success('Image uploaded successfully!');
            }}
            onUploadError={(error) => {
              toast.error(error.message);
            }}
            content={{
              label: ({ ready }) => {
                if (ready) {
                  return 'Click or drag image here to upload';
                }
                return 'Preparing upload...';
              },
              allowedContent: () => {
                return 'Only image files are allowed';
              },
            }}
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default BlogFormMedia;
