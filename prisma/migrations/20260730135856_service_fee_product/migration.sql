-- CreateEnum
CREATE TYPE "VisitorType" AS ENUM ('SELF', 'SOMEONE_ELSE');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "visitorType" "VisitorType" NOT NULL DEFAULT 'SELF';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "serviceFee" BIGINT NOT NULL DEFAULT 5000;
