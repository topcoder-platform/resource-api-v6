/*
  Warnings:

  - You are about to drop the `MemberProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "legacyId" INTEGER;

-- DropTable
DROP TABLE "MemberProfile";

-- DropTable
DROP TABLE "MemberStats";
