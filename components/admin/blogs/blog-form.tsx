'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Blog } from '@/lib/generated/prisma';
import { BlogFormData, blogSchema } from '@/schema/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import BlogFormMedia from './blog-form-media';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { addBlog } from '@/lib/actions/admin/blogs/add-blog';
import { useRouter } from 'next/navigation';
import { updateBlog } from '@/lib/actions/admin/blogs/update-blog';

const BlogForm = ({ blog, type }: { blog?: Blog; type?: 'add' | 'update' }) => {
  const router = useRouter();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues:
      type === 'update' && blog
        ? blog
        : {
            title: '',
            coverImageKey: '',
            coverImageUrl: '',
            slug: '',
            tag: '',
          },
    mode: 'onChange',
  });

  const onSubmit = async (data: BlogFormData) => {
    if (type === 'update' && blog) {
      const res = await updateBlog(data, blog.id);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push('/admin/blogs');
    } else {
      const res = await addBlog(data);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push(`/admin/blogs/${res.blog?.slug}/content`);
    }
  };

  const isPending = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Title */}
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Enter Title <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                {...field}
                id={field.name}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {/* Slug */}
          <Controller
            name='slug'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Enter Slug <span className='text-destructive'>*</span>
                </FieldLabel>
                <ButtonGroup>
                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    id={field.name}
                    disabled
                  />
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Generate Slug'
                    className='py-0'
                    onClick={() => {
                      const title = form.getValues('title');
                      if (title) {
                        const slug = slugify(title, {
                          lower: true,
                        });
                        field.onChange(slug);
                        toast.success('Slug generated successfully!');
                      }
                    }}
                  >
                    Generate
                  </Button>
                </ButtonGroup>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* Tag */}
          <Controller
            name='tag'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Enter Tag <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  {...field}
                  id={field.name}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Cover Media */}
        <BlogFormMedia form={form} />
        <Button type='submit' className='self-start mt-4' disabled={isPending}>
          {type === 'update'
            ? isPending
              ? 'Updating...'
              : 'Update Blog'
            : isPending
              ? 'Creating...'
              : 'Create Blog'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default BlogForm;
