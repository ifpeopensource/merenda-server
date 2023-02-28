/*
  Warnings:

  - You are about to drop the column `closedAt` on the `meal_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meal_sessions" DROP COLUMN "closedAt",
ADD COLUMN     "finishedAt" TIMESTAMP(3);
