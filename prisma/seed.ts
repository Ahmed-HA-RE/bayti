import { samplePropertiesData } from '@/sampleData';
import prisma from '@/lib/prisma';

export const main = async () => {
  await prisma.property.deleteMany();
  await prisma.property.createMany({
    data: samplePropertiesData,
  });
};

main();
