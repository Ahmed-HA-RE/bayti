/*
  Warnings:

  - A unique constraint covering the columns `[imageKey]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "imageKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_imageKey_key" ON "user"("imageKey");
