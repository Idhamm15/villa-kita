/*
  Warnings:

  - You are about to drop the `ProductAttachment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TypeProperty" ADD VALUE 'Trip';

-- DropForeignKey
ALTER TABLE "ProductAttachment" DROP CONSTRAINT "ProductAttachment_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductAttachment";
