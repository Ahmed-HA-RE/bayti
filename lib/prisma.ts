import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Prisma } from './generated/prisma/client';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

// Handle Decimal serialization for JSON responses
Prisma.Decimal.prototype.toJSON = function () {
  return this.toString();
};

const prisma = new PrismaClient({ adapter });

export default prisma;
