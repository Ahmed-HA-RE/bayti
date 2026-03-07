/*
  Warnings:

  - Added the required column `type` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "PropertyList" NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userPhone" TEXT NOT NULL;
