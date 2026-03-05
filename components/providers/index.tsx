import { NuqsAdapter } from 'nuqs/adapters/next/app';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default Providers;
