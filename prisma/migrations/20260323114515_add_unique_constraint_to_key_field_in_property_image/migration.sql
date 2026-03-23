/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `PropertyImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PropertyImage_key_key" ON "PropertyImage"("key");
