-- DropForeignKey
ALTER TABLE "students_in_meal_sessions" DROP CONSTRAINT "students_in_meal_sessions_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "students_in_meal_sessions" DROP CONSTRAINT "students_in_meal_sessions_studentId_fkey";

-- AddForeignKey
ALTER TABLE "students_in_meal_sessions" ADD CONSTRAINT "students_in_meal_sessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "meal_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_in_meal_sessions" ADD CONSTRAINT "students_in_meal_sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
