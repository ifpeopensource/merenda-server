import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll() {
  return prisma.student.findMany();
}

export default { findAll };
