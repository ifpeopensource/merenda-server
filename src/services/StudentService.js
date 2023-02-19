import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll() {
  const students = await prisma.student.findMany();

  return students;
}

async function add(data) {
  const student = await prisma.student.create({
    data: data,
  });

  return student;
}

async function read(query, type) {
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
