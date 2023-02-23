import { SessionClosedError } from '#errors/SessionClosed.js';
import { StudentInexistentError } from '#errors/StudentInexistent.js';
import { prisma } from '../PrismaClient.js';

const PRISMA_ERRORS = {
  foreignKeyConstraint: 'P2003',
};

async function verify(data) {
  const session = await prisma.mealSession.findUnique({
    where: {
      id: data.sessionId,
    },
    select: {
      students: {
        select: {
          studentId: true,
          servedAt: true,
        },
      },
    },
  });

  if (session && session.closedAt) {
    throw new SessionClosedError();
  }

  return session;
}

async function read(sessionId) {
  const session = await prisma.mealSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (session && session.closedAt) {
    throw new SessionClosedError();
  }
  return session;
}

async function add(data) {
  try {
    return await prisma.studentInMealSession.create({ data });
  } catch (error) {
    if (error.code == PRISMA_ERRORS.foreignKeyConstraint) {
      throw new StudentInexistentError();
    } else {
      throw error;
    }
  }
}

async function start() {
  return await prisma.mealSession.create({
    data: {},
  });
}

async function close(sessionId, closedAt) {
  return await prisma.mealSession.update({
    where: {
      id: sessionId,
    },
    data: {
      closedAt,
    },
  });
}

export default { add, start, close, read, verify };
