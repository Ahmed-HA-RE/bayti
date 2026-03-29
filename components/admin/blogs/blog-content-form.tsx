'use client';

import RichTextEditor from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Blog } from '@/lib/generated/prisma';
import { BlogContentFormData, blogContentSchema } from '@/schema/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const BlogContentForm = ({
  blog,
}: {
  blog: Pick<Blog, 'id' | 'title' | 'content' | 'status'>;
}) => {
  const form = useForm<BlogContentFormData>({
    resolver: zodResolver(blogContentSchema),
    defaultValues: {
      content: blog.content || '',
      status: blog.status || 'DRAFT',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BlogContentFormData) => {
    console.log(data);
  };

  const isPending = form.formState.isSubmitting;
  const canPublish = form.watch('content').length >= 150;
  const isDraft = form.watch('status') === 'DRAFT';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='content'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <RichTextEditor onChange={field.onChange} value={field.value} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <div className='flex items-center gap-4'>
          <Button
            className='bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
            disabled={isPending || !canPublish}
            onClick={() =>
              form.setValue('status', isDraft ? 'PUBLISHED' : 'DRAFT')
            }
          >
            {isDraft ? 'Publish' : 'Unpublish'}
          </Button>
          <Button disabled={isPending} type='submit' className='self-start'>
            {isPending ? 'Saving...' : 'Save Content'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default BlogContentForm;
