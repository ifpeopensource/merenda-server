import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function findAll() {
    return await prisma.student.findMany();
}

async function add(data) {
    const student = await prisma.student.create({
        data: data
    }).then((student) => {
        console.log('New Student Added:');
        console.log(student);
    });

    return student;
}

async function read(query, type) {
    let student;

    if (type)  {
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
    return await prisma.student.update({
        where: {
            id: id,
        },
        data: data,
    });
}

async function del(id) {
    await prisma.student.delete({
        where: {
            id: id,
        },
    }).then( (student) => {
        console.log('Deleted Student:');
        console.log(student);
    }).catch( () => {
        throw new Error('Unable to find register!');
    });
}

export default { findAll, add, read, update, del };
