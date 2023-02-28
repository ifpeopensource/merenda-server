-- CreateTable
CREATE TABLE "meal_sessions" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "meal_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_in_meal_sessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "servedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_in_meal_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students_in_meal_sessions" ADD CONSTRAINT "students_in_meal_sessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "meal_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_in_meal_sessions" ADD CONSTRAINT "students_in_meal_sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
