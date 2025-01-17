/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Shirt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Shirt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shirt" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shirt_slug_key" ON "Shirt"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Size_slug_key" ON "Size"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");
