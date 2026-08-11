/*
  Warnings:

  - The values [Hotel,Villa,Apartment,Guest,Trip] on the enum `TypeProperty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeProperty_new" AS ENUM ('VILLA', 'TRIP');
ALTER TABLE "Product" ALTER COLUMN "typeProperty" TYPE "TypeProperty_new"[] USING ("typeProperty"::text::"TypeProperty_new"[]);
ALTER TYPE "TypeProperty" RENAME TO "TypeProperty_old";
ALTER TYPE "TypeProperty_new" RENAME TO "TypeProperty";
DROP TYPE "TypeProperty_old";
COMMIT;
