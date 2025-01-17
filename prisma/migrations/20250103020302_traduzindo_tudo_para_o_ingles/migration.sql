/*
  Warnings:

  - You are about to drop the column `paisId` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the `Camisa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CamisaTamanho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tamanho` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Camisa" DROP CONSTRAINT "Camisa_timeId_fkey";

-- DropForeignKey
ALTER TABLE "CamisaTamanho" DROP CONSTRAINT "CamisaTamanho_camisaId_fkey";

-- DropForeignKey
ALTER TABLE "CamisaTamanho" DROP CONSTRAINT "CamisaTamanho_tamanhoId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_paisId_fkey";

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "paisId",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Camisa";

-- DropTable
DROP TABLE "CamisaTamanho";

-- DropTable
DROP TABLE "Tamanho";

-- CreateTable
CREATE TABLE "Shirt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shirt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShirtSize" (
    "id" TEXT NOT NULL,
    "shirtId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "ShirtSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_size_key" ON "Size"("size");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shirt" ADD CONSTRAINT "Shirt_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShirtSize" ADD CONSTRAINT "ShirtSize_shirtId_fkey" FOREIGN KEY ("shirtId") REFERENCES "Shirt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShirtSize" ADD CONSTRAINT "ShirtSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
