import { prisma } from '../PrismaClient.js';

import { EntryExists } from '../errors/EntryExists.js';

async function add(data) {
  let user;
  try {
    user = await prisma.user.create({
      data: data,
    });
  } catch (error) {
    if (error.code == 'P2002') {
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
