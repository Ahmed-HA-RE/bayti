import BookingsDataTable from '@/components/admin/bookings/table/bookings-table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Manage and view all property bookings on the platform.',
};

const BookingsPage = () => {
  return (
    <Suspense>
      <BookingsDataTable />
    </Suspense>
  );
};

export default BookingsPage;
