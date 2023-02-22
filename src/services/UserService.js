import { EntryExists } from '#errors/EntryExists.js';
import { prisma } from '../PrismaClient.js';

const PRISMA_ERRORS = {
  alreadyExists: 'P2002',
};

const SELECTION_SET = {
  id: true,
  name: true,
  studentId: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

async function add(data) {
  let user;
  try {
    user = await prisma.user.create({
      data,
      select: SELECTION_SET,
    });
  } catch (error) {
    if (error.code == PRISMA_ERRORS.alreadyExists) {
      throw new EntryExists();
    } else {
      throw error;
    }
  }

  return user;
}

async function read(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: SELECTION_SET,
  });

  return user;
}

async function update(email, data) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data,
    select: SELECTION_SET,
  });

  return user;
}

async function del(email) {
  const user = await prisma.user.delete({
    where: {
      email,
    },
    select: SELECTION_SET,
  });

  return user;
}

async function getAuthData(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });

  return user;
}

export default { add, read, update, del, getAuthData };
