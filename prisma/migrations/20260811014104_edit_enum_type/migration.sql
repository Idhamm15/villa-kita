/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `typeProperty` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `CategoryProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('VILLA', 'TRIP');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "typeProperty",
ADD COLUMN     "type" "Type"[];

-- DropTable
DROP TABLE "CategoryProduct";

-- DropEnum
DROP TYPE "TypeProperty";
