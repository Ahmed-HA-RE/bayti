'use client';

import { APP_NAME } from '@/lib/constants';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t py-4 bg-white'>
      <div className='container'>
        <p className='text-center text-sm text-muted-foreground'>
          © {currentYear} {APP_NAME}. Admin Dashboard v1.0
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
