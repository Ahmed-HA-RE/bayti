import type { CSSProperties } from 'react';
import AdminFooter from '@/components/admin/admin-footer';
import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import prisma from '@/lib/prisma';

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
      <div className='flex flex-1 flex-col overflow-hidden'>
        <AdminHeader />
        <main className='flex-grow p-4 md:p-6'>{children}</main>
        <AdminFooter />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
