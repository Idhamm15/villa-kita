/*
  Warnings:

  - You are about to drop the column `typeBooking` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "bookingType" AS ENUM ('MENGINAP', 'HARIAN');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "typeBooking",
ADD COLUMN     "bookingType" "bookingType"[];

-- DropEnum
DROP TYPE "TypeBooking";
