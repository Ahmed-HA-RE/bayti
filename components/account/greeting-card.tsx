import { auth } from '@/lib/auth';
import { Card, CardContent } from '../ui/card';
import { format } from 'date-fns';

const GreetingCard = async ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const user = session.user;

  return (
    <Card className='bg-gray-100 rounded-sm border-0 py-7'>
      <CardContent className='flex flex-col gap-2 px-6'>
        <h2 className='text-2xl font-semibold'>
          Welcome back, {user.name}! 👋
        </h2>
        <p className='text-muted-foreground text-base'>
          Member since {format(new Date(user.createdAt), 'MMM dd, yyyy')}
        </p>
      </CardContent>
    </Card>
  );
};

export default GreetingCard;
