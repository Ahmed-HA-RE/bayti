/*
  Warnings:

  - You are about to drop the column `reserveFees` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `fees` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "reserveFees";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "fees";
