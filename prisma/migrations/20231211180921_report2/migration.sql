/*
  Warnings:

  - Added the required column `datetime` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateBorn` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReportPersonalData" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "dateBorn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
