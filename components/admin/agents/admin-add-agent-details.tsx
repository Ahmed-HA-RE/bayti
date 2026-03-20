import AgentForm from './agent-form/agent-form';
import AdminFormLayout from '@/components/shared/admin-form-layout';

const AdminAddAgentDetails = () => {
  return (
    <AdminFormLayout
      title='Add New Agent'
      subtitle='Fill in the details below to add a new real estate agent on the platform.'
    >
      <AgentForm type='add' />
    </AdminFormLayout>
  );
};

export default AdminAddAgentDetails;
