-- CreateEnum
CREATE TYPE "AgentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "status" "AgentStatus" NOT NULL DEFAULT 'ACTIVE';
