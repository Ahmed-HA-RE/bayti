'use server';

import { auth } from '@/lib/auth';
import { AgentStatus } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const toggleAgentStatus = async (
  agentId: string,
  status: AgentStatus,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    // Check if the agent exists
    const isAgentExist = await prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!isAgentExist) {
      throw new Error('Agent not found');
    }

    // Toggle the agent's status
    await prisma.agent.update({
      where: { id: agentId },
      data: {
        status:
          status === AgentStatus.ACTIVE
            ? AgentStatus.INACTIVE
            : AgentStatus.ACTIVE,
      },
    });

    return { success: true, message: 'Agent status updated successfully' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
