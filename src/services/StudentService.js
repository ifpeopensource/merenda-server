import { EntryExistsError } from '#errors/EntryExists.js';
import { prisma } from '../PrismaClient.js';

const PRISMA_ERRORS = {
  alreadyExists: 'P2002',
};

async function findAll() {
  const students = await prisma.student.findMany();

  return students;
}

async function add(data) {
  try {
    const student = await prisma.student.create({
      data,
    });
    return student;
  } catch (error) {
    if (error.code == PRISMA_ERRORS.alreadyExists) {
      throw new EntryExistsError();
    } else {
      throw error;
    }
  }
}

async function read(query, byEmail) {
  let student;

  if (byEmail) {
    student = await prisma.student.findUnique({
      where: {
        email: query,
      },
    });
  } else {
    student = await prisma.student.findUnique({
      where: {
        id: query,
      },
    });
  }

  return student;
}

async function update(id, data) {
  const student = await prisma.student.update({
    where: {
      id,
    },
    data,
  });

  return student;
}

async function del(id) {
  await prisma.student.delete({
    where: {
      id,
    },
  });
}

export default { findAll, add, read, update, del };
