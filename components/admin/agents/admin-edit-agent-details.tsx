import { Separator } from '@/components/ui/separator';
import AgentForm from './agent-form/agent-form';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

const AdminEditAgentDetails = async ({ id }: { id: string }) => {
  const agent = await prisma.agent.findUnique({
    where: { id },
  });

  if (!agent) {
    return redirect('/admin/agents');
  }

  return (
    <div className=' mx-auto space-y-8 '>
      {/* Page Title */}
      <div>
        <h1 className='text-2xl font-bold text-foreground'>Edit Agent</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Update the profile details, contact information, and credentials.
        </p>
      </div>

      <Separator />

      {/* Agent Details Form */}
      <AgentForm agent={agent} type='edit' />
    </div>
  );
};

export default AdminEditAgentDetails;
