import AgentSkeletonCard from '@/components/agent/agent-skeleton-card';
import AgentsListSection from '@/components/agent/agents-list-section';
import FAQ from '@/components/home/faq-section';
import SectionHeader from '@/components/shared/section-header';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Find Trusted Real Estate Agents',
  description:
    'Discover and connect with verified real estate agents to buy, sell, or rent properties with confidence. Explore experienced professionals and find the right expert for your needs.',
};

const AgentsPage = async () => {
  const agents = await prisma.agent.findMany({
    where: {
      status: 'ACTIVE',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      role: true,
    },
  });

  return (
    <>
      <SectionHeader
        eyebrowTitle='Meet Our Experts'
        title='Our Real Estate Agents'
        subtitle='Explore detailed profiles of experienced real estate professionals. Learn more about their expertise, background, and areas of specialization.'
      />
      <Suspense fallback={<AgentSkeletonCard />}>
        <AgentsListSection agents={agents} />
      </Suspense>
      <FAQ />
    </>
  );
};

export default AgentsPage;
