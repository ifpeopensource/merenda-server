import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function findAll() {
    
    return prisma.student.findMany();

}

async function addStudent(id, name, email, picUrl) {
    
    const student = await prisma.student.create({
        data: {
            id: id,
            name: name,
            email: email,
            picUrl: picUrl
        }
    });
    
    return student;
}

async function readStudent(query, type) {
    
    let student;

    if (type)  {
        student = await prisma.findUnique({
            where: {
                email: query,
            },
        });
    } else {
        student = await prisma.findUnique({
            where: {
                id: query,
            },
        });
    }

    return student

}

async function updateStudent(id, name, email, picUrl) {
    
    const data = { name: name, email: email, picUrl: picUrl }

    const student = await prisma.student.update({
        where: {
            id: id,
        },
        data: data,
    })

    return student

}

async function deleteStudent(id) {

    prisma.student.delete({
        where: {
            id: id,
        },
    });

}

export default { findAll, addStudent, readStudent, updateStudent, deleteStudent };
