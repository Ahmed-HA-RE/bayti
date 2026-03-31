import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { format } from 'date-fns';

const GreetingCard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'USER') {
    return redirect('/login');
  }

  const user = session.user;

  return (
    <Card className='bg-gray-100 rounded-sm border-0 py-7'>
      <CardContent className='flex flex-col gap-2 px-6'>
        <h2 className='text-2xl font-semibold'>Welcome back, {user.name}!</h2>
        <p className='text-muted-foreground text-base'>
          Member since {format(new Date(user.createdAt), 'MMM dd, yyyy')}
        </p>
      </CardContent>
    </Card>
  );
};

export default GreetingCard;
