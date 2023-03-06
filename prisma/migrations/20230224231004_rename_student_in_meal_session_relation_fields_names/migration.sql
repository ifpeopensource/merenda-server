/*
  Warnings:

  - You are about to drop the column `sessionId` on the `students_in_meal_sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mealSessionId,studentId]` on the table `students_in_meal_sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mealSessionId` to the `students_in_meal_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students_in_meal_sessions" DROP CONSTRAINT "students_in_meal_sessions_sessionId_fkey";

-- DropIndex
DROP INDEX "students_in_meal_sessions_sessionId_studentId_key";

-- AlterTable
ALTER TABLE "students_in_meal_sessions" DROP COLUMN "sessionId",
ADD COLUMN     "mealSessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_in_meal_sessions_mealSessionId_studentId_key" ON "students_in_meal_sessions"("mealSessionId", "studentId");

-- AddForeignKey
ALTER TABLE "students_in_meal_sessions" ADD CONSTRAINT "students_in_meal_sessions_mealSessionId_fkey" FOREIGN KEY ("mealSessionId") REFERENCES "meal_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
