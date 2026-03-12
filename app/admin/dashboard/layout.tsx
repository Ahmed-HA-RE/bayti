import { Card, CardContent } from '@/components/ui/card';
import AdminHeader from '@/components/admin/admin-header';
import { APP_NAME } from '@/lib/constants';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='flex min-h-dvh flex-col'>
      <AdminHeader />
      <main className='container flex-1 py-6'>
        <Card className='rounded-xl'>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
      <footer className='border-t py-4'>
        <div className='container'>
          <p className='text-center text-sm text-muted-foreground'>
            © {currentYear} {APP_NAME}. Admin Dashboard v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboardLayout;
