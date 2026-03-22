import type { CSSProperties } from 'react';
import AdminFooter from '@/components/admin/admin-footer';
import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
};

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const admins = await prisma.user.findMany({
    where: {
      role: 'ADMIN',
    },
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  return (
    <SidebarProvider
      style={
        {
          '--sidebar': 'var(--card)',
          '--sidebar-width': '17rem',
          '--sidebar-width-icon': '3.5rem',
          '--sidebar-width-mobile': '2rem',
        } as CSSProperties
      }
    >
      <AdminSidebar admins={admins} />
      <div className='flex flex-1 flex-col overflow-hidden bg-gray-100/80'>
        <AdminHeader />
        <main className='flex-grow container py-6'>
          <Card className='border-0 rounded-lg'>
            <CardContent>{children}</CardContent>
          </Card>
        </main>
        <AdminFooter />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
