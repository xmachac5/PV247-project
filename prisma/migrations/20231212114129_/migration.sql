/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ReportState` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "ReportState";
