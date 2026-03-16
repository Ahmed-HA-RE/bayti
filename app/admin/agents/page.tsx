import AgentsDataTable from '@/components/admin/agents/agents-table';
import { loadSearchParams } from '@/lib/searchParams';
import { Metadata } from 'next';
import { SearchParams } from 'nuqs/server';

export const metadata: Metadata = {
  title: 'Agents',
  description:
    'Monitor and manage all real estate agents, view assigned properties, edit agent details, and assign new listings seamlessly within the dashboard.',
};

const AdminAgentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { search, location, page } = await loadSearchParams(searchParams);

  return <AgentsDataTable search={search} location={location} page={page} />;
};

export default AdminAgentsPage;
