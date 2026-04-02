'use client';

import { getMyBookings } from '@/lib/actions/account/get-my-bookings';
import { auth } from '@/lib/auth';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const AccountBookingList = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const page = useSearchParams().get('page') || 1;

  const userId = session.user.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['myBookings', userId, page],
    queryFn: async () => await getMyBookings(userId, Number(page)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return <div></div>;
};

export default AccountBookingList;
