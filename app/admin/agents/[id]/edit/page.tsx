import AdminEditAgentDetails from '@/components/admin/agents/admin-edit-agent-details';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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
      title: `Edit Agent: ${agent.name}`,
      description: `Edit the profile details, contact information, and credentials of ${agent.name} on the platform.`,
    };
  }
  return {
    title: 'Edit Agent',
    description:
      'Edit the profile details, contact information, and credentials of the agent on the platform.',
  };
};

const AdminEditAgentPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/admin/agents');
  }

  return <AdminEditAgentDetails id={id} />;
};

export default AdminEditAgentPage;
