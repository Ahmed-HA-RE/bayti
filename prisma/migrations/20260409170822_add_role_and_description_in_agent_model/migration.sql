/*
  Warnings:

  - Added the required column `description` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `Agent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AgentRole" AS ENUM ('SALES', 'LEASING', 'PROPERTY_MANAGER', 'LISTING', 'BUYERS_AGENT', 'LUXURY_SPECIALIST', 'COMMERCIAL', 'RENTAL_CONSULTANT', 'CONSULTANT');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "AgentRole" NOT NULL;
