/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,studentId]` on the table `students_in_meal_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "students_in_meal_sessions_sessionId_studentId_key" ON "students_in_meal_sessions"("sessionId", "studentId");
