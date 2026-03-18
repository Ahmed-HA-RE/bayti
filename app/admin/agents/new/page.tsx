import AddAgentDetails from '@/components/admin/agents/add-agent-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Agent',
  description:
    'Add a new real estate agent to the platform by entering their profile details, contact information, and credentials.',
};

const AddAgentPage = () => {
  return <AddAgentDetails />;
};

export default AddAgentPage;
