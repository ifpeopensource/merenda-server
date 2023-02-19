import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function add(data) {
  const user = await prisma.user.create({
    data: data,
  });

  return user;
}

async function read(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

async function update(email, data) {
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: data,
  });

  return user;
}

async function del(email) {
  const user = await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return user;
}

export default { add, read, update, del };
