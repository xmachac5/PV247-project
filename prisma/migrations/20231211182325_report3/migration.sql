/*
  Warnings:

  - You are about to drop the column `personalDataId` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reportId]` on the table `ReportPersonalData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportId` to the `ReportPersonalData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportPersonalData" DROP CONSTRAINT "ReportPersonalData_id_fkey";

-- DropIndex
DROP INDEX "Report_personalDataId_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "personalDataId";

-- AlterTable
ALTER TABLE "ReportPersonalData" ADD COLUMN     "reportId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReportPersonalData_reportId_key" ON "ReportPersonalData"("reportId");

-- AddForeignKey
ALTER TABLE "ReportPersonalData" ADD CONSTRAINT "ReportPersonalData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
