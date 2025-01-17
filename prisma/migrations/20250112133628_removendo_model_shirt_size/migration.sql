/*
  Warnings:

  - You are about to drop the `ShirtSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShirtSize" DROP CONSTRAINT "ShirtSize_shirtId_fkey";

-- DropForeignKey
ALTER TABLE "ShirtSize" DROP CONSTRAINT "ShirtSize_sizeId_fkey";

-- DropTable
DROP TABLE "ShirtSize";
