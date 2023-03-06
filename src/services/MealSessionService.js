import { MealSessionFinishedError } from '#errors/MealSession/MealSessionFinished.js';
import { MealSessionNotFoundError } from '#errors/MealSession/MealSessionNotFound.js';
import { StudentAlreadyInMealSessionError } from '#errors/MealSession/StudentAlreadyInMealSession.js';
import { StudentNotFoundError } from '#errors/StudentNotFound.js';
import { prisma } from '../PrismaClient.js';

const PRISMA_ERRORS = {
  foreignKeyConstraint: 'P2003',
  uniqueConstraintFailed: 'P2002',
};

async function start() {
  return await prisma.mealSession.create({
    data: {},
  });
}

async function restart(id) {
  const mealSession = await prisma.mealSession.findUnique({ where: { id } });

  if (!mealSession) throw new MealSessionNotFoundError();

  return await prisma.mealSession.update({
    where: {
      id,
    },
    data: {
      finishedAt: null,
    },
  });
}

async function finish(id) {
  const mealSession = await prisma.mealSession.findUnique({ where: { id } });

  if (!mealSession) throw new MealSessionNotFoundError();
  if (mealSession.finishedAt) throw new MealSessionFinishedError();

  return await prisma.mealSession.update({
    where: {
      id,
    },
    data: {
      finishedAt: new Date(),
    },
  });
}

async function addStudent(data) {
  const mealSession = await prisma.mealSession.findUnique({
    where: { id: data.mealSessionId },
  });

  if (!mealSession) throw new MealSessionNotFoundError();
  if (mealSession.finishedAt) throw new MealSessionFinishedError();

  try {
    return await prisma.studentInMealSession.create({
      data: {
        mealSessionId: data.mealSessionId,
        studentId: data.studentId,
      },
      include: {
        student: true,
      },
    });
  } catch (error) {
    if (error.code === PRISMA_ERRORS.foreignKeyConstraint) {
      throw new StudentNotFoundError();
    }

    if (error.code === PRISMA_ERRORS.uniqueConstraintFailed) {
      throw new StudentAlreadyInMealSessionError();
    }

    console.error('PRISMA ERROR (MealSessionService):', error.code);
    throw error;
  }
}

async function read(sessionId) {
  const mealSession = await prisma.mealSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!mealSession) throw new MealSessionNotFoundError();

  return mealSession;
}

async function verifyStudentInMealSession(data) {
  const mealSession = await prisma.mealSession.findUnique({
    where: { id: data.mealSessionId },
  });

  if (!mealSession) throw new MealSessionNotFoundError();

  const student = await prisma.studentInMealSession.findUnique({
    where: {
      mealSessionId_studentId: {
        mealSessionId: data.mealSessionId,
        studentId: data.studentId,
      },
    },
  });

  if (!student) throw new StudentNotFoundError();

  return student;
}

export default {
  start,
  finish,
  restart,
  addStudent,
  read,
  verifyStudentInMealSession,
};
