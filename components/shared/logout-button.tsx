import { Button } from '../ui/button';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const LogoutButton = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter();

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <Button
      className='w-full rounded-md mt-2'
      variant={'destructive'}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
