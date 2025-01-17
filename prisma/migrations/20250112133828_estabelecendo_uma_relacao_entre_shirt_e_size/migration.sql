/*
  Warnings:

  - Added the required column `sizeId` to the `Shirt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shirt" ADD COLUMN     "sizeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shirt" ADD CONSTRAINT "Shirt_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
