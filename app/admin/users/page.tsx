import AdminUsersTable from '@/components/admin/users/table/admin-users-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description:
    'Admin dashboard page for managing user accounts. This section allows administrators to view, edit, and manage user information, roles, and permissions across the platform.',
};

const AdminUsersPage = () => {
  return <AdminUsersTable />;
};

export default AdminUsersPage;
