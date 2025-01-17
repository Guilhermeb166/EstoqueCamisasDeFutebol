/*
  Warnings:

  - You are about to drop the column `descricao` on the `Camisa` table. All the data in the column will be lost.
  - You are about to drop the column `imagemUrl` on the `Camisa` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Camisa` table. All the data in the column will be lost.
  - You are about to drop the `times` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Camisa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Camisa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Camisa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Camisa" DROP CONSTRAINT "Camisa_timeId_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_paisId_fkey";

-- AlterTable
ALTER TABLE "Camisa" DROP COLUMN "descricao",
DROP COLUMN "imagemUrl",
DROP COLUMN "nome",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "times";

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paisId" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Camisa" ADD CONSTRAINT "Camisa_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
