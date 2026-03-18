import { Card, CardContent } from '@/components/ui/card';
import AdminHeader from '@/components/admin/admin-header';
import { Metadata } from 'next';
import { TooltipProvider } from '@/components/ui/tooltip';
import AdminFooter from '@/components/admin/admin-footer';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s - Admin Dashboard',
  },
  description:
    'Manage properties, users, agents, and bookings from the Bayti Admin Dashboard. Monitor listings, update property information, and oversee platform activity in one centralized management panel.',
};

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-dvh flex-col'>
      <AdminHeader />
      <main className='container flex-1 py-6'>
        <TooltipProvider>
          <Card className='rounded-lg'>
            <CardContent>{children}</CardContent>
          </Card>
        </TooltipProvider>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminDashboardLayout;
