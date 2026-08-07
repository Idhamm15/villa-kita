/*
  Warnings:

  - You are about to drop the column `no_bank` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "no_bank",
ADD COLUMN     "noBank" TEXT;
