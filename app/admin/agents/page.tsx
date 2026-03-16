import AgentsDataTable from '@/components/admin/agents/agents-table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Agents',
  description:
    'Monitor and manage all real estate agents, view assigned properties, edit agent details, and assign new listings seamlessly within the dashboard.',
};

const AdminAgentsPage = async () => {
  return (
    <Suspense>
      <AgentsDataTable />
    </Suspense>
  );
};

export default AdminAgentsPage;
