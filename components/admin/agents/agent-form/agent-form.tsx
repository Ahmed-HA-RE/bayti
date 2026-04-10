'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Agent } from '@/lib/generated/prisma';
import { AgentFormData, agentSchema } from '@/schema/agent';
import { AlertCircleIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { addAgent } from '@/lib/actions/admin/agent/add-agent';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { editAgent } from '@/lib/actions/admin/agent/edit-agent';
import { useQueryClient } from '@tanstack/react-query';
import AgentFormPersonalDetails from './agent-form-personal-details';
import AgentFormProfessionalDetails from './agent-form-professional-details';
import AgentFormSocial from './agent-form-social';

type SocialMediaLink = {
  platform: string;
  url: string;
};

const AgentForm = ({
  agent,
  type,
}: {
  agent?: Agent;
  type: 'add' | 'edit';
}) => {
  const router = useRouter();
  const [existingImage, setExistingImage] = useState(agent?.image || '');
  const queryClient = useQueryClient();

  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: agent?.name || '',
      slug: agent?.slug || '',
      description: agent?.description || '',
      email: agent?.email || '',
      phoneNumber: agent?.phoneNumber || '',
      role: agent?.role || '',
      location: agent?.location || '',
      city: agent?.city || '',
      status: agent?.status || '',
      socialMediaLinks: (agent?.socialMediaLinks as SocialMediaLink[]) || [],
    },
    mode: 'onChange',
  });

  const isImageUploaded = form.watch('image') || existingImage;

  const onSubmit = async (data: AgentFormData) => {
    if (!isImageUploaded) {
      form.setError('image', {
        type: 'onChange',
        message: 'Image is required',
      });
      return;
    }

    const res =
      type === 'add' ? await addAgent(data) : await editAgent(data, agent?.id);

    if (!res.success) {
      form.setError('root', {
        type: 'manual',
        message:
          res.message ||
          `Failed to ${type === 'add' ? 'add' : 'edit'} agent. Please try again.`,
      });
      return;
    }
    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
    router.push('/admin/agents');
  };

  const isPending = form.formState.isSubmitting;

  return (
    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
      {form.formState.errors.root && (
        <Alert variant='error'>
          <AlertCircleIcon />
          <AlertTitle className='flex items-center'>
            {form.formState.errors.root.message}
          </AlertTitle>
        </Alert>
      )}

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Personal Details */}
        <AgentFormPersonalDetails
          form={form}
          existingImage={existingImage}
          setExistingImage={setExistingImage}
        />

        {/* Professional Details */}
        <AgentFormProfessionalDetails form={form} />

        {/* Social Links */}
        <AgentFormSocial form={form} />
      </div>
      {/* Actions */}
      <div className='flex items-center justify-end gap-3 pb-4'>
        <Button asChild type='button' variant='outline'>
          <Link href='/admin/agents'>Cancel</Link>
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className='size-4' />{' '}
              {type === 'add' ? 'Adding...' : 'Saving...'}
            </>
          ) : type === 'add' ? (
            'Add Agent'
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
};

export default AgentForm;
