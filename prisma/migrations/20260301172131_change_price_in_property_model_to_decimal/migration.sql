/*
  Warnings:

  - You are about to alter the column `reserveFees` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "reserveFees" SET DATA TYPE DECIMAL(10,2);
