/*
  Warnings:

  - You are about to drop the column `userPhone` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhoneNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "userPhone",
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "userPhoneNumber" TEXT NOT NULL;
