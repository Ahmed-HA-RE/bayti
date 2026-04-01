'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { TooltipProvider } from '../ui/tooltip';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <TooltipProvider>{children}</TooltipProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
