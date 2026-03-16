import { sampleAgentsData, samplePropertiesData } from '@/sampleData';
import prisma from '@/lib/prisma';

export const main = async () => {
  await prisma.property.deleteMany();
  await prisma.agent.createMany({
    data: sampleAgentsData,
  });
};

main();
