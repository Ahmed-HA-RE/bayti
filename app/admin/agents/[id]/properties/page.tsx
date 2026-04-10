import AgentPropertiesList from '@/components/agent/agent-properties-list';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';

type Props = {
  params: Promise<{ id: string | undefined }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  const agent = await prisma.agent.findUnique({
    where: { id },
    select: { name: true },
  });

  if (agent) {
    return {
      title: `${agent.name}'s Assigned Properties`,
      description: `List of properties assigned to ${agent.name}.`,
    };
  }
  return {
    title: 'Edit Agent',
    description:
      'Edit the profile details, contact information, and credentials of the agent on the platform.',
  };
};

const AgentPropertiesPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/admin/agents');
  }

  const agent = await prisma.agent.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!agent) {
    return redirect('/admin/agents');
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col gap-4'>
        <Link
          href={`/admin/agents`}
          className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit'
        >
          <FiArrowLeft className='size-3.5' />
          Back to Agents
        </Link>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-lg bg-muted'>
            <RiBuilding2Line className='size-5 text-muted-foreground' />
          </div>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight'>
              {agent.name}&apos;s Properties
            </h1>
            <p className='text-sm text-muted-foreground mt-0.5'>
              All properties currently assigned to this agent
            </p>
          </div>
        </div>
        <div className='h-px bg-border' />
      </div>

      <AgentPropertiesList agentId={id} />
    </div>
  );
};

export default AgentPropertiesPage;
