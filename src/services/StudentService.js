import { prisma } from '../PrismaClient.js';

import { EntryExists } from '../errors/EntryExists.js';

async function findAll() {
  const students = await prisma.student.findMany();

  return students;
}

async function add(data) {
  try {
    const student = await prisma.student.create({
      data: data,
    });
    return student;
  } catch (error) {
    if (error.code == 'P2002') {
      throw new EntryExists();
    } else {
      throw error;
    }
  }
}

async function read(query, byEmail) {
  let student;

  if (type) {
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
      id: id,
    },
    data: data,
  });

  return student;
}

async function del(id) {
  await prisma.student.delete({
    where: {
      id: id,
    },
  });
}

export default { findAll, add, read, update, del };
