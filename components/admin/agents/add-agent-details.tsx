import { Separator } from '@/components/ui/separator';
import AgentForm from './agent-form';

const AddAgentDetails = () => {
  return (
    <div className=' mx-auto space-y-8 '>
      {/* Page Title */}
      <div>
        <h1 className='text-2xl font-bold text-foreground'>Add New Agent</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Fill in the details below to add a new real estate agent on the
          platform.
        </p>
      </div>

      <Separator />

      {/* Agent Details Form */}
      <AgentForm />
    </div>
  );
};

export default AddAgentDetails;
