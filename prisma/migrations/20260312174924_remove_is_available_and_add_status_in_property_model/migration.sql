/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Property` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AVAILABLE', 'SOLD', 'RENTED');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "isAvailable",
ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE';
