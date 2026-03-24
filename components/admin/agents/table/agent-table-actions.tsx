import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toggleAgentStatus } from '@/lib/actions/admin/agent/toggle-agent-status';
import { AgentStatus } from '@/lib/generated/prisma';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LuEllipsis } from 'react-icons/lu';

const AgentTableActions = ({
  agentId,
  status,
}: {
  agentId: string;
  status: AgentStatus;
}) => {
  const queryClient = useQueryClient();
  const agentStatus = status.toLowerCase() === 'active' ? 'active' : 'inactive';

  const toggleStatus = async () => {
    const res = await toggleAgentStatus(agentId, status);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='rounded-full p-2'
          aria-label='Edit item'
        >
          <LuEllipsis className='size-5' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-auto py-2'>
        <DropdownMenuGroup className='space-y-1'>
          <DropdownMenuItem asChild>
            <Link href={`/admin/agents/${agentId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/agents/${agentId}/properties`}>
              View Listings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant={agentStatus === 'active' ? 'destructive' : 'success'}
            onClick={toggleStatus}
          >
            {agentStatus === 'active' ? 'Deactivate' : 'Activate'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentTableActions;
